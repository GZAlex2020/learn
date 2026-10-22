/**
 * 词语与句子 · 句子补充（选择题）
 * 叠词 AABB / ABB / ABAC · 拟人句 · 比喻句
 */
window.SENTENCE_DATA = (function () {
  'use strict';

  var SENTENCE_TOTAL = 10;

  var SENTENCE_MODES = [
    { id: 'all', label: '综合练习' },
    { id: 'word', label: '叠词词语' },
    { id: 'person', label: '拟人句' },
    { id: 'simile', label: '比喻句' }
  ];

  var KNOWLEDGE = [
    { title: 'AABB 式', text: '前后两字分别相同，如：明明白白、高高兴兴' },
    { title: 'ABB 式', text: '第一个字 + 叠字，如：笑盈盈、水汪汪、红彤彤' },
    { title: 'ABAC 式', text: '第一三字相同、二四字相同，如：自由自在、无边无际' },
    { title: '拟人句', text: '把事物写得像人一样，如：小草探出头来' },
    { title: '比喻句', text: '用「像」把两种事物连起来，如：月亮像小船' }
  ];

  var QUESTIONS = [
    { id: 1, category: 'aabb', type: 'pick', prompt: '选出 AABB 式词语', answer: '明明白白', options: ['明明白白', '笑盈盈', '自由自在'] },
    { id: 2, category: 'aabb', type: 'pick', prompt: '选出 AABB 式词语', answer: '高高兴兴', options: ['高高兴兴', '水汪汪', '飞来飞去'] },
    { id: 3, category: 'aabb', type: 'pick', prompt: '选出 AABB 式词语', answer: '干干净净', options: ['干干净净', '红彤彤', '一心一意'] },
    { id: 4, category: 'aabb', type: 'pick', prompt: '选出 AABB 式词语', answer: '快快乐乐', options: ['快快乐乐', '笑盈盈', '无边无际'] },
    { id: 5, category: 'aabb', type: 'fill', prompt: '把词语补充完整', before: '小朋友们', after: '地回家了。', answer: '高高兴兴', options: ['高高兴兴', '水汪汪', '自由自在'] },

    { id: 6, category: 'abb', type: 'pick', prompt: '选出 ABB 式词语', answer: '笑盈盈', options: ['笑盈盈', '明明白白', '自由自在'] },
    { id: 7, category: 'abb', type: 'pick', prompt: '选出 ABB 式词语', answer: '水汪汪', options: ['水汪汪', '高高兴兴', '飞来飞去'] },
    { id: 8, category: 'abb', type: 'pick', prompt: '选出 ABB 式词语', answer: '红彤彤', options: ['红彤彤', '干干净净', '无边无际'] },
    { id: 9, category: 'abb', type: 'pick', prompt: '选出 ABB 式词语', answer: '绿油油', options: ['绿油油', '明明白白', '一心一意'] },
    { id: 10, category: 'abb', type: 'fill', prompt: '把词语补充完整', before: '妹妹的眼睛', after: '的。', answer: '水汪汪', options: ['水汪汪', '高高兴兴', '自由自在'] },

    { id: 11, category: 'abac', type: 'pick', prompt: '选出 ABAC 式词语', answer: '自由自在', options: ['自由自在', '笑盈盈', '明明白白'] },
    { id: 12, category: 'abac', type: 'pick', prompt: '选出 ABAC 式词语', answer: '无边无际', options: ['无边无际', '水汪汪', '快快乐乐'] },
    { id: 13, category: 'abac', type: 'pick', prompt: '选出 ABAC 式词语', answer: '飞来飞去', options: ['飞来飞去', '红彤彤', '高高兴兴'] },
    { id: 14, category: 'abac', type: 'pick', prompt: '选出 ABAC 式词语', answer: '一心一意', options: ['一心一意', '明明白白', '笑盈盈'] },
    { id: 15, category: 'abac', type: 'fill', prompt: '把词语补充完整', before: '小鸟在蓝天上', after: '。', answer: '飞来飞去', options: ['飞来飞去', '水汪汪', '高高兴兴'] },

    { id: 16, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '小草从地下', after: '出头来。', answer: '探', options: ['探', '长', '伸'] },
    { id: 17, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '那是春天的', after: '吧？', answer: '眉毛', options: ['眉毛', '头发', '手指'] },
    { id: 18, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '花儿在春风里', after: '。', answer: '笑', options: ['笑', '跑', '飞'] },
    { id: 19, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '小溪', after: '地唱着歌。', answer: '哗哗', options: ['哗哗', '慢慢', '轻轻'] },
    { id: 20, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '星星在夜空', after: '眼睛。', answer: '眨着', options: ['眨着', '看着', '摸着'] },
    { id: 21, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '风儿', after: '地抚摸着大地。', answer: '轻轻', options: ['轻轻', '重重', '远远'] },
    { id: 22, category: 'person', type: 'fill', prompt: '把拟人句补充完整', before: '春雨', after: '地落下来。', answer: '悄悄', options: ['悄悄', '大大', '慢慢'] },

    { id: 23, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '弯弯的月亮像', after: '。', answer: '小船', options: ['小船', '太阳', '书本'] },
    { id: 24, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '梧桐树叶像', after: '。', answer: '手掌', options: ['手掌', '扇子', '石头'] },
    { id: 25, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '云朵像', after: '。', answer: '棉花糖', options: ['棉花糖', '小草', '桌子'] },
    { id: 26, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '太阳像', after: '。', answer: '火球', options: ['火球', '月亮', '星星'] },
    { id: 27, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '彩虹像', after: '。', answer: '七彩桥', options: ['七彩桥', '小路', '小河'] },
    { id: 28, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '弟弟的脸蛋红彤彤的，像', after: '。', answer: '苹果', options: ['苹果', '书本', '桌子'] },
    { id: 29, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '大象的耳朵像', after: '。', answer: '扇子', options: ['扇子', '石头', '铅笔'] },
    { id: 30, category: 'simile', type: 'fill', prompt: '把比喻句补充完整', before: '蘑菇像', after: '。', answer: '小伞', options: ['小伞', '太阳', '河流'] }
  ];

  var CATEGORY_LABELS = {
    aabb: 'AABB 叠词',
    abb: 'ABB 叠词',
    abac: 'ABAC 叠词',
    person: '拟人句',
    simile: '比喻句'
  };

  function shuffle(arr) {
    var a = arr.slice();
    var i = a.length - 1;
    var j;
    var t;
    for (; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function filterByMode(mode) {
    if (mode === 'word') {
      return QUESTIONS.filter(function (q) {
        return q.category === 'aabb' || q.category === 'abb' || q.category === 'abac';
      });
    }
    if (mode === 'person') {
      return QUESTIONS.filter(function (q) { return q.category === 'person'; });
    }
    if (mode === 'simile') {
      return QUESTIONS.filter(function (q) { return q.category === 'simile'; });
    }
    return QUESTIONS.slice();
  }

  function pickQuestions(mode, count) {
    var pool = filterByMode(mode || 'all');
    return shuffle(pool).slice(0, Math.min(count || SENTENCE_TOTAL, pool.length));
  }

  function buildSpeakText(q) {
    if (q.type === 'pick') {
      return q.prompt + '。正确答案是' + q.answer;
    }
    return q.before + q.answer + q.after;
  }

  return {
    SENTENCE_TOTAL: SENTENCE_TOTAL,
    SENTENCE_MODES: SENTENCE_MODES,
    KNOWLEDGE: KNOWLEDGE,
    QUESTIONS: QUESTIONS,
    CATEGORY_LABELS: CATEGORY_LABELS,
    pickQuestions: pickQuestions,
    buildSpeakText: buildSpeakText
  };
})();
