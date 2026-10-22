Page({
  data: {
    modules: [
      { id: 'chart', icon: '🔊', title: '互动拼音表', desc: '完整拼音表，点读发音', page: 'chart' },
      { id: 'pinyin', icon: '🔤', title: '拼音练习', desc: '看字选拼音 / 听音选字' },
      { id: 'alphabet', icon: '🔡', title: '声母韵母', desc: '点读学习，带读音' },
      { id: 'char', icon: '🔗', title: '识字配对', desc: '字和拼音配配对' },
      { id: 'lesson', icon: '📖', title: '课文识字通关', desc: '一～二年级按课练生字' },
      { id: 'flashcard', icon: '📇', title: '识字卡片', desc: '翻卡片，听读音' },
      { id: 'read', icon: '📝', title: '读题训练', desc: '读懂题目要求' },
      { id: 'keywords', icon: '📋', title: '题目常用词', desc: '认读考试关键词' },
      { id: 'sentence', icon: '✍️', title: '词语与句子', desc: '叠词 · 拟人句 · 比喻句' },
      { id: 'preview3', icon: '🎒', title: '升三年级预习', desc: '识字 · 词语 · 句子 · 阅读 · 习作' }
    ]
  },

  onModuleTap(e) {
    var mod = e.currentTarget.dataset.module;
    if (mod === 'chart') {
      wx.navigateTo({ url: '/packageZh/pages/pinyin-chart/pinyin-chart' });
      return;
    }
    wx.navigateTo({ url: '/packageZh/pages/practice/practice?module=' + mod });
  },

  goPractice() {
    wx.navigateTo({ url: '/packageZh/pages/practice/practice' });
  }
});
