(function () {
  'use strict';

  var Speech = window.SpeechHelper;
  var PINYIN_DATA = window.PINYIN_DATA;
  var SHENGMU_EX = PINYIN_DATA.SHENGMU_EXAMPLES;
  var YUNMU_EX = PINYIN_DATA.YUNMU_EXAMPLES;
  var ZHENGTI = PINYIN_DATA.ZHENGTIRENDU;
  var CHART = window.PINYIN_CHART_DATA;

  var current = null;
  var playingEl = null;
  var viewedCount = 0;
  var Session = window.createSessionLogger ? window.createSessionLogger('语文') : null;

  if (Session) {
    Session.start('pinyin-chart', '互动拼音表', { subName: '浏览学习' });
  }

  function finishChartSession() {
    if (!window.LearningLog || !window.LearningLog.getCurrent()) return;
    if (viewedCount > 0 && Session) {
      Session.finish({
        status: '完成',
        progress: viewedCount,
        total: viewedCount,
        result: '浏览 ' + viewedCount + ' 个拼音'
      });
    } else {
      window.LearningLog.abortSession();
    }
  }

  var homeLink = document.querySelector('.home-link');
  if (homeLink) {
    homeLink.addEventListener('click', function () {
      finishChartSession();
    });
  }

  window.addEventListener('pagehide', finishChartSession);

  function findShengmu(id) {
    return SHENGMU_EX.find(function (x) { return x.sm === id; });
  }

  function findYunmu(id) {
    return YUNMU_EX.find(function (x) { return x.ym === id; });
  }

  function getSlug(item) {
    return PINYIN_DATA.getPinyinSlug(item);
  }

  function speakItemPinyin(item) {
    var text = item.speak || item.pinyin;
    var slug = getSlug(item);
    if (slug) {
      Speech.speakPinyinSlug(slug, text);
      return;
    }
    Speech.speakPinyin(text, item.char || null);
  }

  function clearPlaying() {
    if (playingEl) {
      playingEl.classList.remove('playing');
      playingEl = null;
    }
  }

  function selectItem(el, item, letter, label) {
    clearPlaying();
    if (el) {
      el.classList.add('playing');
      playingEl = el;
    }
    current = item;
    viewedCount++;
    if (Session) Session.tick({}, { progress: viewedCount, total: viewedCount });
    var bar = document.getElementById('detail-bar');
    bar.classList.remove('empty');
    document.getElementById('detail-letter').textContent = letter;
    var detail = item.char;
    if (item.pinyin) detail += ' ' + item.pinyin;
    if (item.word && item.word !== item.char) detail += ' · ' + item.word;
    if (label) detail += ' · ' + label;
    document.getElementById('detail-char').textContent = detail;
    updateDetailButtons(item);
  }

  function updateDetailButtons(item) {
    if (!item) return;
    var speakText = item.speak || item.pinyin;
    document.getElementById('btn-speak-char').textContent = '🔊 听「' + speakText + '」';
    document.getElementById('btn-speak-word').textContent = '🔊 听组词「' + item.word + '」';
  }

  function bindDetailButtons() {
    document.getElementById('btn-speak-char').addEventListener('click', function () {
      if (current) speakItemPinyin(current);
    });
    document.getElementById('btn-speak-word').addEventListener('click', function () {
      if (current) Speech.speakWord(current.word);
    });
    document.getElementById('btn-speak-all').addEventListener('click', function () {
      if (!current) return;
      speakItemPinyin(current);
      setTimeout(function () {
        Speech.speakWord(current.word);
      }, 700);
    });
  }

  function makeCell(letter, item, onClick) {
    var cell = document.createElement('div');
    cell.className = 'py-cell';
    var sub = item.pinyin || item.word;
    cell.innerHTML =
      '<div class="py-letter">' + letter + '</div>' +
      '<div class="py-char">' + item.char + '</div>' +
      '<div class="py-example">' + sub + '</div>' +
      '<div class="py-speak-icon">🔊 听拼音</div>';
    cell.addEventListener('click', function () {
      onClick(cell);
    });
    return cell;
  }

  function renderTones() {
    var grid = document.getElementById('tone-grid');
    CHART.SHENGDIAO.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'tone-card';
      card.innerHTML =
        '<div class="tone-name">' + t.name + ' ' + t.symbol + '</div>' +
        '<div class="tone-char">' + t.example + '</div>' +
        '<div class="tone-py">' + t.pinyin + '</div>' +
        '<div class="py-speak-icon">🔊 点击听</div>';
      var item = {
        char: t.example,
        word: t.word,
        pinyin: t.pinyin,
        speak: t.pinyin,
        toneId: t.tone
      };
      card.addEventListener('click', function () {
        selectItem(card, item, t.pinyin, t.name);
        speakItemPinyin(item);
      });
      grid.appendChild(card);
    });
  }

  function renderShengmu() {
    var container = document.getElementById('shengmu-groups');
    container.innerHTML = '';
    CHART.SHENGMU_GROUPS.forEach(function (group) {
      var sub = document.createElement('h3');
      sub.className = 'chart-subtitle';
      sub.textContent = group.title;
      container.appendChild(sub);

      var grid = document.createElement('div');
      grid.className = 'py-grid';

      group.ids.forEach(function (id) {
        var item = findShengmu(id);
        if (!item) return;
        grid.appendChild(makeCell(item.sm, item, function (cell) {
          selectItem(cell, item, item.sm, '声母');
          speakItemPinyin(item);
        }));
      });
      container.appendChild(grid);
    });
  }

  function renderYunmu() {
    var container = document.getElementById('yunmu-groups');
    container.innerHTML = '';
    CHART.YUNMU_GROUPS.forEach(function (group) {
      var sub = document.createElement('h3');
      sub.className = 'chart-subtitle';
      sub.textContent = group.title;
      container.appendChild(sub);

      var grid = document.createElement('div');
      grid.className = 'py-grid';

      group.ids.forEach(function (id) {
        var item = findYunmu(id);
        if (!item) return;
        grid.appendChild(makeCell(item.ym, item, function (cell) {
          selectItem(cell, item, item.ym, '韵母');
          speakItemPinyin(item);
        }));
      });
      container.appendChild(grid);
    });
  }

  function renderZhengti() {
    var grid = document.getElementById('zhengti-grid');
    grid.innerHTML = '';
    ZHENGTI.forEach(function (item) {
      grid.appendChild(makeCell(item.py, item, function (cell) {
        selectItem(cell, item, item.py, '整体认读');
        speakItemPinyin(item);
      }));
    });
  }

  renderTones();
  renderShengmu();
  renderYunmu();
  renderZhengti();
  bindDetailButtons();

  if (Speech.isSupported()) {
    Speech.ensureReady(function () {});
  }
})();
