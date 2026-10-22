/**
 * 四声示例与其他拼音表扩展数据
 */
module.exports = {
  SHENGDIAO: [
    { tone: 1, name: '一声（阴平）', symbol: 'ˉ', example: '妈', pinyin: 'mā', word: '妈妈' },
    { tone: 2, name: '二声（阳平）', symbol: 'ˊ', example: '麻', pinyin: 'má', word: '麻花' },
    { tone: 3, name: '三声（上声）', symbol: 'ˇ', example: '马', pinyin: 'mǎ', word: '马上' },
    { tone: 4, name: '四声（去声）', symbol: 'ˋ', example: '骂', pinyin: 'mà', word: '骂人' }
  ],

  YUNMU_GROUPS: [
    {
      title: '单韵母（6 个）',
      ids: ['a', 'o', 'e', 'i', 'u', 'ü']
    },
    {
      title: '复韵母（9 个）',
      ids: ['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er']
    },
    {
      title: '鼻韵母（9 个）',
      ids: ['an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong']
    }
  ],

  SHENGMU_GROUPS: [
    { title: 'b p m f', ids: ['b', 'p', 'm', 'f'] },
    { title: 'd t n l', ids: ['d', 't', 'n', 'l'] },
    { title: 'g k h', ids: ['g', 'k', 'h'] },
    { title: 'j q x', ids: ['j', 'q', 'x'] },
    { title: 'zh ch sh r', ids: ['zh', 'ch', 'sh', 'r'] },
    { title: 'z c s', ids: ['z', 'c', 's'] },
    { title: 'y w', ids: ['y', 'w'] }
  ]
};
