module.exports = {
  SHENGMU: [
    'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h',
    'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'
  ],
  YUNMU: [
    'a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu',
    'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'
  ],
  PINYIN_QUIZ: [
    { char: '妈', answer: 'mā', options: ['mā', 'má', 'mǎ', 'mà'] },
    { char: '爸', answer: 'bà', options: ['bà', 'pà', 'dà', 'tà'] },
    { char: '大', answer: 'dà', options: ['dà', 'tà', 'bà', 'dǎ'] },
    { char: '小', answer: 'xiǎo', options: ['xiǎo', 'xiào', 'xiāo', 'xiáo'] },
    { char: '天', answer: 'tiān', options: ['tiān', 'tián', 'tiǎn', 'tiàn'] },
    { char: '地', answer: 'dì', options: ['dì', 'de', 'dí', 'dǐ'] },
    { char: '人', answer: 'rén', options: ['rén', 'rěn', 'rèn', 'lén'] },
    { char: '水', answer: 'shuǐ', options: ['shuǐ', 'suǐ', 'shuí', 'shuì'] },
    { char: '火', answer: 'huǒ', options: ['huǒ', 'huò', 'huō', 'huó'] },
    { char: '山', answer: 'shān', options: ['shān', 'sān', 'shǎn', 'shàn'] },
    { char: '石', answer: 'shí', options: ['shí', 'sí', 'shì', 'shǐ'] },
    { char: '手', answer: 'shǒu', options: ['shǒu', 'sǒu', 'shòu', 'shōu'] },
    { char: '心', answer: 'xīn', options: ['xīn', 'xín', 'xǐn', 'xìn'] },
    { char: '风', answer: 'fēng', options: ['fēng', 'fén', 'fěng', 'fèng'] },
    { char: '雨', answer: 'yǔ', options: ['yǔ', 'yù', 'yú', 'yū'] },
    { char: '花', answer: 'huā', options: ['huā', 'huá', 'huà', 'huǎ'] },
    { char: '草', answer: 'cǎo', options: ['cǎo', 'cāo', 'cào', 'cáo'] },
    { char: '树', answer: 'shù', options: ['shù', 'sú', 'shú', 'sù'] },
    { char: '春', answer: 'chūn', options: ['chūn', 'cūn', 'chún', 'chǔn'] },
    { char: '学', answer: 'xué', options: ['xué', 'xuě', 'xuè', 'xié'] },
    { char: '校', answer: 'xiào', options: ['xiào', 'xiáo', 'xiǎo', 'xiāo'] },
    { char: '书', answer: 'shū', options: ['shū', 'sū', 'shú', 'shǔ'] },
    { char: '读', answer: 'dú', options: ['dú', 'dǔ', 'dù', 'dū'] },
    { char: '写', answer: 'xiě', options: ['xiě', 'xié', 'xiè', 'xiē'] },
    { char: '看', answer: 'kàn', options: ['kàn', 'kān', 'kǎn', 'kán'] },
    { char: '听', answer: 'tīng', options: ['tīng', 'tíng', 'tǐng', 'tìng'] },
    { char: '好', answer: 'hǎo', options: ['hǎo', 'háo', 'hào', 'hāo'] },
    { char: '爱', answer: 'ài', options: ['ài', 'ǎi', 'āi', 'ái'] },
    { char: '中', answer: 'zhōng', options: ['zhōng', 'zhòng', 'zhǒng', 'zōng'] },
    { char: '国', answer: 'guó', options: ['guó', 'guō', 'guǒ', 'guò'] }
  ],
  pinyinToSlug: function (pinyin) {
    return 'py_' + String(pinyin).replace(/ü/g, 'v');
  },
  ENCOURAGEMENTS: ['真棒！', '太厉害了！', '继续加油！', '答对了！', '好聪明！', '真不错！'],

  /** 声母口诀字；speak=直接读的拼音音 */
  SHENGMU_EXAMPLES: [
    { sm: 'b', char: '玻', pinyin: 'bō', speak: 'bō', word: '玻璃' },
    { sm: 'p', char: '坡', pinyin: 'pō', speak: 'pō', word: '山坡' },
    { sm: 'm', char: '摸', pinyin: 'mō', speak: 'mō', word: '摸一摸' },
    { sm: 'f', char: '佛', pinyin: 'fō', speak: 'fō', word: '佛像' },
    { sm: 'd', char: '得', pinyin: 'dē', speak: 'dē', word: '得到' },
    { sm: 't', char: '特', pinyin: 'tē', speak: 'tē', word: '特别' },
    { sm: 'n', char: '讷', pinyin: 'nē', speak: 'nē', word: '木讷' },
    { sm: 'l', char: '勒', pinyin: 'lē', speak: 'lē', word: '勒住' },
    { sm: 'g', char: '哥', pinyin: 'gē', speak: 'gē', word: '哥哥' },
    { sm: 'k', char: '科', pinyin: 'kē', speak: 'kē', word: '科学' },
    { sm: 'h', char: '喝', pinyin: 'hē', speak: 'hē', word: '喝水' },
    { sm: 'j', char: '鸡', pinyin: 'jī', speak: 'jī', word: '小鸡' },
    { sm: 'q', char: '七', pinyin: 'qī', speak: 'qī', word: '七个' },
    { sm: 'x', char: '西', pinyin: 'xī', speak: 'xī', word: '东西' },
    { sm: 'zh', char: '知', pinyin: 'zhī', speak: 'zhī', word: '知道' },
    { sm: 'ch', char: '吃', pinyin: 'chī', speak: 'chī', word: '吃饭' },
    { sm: 'sh', char: '师', pinyin: 'shī', speak: 'shī', word: '老师' },
    { sm: 'r', char: '日', pinyin: 'rī', speak: 'rī', word: '日子' },
    { sm: 'z', char: '资', pinyin: 'zī', speak: 'zī', word: '资源' },
    { sm: 'c', char: '次', pinyin: 'cī', speak: 'cī', word: '一次' },
    { sm: 's', char: '思', pinyin: 'sī', speak: 'sī', word: '思想' },
    { sm: 'y', char: '衣', pinyin: 'yī', speak: 'yī', word: '衣服' },
    { sm: 'w', char: '乌', pinyin: 'wū', speak: 'wū', word: '乌鸦' }
  ],

  /** 韵母；speak=直接读的拼音音（第一声） */
  YUNMU_EXAMPLES: [
    { ym: 'a', char: '啊', pinyin: 'ā', speak: 'ā', word: '啊' },
    { ym: 'o', char: '喔', pinyin: 'ō', speak: 'ō', word: '喔' },
    { ym: 'e', char: '呃', pinyin: 'ē', speak: 'ē', word: '呃，你好' },
    { ym: 'i', char: '衣', pinyin: 'yī', speak: 'yī', word: '衣服' },
    { ym: 'u', char: '乌', pinyin: 'wū', speak: 'wū', word: '乌鸦' },
    { ym: 'ü', char: '淤', pinyin: 'yū', speak: 'yū', word: '淤泥' },
    { ym: 'ai', char: '哀', pinyin: 'āi', speak: 'āi', word: '哀求' },
    { ym: 'ei', char: '诶', pinyin: 'ēi', speak: 'ēi', word: '诶' },
    { ym: 'ui', char: '威', pinyin: 'wēi', speak: 'wēi', word: '威力' },
    { ym: 'ao', char: '凹', pinyin: 'āo', speak: 'āo', word: '凹陷' },
    { ym: 'ou', char: '欧', pinyin: 'ōu', speak: 'ōu', word: '欧洲' },
    { ym: 'iu', char: '优', pinyin: 'yōu', speak: 'yōu', word: '优秀' },
    { ym: 'ie', char: '椰', pinyin: 'yē', speak: 'yē', word: '椰子' },
    { ym: 'üe', char: '约', pinyin: 'yuē', speak: 'yuē', word: '约定' },
    { ym: 'er', char: '儿', pinyin: 'ér', speak: 'ér', word: '儿歌' },
    { ym: 'an', char: '安', pinyin: 'ān', speak: 'ān', word: '安全' },
    { ym: 'en', char: '恩', pinyin: 'ēn', speak: 'ēn', word: '恩情' },
    { ym: 'in', char: '因', pinyin: 'yīn', speak: 'yīn', word: '因为' },
    { ym: 'un', char: '温', pinyin: 'wēn', speak: 'wēn', word: '温暖' },
    { ym: 'ün', char: '晕', pinyin: 'yūn', speak: 'yūn', word: '头晕' },
    { ym: 'ang', char: '肮', pinyin: 'āng', speak: 'āng', word: '肮脏' },
    { ym: 'eng', char: '亨', pinyin: 'ēng', speak: 'ēng', word: '亨通' },
    { ym: 'ing', char: '英', pinyin: 'īng', speak: 'īng', word: '英雄' },
    { ym: 'ong', char: '翁', pinyin: 'ōng', speak: 'ōng', word: '老翁' }
  ],

  /** 整体认读音节 */
  ZHENGTIRENDU: [
    { py: 'zhi', char: '知', pinyin: 'zhī', speak: 'zhī', word: '知道' },
    { py: 'chi', char: '吃', pinyin: 'chī', speak: 'chī', word: '吃饭' },
    { py: 'shi', char: '十', pinyin: 'shí', speak: 'shí', word: '十个' },
    { py: 'ri', char: '日', pinyin: 'rì', speak: 'rì', word: '日子' },
    { py: 'zi', char: '字', pinyin: 'zī', speak: 'zī', word: '写字' },
    { py: 'ci', char: '词', pinyin: 'cí', speak: 'cí', word: '词语' },
    { py: 'si', char: '四', pinyin: 'sì', speak: 'sì', word: '四个' },
    { py: 'yi', char: '一', pinyin: 'yī', speak: 'yī', word: '一个' },
    { py: 'wu', char: '五', pinyin: 'wǔ', speak: 'wǔ', word: '五个' },
    { py: 'yu', char: '鱼', pinyin: 'yú', speak: 'yú', word: '小鱼' },
    { py: 'ye', char: '叶', pinyin: 'yè', speak: 'yè', word: '树叶' },
    { py: 'yue', char: '月', pinyin: 'yuè', speak: 'yuè', word: '月亮' },
    { py: 'yuan', char: '元', pinyin: 'yuán', speak: 'yuán', word: '一元' },
    { py: 'yin', char: '音', pinyin: 'yīn', speak: 'yīn', word: '声音' },
    { py: 'yun', char: '云', pinyin: 'yún', speak: 'yún', word: '白云' },
    { py: 'ying', char: '英', pinyin: 'yīng', speak: 'yīng', word: '英雄' }
  ],

  getPinyinSlug: function (item, tab) {
    if (item.toneId != null) return 'sd_' + item.toneId;
    if (tab === 'shengmu' || item.sm) return 'sm_' + item.sm;
    if (tab === 'yunmu' || item.ym) return 'ym_' + String(item.ym).replace('ü', 'v');
    if (item.py) return 'zt_' + item.py;
    if (item.pinyin) return 'py_' + item.pinyin.replace(/ü/g, 'v');
    return '';
  }
};
