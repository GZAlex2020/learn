/**
 * 部编版课文识字 · 按课分组（一～二年级）
 */
window.LESSON_DATA = (function () {
  'use strict';

  var G1S2 = [
    { id: 1, title: '春夏秋冬', chars: [
      { char: '春', pinyin: 'chūn', word: '春天' }, { char: '夏', pinyin: 'xià', word: '夏天' },
      { char: '秋', pinyin: 'qiū', word: '秋天' }, { char: '冬', pinyin: 'dōng', word: '冬天' },
      { char: '风', pinyin: 'fēng', word: '春风' }, { char: '花', pinyin: 'huā', word: '花朵' },
      { char: '雪', pinyin: 'xuě', word: '下雪' }, { char: '飞', pinyin: 'fēi', word: '飞鸟' }
    ]},
    { id: 2, title: '姓氏歌', chars: [
      { char: '姓', pinyin: 'xìng', word: '姓名' }, { char: '什', pinyin: 'shén', word: '什么' },
      { char: '李', pinyin: 'lǐ', word: '李子' }, { char: '张', pinyin: 'zhāng', word: '张开' },
      { char: '古', pinyin: 'gǔ', word: '古代' }, { char: '吴', pinyin: 'wú', word: '吴国' },
      { char: '赵', pinyin: 'zhào', word: '赵姓' }, { char: '钱', pinyin: 'qián', word: '金钱' }
    ]},
    { id: 3, title: '小青蛙', chars: [
      { char: '青', pinyin: 'qīng', word: '青草' }, { char: '清', pinyin: 'qīng', word: '清水' },
      { char: '晴', pinyin: 'qíng', word: '晴天' }, { char: '情', pinyin: 'qíng', word: '心情' },
      { char: '请', pinyin: 'qǐng', word: '请进' }, { char: '生', pinyin: 'shēng', word: '生日' },
      { char: '虫', pinyin: 'chóng', word: '小虫' }
    ]},
    { id: 4, title: '猜字谜', chars: [
      { char: '相', pinyin: 'xiāng', word: '相同' }, { char: '遇', pinyin: 'yù', word: '遇见' },
      { char: '欢', pinyin: 'huān', word: '欢乐' }, { char: '时', pinyin: 'shí', word: '时间' },
      { char: '怕', pinyin: 'pà', word: '害怕' }, { char: '言', pinyin: 'yán', word: '语言' },
      { char: '互', pinyin: 'hù', word: '互相' }, { char: '动', pinyin: 'dòng', word: '运动' }
    ]},
    { id: 5, title: '动物儿歌', chars: [
      { char: '物', pinyin: 'wù', word: '动物' }, { char: '行', pinyin: 'xíng', word: '行走' },
      { char: '河', pinyin: 'hé', word: '河水' }, { char: '歌', pinyin: 'gē', word: '儿歌' },
      { char: '片', pinyin: 'piàn', word: '一片' }, { char: '羽', pinyin: 'yǔ', word: '羽毛' }
    ]},
    { id: 6, title: '古对今', chars: [
      { char: '古', pinyin: 'gǔ', word: '古代' }, { char: '凉', pinyin: 'liáng', word: '凉快' },
      { char: '细', pinyin: 'xì', word: '细小' }, { char: '夕', pinyin: 'xī', word: '夕阳' },
      { char: '语', pinyin: 'yǔ', word: '语言' }, { char: '香', pinyin: 'xiāng', word: '香水' }
    ]},
    { id: 7, title: '操场上', chars: [
      { char: '操', pinyin: 'cāo', word: '操场' }, { char: '场', pinyin: 'chǎng', word: '广场' },
      { char: '拔', pinyin: 'bá', word: '拔河' }, { char: '拍', pinyin: 'pāi', word: '拍手' },
      { char: '跑', pinyin: 'pǎo', word: '跑步' }, { char: '踢', pinyin: 'tī', word: '踢球' },
      { char: '体', pinyin: 'tǐ', word: '身体' }
    ]},
    { id: 8, title: '人之初', chars: [
      { char: '之', pinyin: 'zhī', word: '之后' }, { char: '相', pinyin: 'xiāng', word: '相同' },
      { char: '近', pinyin: 'jìn', word: '远近' }, { char: '习', pinyin: 'xí', word: '学习' },
      { char: '远', pinyin: 'yuǎn', word: '远方' }, { char: '教', pinyin: 'jiào', word: '教学' },
      { char: '道', pinyin: 'dào', word: '道路' }
    ]},
    { id: 9, title: '静夜思', chars: [
      { char: '思', pinyin: 'sī', word: '思想' }, { char: '床', pinyin: 'chuáng', word: '床铺' },
      { char: '前', pinyin: 'qián', word: '前面' }, { char: '光', pinyin: 'guāng', word: '月光' },
      { char: '低', pinyin: 'dī', word: '低头' }, { char: '故', pinyin: 'gù', word: '故乡' },
      { char: '乡', pinyin: 'xiāng', word: '家乡' }
    ]},
    { id: 10, title: '端午粽', chars: [
      { char: '端', pinyin: 'duān', word: '端正' }, { char: '午', pinyin: 'wǔ', word: '中午' },
      { char: '节', pinyin: 'jié', word: '节日' }, { char: '叶', pinyin: 'yè', word: '树叶' },
      { char: '米', pinyin: 'mǐ', word: '大米' }, { char: '分', pinyin: 'fēn', word: '分开' }
    ]},
    { id: 11, title: '彩虹', chars: [
      { char: '虹', pinyin: 'hóng', word: '彩虹' }, { char: '座', pinyin: 'zuò', word: '座位' },
      { char: '浇', pinyin: 'jiāo', word: '浇水' }, { char: '提', pinyin: 'tí', word: '提水' },
      { char: '洒', pinyin: 'sǎ', word: '洒水' }, { char: '镜', pinyin: 'jìng', word: '镜子' }
    ]},
    { id: 12, title: '夏夜多美', chars: [
      { char: '夏', pinyin: 'xià', word: '夏天' }, { char: '弯', pinyin: 'wān', word: '弯曲' },
      { char: '道', pinyin: 'dào', word: '道路' }, { char: '停', pinyin: 'tíng', word: '停止' },
      { char: '间', pinyin: 'jiān', word: '中间' }, { char: '凉', pinyin: 'liáng', word: '凉快' }
    ]},
    { id: 13, title: '荷叶圆圆', chars: [
      { char: '荷', pinyin: 'hé', word: '荷花' }, { char: '珠', pinyin: 'zhū', word: '水珠' },
      { char: '摇', pinyin: 'yáo', word: '摇摆' }, { char: '躺', pinyin: 'tǎng', word: '躺下' },
      { char: '眼', pinyin: 'yǎn', word: '眼睛' }, { char: '亮', pinyin: 'liàng', word: '明亮' },
      { char: '美', pinyin: 'měi', word: '美丽' }
    ]},
    { id: 14, title: '要下雨了', chars: [
      { char: '借', pinyin: 'jiè', word: '借书' }, { char: '尾', pinyin: 'wěi', word: '尾巴' },
      { char: '爬', pinyin: 'pá', word: '爬行' }, { char: '您', pinyin: 'nín', word: '您好' },
      { char: '条', pinyin: 'tiáo', word: '一条' }, { char: '变', pinyin: 'biàn', word: '变化' }
    ]},
    { id: 15, title: '文具的家', chars: [
      { char: '笔', pinyin: 'bǐ', word: '铅笔' }, { char: '盒', pinyin: 'hé', word: '盒子' },
      { char: '课', pinyin: 'kè', word: '课文' }, { char: '具', pinyin: 'jù', word: '工具' },
      { char: '平', pinyin: 'píng', word: '平安' }, { char: '安', pinyin: 'ān', word: '安全' }
    ]},
    { id: 16, title: '一分钟', chars: [
      { char: '钟', pinyin: 'zhōng', word: '时钟' }, { char: '迟', pinyin: 'chí', word: '迟到' },
      { char: '背', pinyin: 'bèi', word: '背诵' }, { char: '灯', pinyin: 'dēng', word: '灯光' },
      { char: '等', pinyin: 'děng', word: '等待' }, { char: '决', pinyin: 'jué', word: '决定' }
    ]},
    { id: 17, title: '棉花姑娘', chars: [
      { char: '棉', pinyin: 'mián', word: '棉花' }, { char: '治', pinyin: 'zhì', word: '治病' },
      { char: '病', pinyin: 'bìng', word: '生病' }, { char: '别', pinyin: 'bié', word: '别人' },
      { char: '奇', pinyin: 'qí', word: '奇怪' }, { char: '星', pinyin: 'xīng', word: '星星' }
    ]},
    { id: 18, title: '小猴子下山', chars: [
      { char: '块', pinyin: 'kuài', word: '一块' }, { char: '非', pinyin: 'fēi', word: '非常' },
      { char: '往', pinyin: 'wǎng', word: '来往' }, { char: '瓜', pinyin: 'guā', word: '西瓜' },
      { char: '进', pinyin: 'jìn', word: '进入' }, { char: '空', pinyin: 'kōng', word: '空气' }
    ]}
  ];

  var G1S1 = [
    { id: 101, title: '天地人', chars: [
      { char: '天', pinyin: 'tiān', word: '天空' }, { char: '地', pinyin: 'dì', word: '土地' },
      { char: '人', pinyin: 'rén', word: '人们' }, { char: '你', pinyin: 'nǐ', word: '你们' },
      { char: '我', pinyin: 'wǒ', word: '我们' }, { char: '他', pinyin: 'tā', word: '他们' }
    ]},
    { id: 102, title: '金木水火土', chars: [
      { char: '一', pinyin: 'yī', word: '一个' }, { char: '二', pinyin: 'èr', word: '二月' },
      { char: '三', pinyin: 'sān', word: '三个' }, { char: '上', pinyin: 'shàng', word: '上面' },
      { char: '下', pinyin: 'xià', word: '下面' }, { char: '口', pinyin: 'kǒu', word: '口水' }
    ]},
    { id: 103, title: '口耳目', chars: [
      { char: '口', pinyin: 'kǒu', word: '口水' }, { char: '耳', pinyin: 'ěr', word: '耳朵' },
      { char: '目', pinyin: 'mù', word: '目光' }, { char: '手', pinyin: 'shǒu', word: '小手' },
      { char: '足', pinyin: 'zú', word: '足球' }, { char: '站', pinyin: 'zhàn', word: '站立' }
    ]},
    { id: 104, title: '日月水火', chars: [
      { char: '日', pinyin: 'rì', word: '日子' }, { char: '月', pinyin: 'yuè', word: '月亮' },
      { char: '水', pinyin: 'shuǐ', word: '河水' }, { char: '火', pinyin: 'huǒ', word: '大火' },
      { char: '山', pinyin: 'shān', word: '大山' }, { char: '石', pinyin: 'shí', word: '石头' }
    ]},
    { id: 105, title: '对韵歌', chars: [
      { char: '对', pinyin: 'duì', word: '对错' }, { char: '云', pinyin: 'yún', word: '白云' },
      { char: '雨', pinyin: 'yǔ', word: '下雨' }, { char: '风', pinyin: 'fēng', word: '大风' },
      { char: '花', pinyin: 'huā', word: '花朵' }, { char: '鸟', pinyin: 'niǎo', word: '小鸟' }
    ]},
    { id: 106, title: '小书包', chars: [
      { char: '书', pinyin: 'shū', word: '看书' }, { char: '包', pinyin: 'bāo', word: '书包' },
      { char: '尺', pinyin: 'chǐ', word: '尺子' }, { char: '本', pinyin: 'běn', word: '本子' },
      { char: '刀', pinyin: 'dāo', word: '小刀' }, { char: '笔', pinyin: 'bǐ', word: '铅笔' }
    ]},
    { id: 107, title: '升国旗', chars: [
      { char: '升', pinyin: 'shēng', word: '上升' }, { char: '国', pinyin: 'guó', word: '国家' },
      { char: '旗', pinyin: 'qí', word: '国旗' }, { char: '中', pinyin: 'zhōng', word: '中国' },
      { char: '红', pinyin: 'hóng', word: '红色' }, { char: '歌', pinyin: 'gē', word: '歌声' }
    ]},
    { id: 108, title: '小小的船', chars: [
      { char: '船', pinyin: 'chuán', word: '小船' }, { char: '弯', pinyin: 'wān', word: '弯曲' },
      { char: '儿', pinyin: 'ér', word: '儿子' }, { char: '两', pinyin: 'liǎng', word: '两个' },
      { char: '头', pinyin: 'tóu', word: '头发' }, { char: '里', pinyin: 'lǐ', word: '里面' }
    ]}
  ];

  var G2S1 = [
    { id: 201, title: '小蝌蚪找妈妈', chars: [
      { char: '两', pinyin: 'liǎng', word: '两个' }, { char: '哪', pinyin: 'nǎ', word: '哪里' },
      { char: '宽', pinyin: 'kuān', word: '宽大' }, { char: '顶', pinyin: 'dǐng', word: '头顶' },
      { char: '眼', pinyin: 'yǎn', word: '眼睛' }, { char: '睛', pinyin: 'jīng', word: '眼睛' },
      { char: '肚', pinyin: 'dù', word: '肚子' }, { char: '跳', pinyin: 'tiào', word: '跳跃' }
    ]},
    { id: 202, title: '我是什么', chars: [
      { char: '变', pinyin: 'biàn', word: '变化' }, { char: '极', pinyin: 'jí', word: '极小' },
      { char: '傍', pinyin: 'bàng', word: '傍晚' }, { char: '海', pinyin: 'hǎi', word: '大海' },
      { char: '洋', pinyin: 'yáng', word: '海洋' }, { char: '作', pinyin: 'zuò', word: '工作' },
      { char: '坏', pinyin: 'huài', word: '坏人' }, { char: '给', pinyin: 'gěi', word: '给我' }
    ]},
    { id: 203, title: '植物妈妈有办法', chars: [
      { char: '法', pinyin: 'fǎ', word: '方法' }, { char: '如', pinyin: 'rú', word: '如果' },
      { char: '脚', pinyin: 'jiǎo', word: '脚步' }, { char: '它', pinyin: 'tā', word: '它们' },
      { char: '娃', pinyin: 'wá', word: '娃娃' }, { char: '得', pinyin: 'de', word: '得到' },
      { char: '经', pinyin: 'jīng', word: '已经' }, { char: '皮', pinyin: 'pí', word: '皮毛' }
    ]},
    { id: 204, title: '曹冲称象', chars: [
      { char: '称', pinyin: 'chēng', word: '称呼' }, { char: '员', pinyin: 'yuán', word: '人员' },
      { char: '根', pinyin: 'gēn', word: '树根' }, { char: '柱', pinyin: 'zhù', word: '柱子' },
      { char: '意', pinyin: 'yì', word: '意思' }, { char: '重', pinyin: 'zhòng', word: '重量' },
      { char: '杆', pinyin: 'gǎn', word: '秤杆' }, { char: '秤', pinyin: 'chèng', word: '秤砣' }
    ]},
    { id: 205, title: '玲玲的画', chars: [
      { char: '画', pinyin: 'huà', word: '画画' }, { char: '幅', pinyin: 'fú', word: '一幅' },
      { char: '评', pinyin: 'píng', word: '评价' }, { char: '奖', pinyin: 'jiǎng', word: '奖励' },
      { char: '纸', pinyin: 'zhǐ', word: '纸张' }, { char: '报', pinyin: 'bào', word: '报纸' },
      { char: '另', pinyin: 'lìng', word: '另外' }, { char: '及', pinyin: 'jí', word: '及时' }
    ]},
    { id: 206, title: '一封信', chars: [
      { char: '封', pinyin: 'fēng', word: '信封' }, { char: '信', pinyin: 'xìn', word: '书信' },
      { char: '今', pinyin: 'jīn', word: '今天' }, { char: '写', pinyin: 'xiě', word: '写字' },
      { char: '支', pinyin: 'zhī', word: '一支' }, { char: '圆', pinyin: 'yuán', word: '圆形' },
      { char: '珠', pinyin: 'zhū', word: '珍珠' }, { char: '笔', pinyin: 'bǐ', word: '铅笔' }
    ]},
    { id: 207, title: '妈妈睡了', chars: [
      { char: '哄', pinyin: 'hǒng', word: '哄睡' }, { char: '先', pinyin: 'xiān', word: '先生' },
      { char: '闭', pinyin: 'bì', word: '关闭' }, { char: '脸', pinyin: 'liǎn', word: '脸蛋' },
      { char: '沉', pinyin: 'chén', word: '沉重' }, { char: '发', pinyin: 'fà', word: '头发' },
      { char: '窗', pinyin: 'chuāng', word: '窗户' }, { char: '沙', pinyin: 'shā', word: '沙发' }
    ]},
    { id: 208, title: '古诗二首', chars: [
      { char: '依', pinyin: 'yī', word: '依靠' }, { char: '尽', pinyin: 'jìn', word: '尽头' },
      { char: '黄', pinyin: 'huáng', word: '黄色' }, { char: '层', pinyin: 'céng', word: '一层' },
      { char: '照', pinyin: 'zhào', word: '照射' }, { char: '炉', pinyin: 'lú', word: '火炉' },
      { char: '烟', pinyin: 'yān', word: '烟雾' }, { char: '川', pinyin: 'chuān', word: '河川' }
    ]},
    { id: 209, title: '黄山奇石', chars: [
      { char: '南', pinyin: 'nán', word: '南方' }, { char: '部', pinyin: 'bù', word: '部分' },
      { char: '些', pinyin: 'xiē', word: '一些' }, { char: '巨', pinyin: 'jù', word: '巨大' },
      { char: '真', pinyin: 'zhēn', word: '真正' }, { char: '位', pinyin: 'wèi', word: '位置' },
      { char: '每', pinyin: 'měi', word: '每天' }, { char: '升', pinyin: 'shēng', word: '上升' }
    ]},
    { id: 210, title: '日月潭', chars: [
      { char: '湾', pinyin: 'wān', word: '海湾' }, { char: '名', pinyin: 'míng', word: '名字' },
      { char: '胜', pinyin: 'shèng', word: '胜利' }, { char: '迹', pinyin: 'jì', word: '足迹' },
      { char: '央', pinyin: 'yāng', word: '中央' }, { char: '丽', pinyin: 'lì', word: '美丽' },
      { char: '岛', pinyin: 'dǎo', word: '岛屿' }, { char: '展', pinyin: 'zhǎn', word: '展开' }
    ]},
    { id: 211, title: '葡萄沟', chars: [
      { char: '产', pinyin: 'chǎn', word: '生产' }, { char: '够', pinyin: 'gòu', word: '足够' },
      { char: '份', pinyin: 'fèn', word: '一份' }, { char: '坡', pinyin: 'pō', word: '山坡' },
      { char: '沟', pinyin: 'gōu', word: '水沟' }, { char: '枝', pinyin: 'zhī', word: '树枝' },
      { char: '客', pinyin: 'kè', word: '客人' }, { char: '城', pinyin: 'chéng', word: '城市' }
    ]},
    { id: 212, title: '坐井观天', chars: [
      { char: '井', pinyin: 'jǐng', word: '水井' }, { char: '观', pinyin: 'guān', word: '观看' },
      { char: '沿', pinyin: 'yán', word: '井沿' }, { char: '答', pinyin: 'dá', word: '回答' },
      { char: '渴', pinyin: 'kě', word: '口渴' }, { char: '喝', pinyin: 'hē', word: '喝水' },
      { char: '话', pinyin: 'huà', word: '说话' }, { char: '际', pinyin: 'jì', word: '国际' }
    ]},
    { id: 213, title: '寒号鸟', chars: [
      { char: '阵', pinyin: 'zhèn', word: '一阵' }, { char: '朗', pinyin: 'lǎng', word: '明朗' },
      { char: '枯', pinyin: 'kū', word: '枯树' }, { char: '却', pinyin: 'què', word: '却是' },
      { char: '将', pinyin: 'jiāng', word: '将来' }, { char: '难', pinyin: 'nán', word: '困难' },
      { char: '纷', pinyin: 'fēn', word: '纷纷' }, { char: '棵', pinyin: 'kē', word: '一棵' }
    ]},
    { id: 214, title: '我要的是葫芦', chars: [
      { char: '棵', pinyin: 'kē', word: '一棵' }, { char: '谢', pinyin: 'xiè', word: '谢谢' },
      { char: '想', pinyin: 'xiǎng', word: '思想' }, { char: '盯', pinyin: 'dīng', word: '盯着' },
      { char: '言', pinyin: 'yán', word: '语言' }, { char: '呢', pinyin: 'ne', word: '呢吗' },
      { char: '邻', pinyin: 'lín', word: '邻居' }, { char: '治', pinyin: 'zhì', word: '治病' }
    ]},
    { id: 215, title: '大禹治水', chars: [
      { char: '洪', pinyin: 'hóng', word: '洪水' }, { char: '毒', pinyin: 'dú', word: '有毒' },
      { char: '难', pinyin: 'nán', word: '困难' }, { char: '退', pinyin: 'tuì', word: '后退' },
      { char: '续', pinyin: 'xù', word: '继续' }, { char: '认', pinyin: 'rèn', word: '认识' },
      { char: '训', pinyin: 'xùn', word: '训练' }, { char: '恢', pinyin: 'huī', word: '恢复' }
    ]},
    { id: 216, title: '朱德的扁担', chars: [
      { char: '扁', pinyin: 'biǎn', word: '扁担' }, { char: '担', pinyin: 'dàn', word: '担子' },
      { char: '志', pinyin: 'zhì', word: '志气' }, { char: '伍', pinyin: 'wǔ', word: '队伍' },
      { char: '师', pinyin: 'shī', word: '老师' }, { char: '军', pinyin: 'jūn', word: '军队' },
      { char: '战', pinyin: 'zhàn', word: '战斗' }, { char: '士', pinyin: 'shì', word: '战士' }
    ]},
    { id: 217, title: '难忘的泼水节', chars: [
      { char: '忘', pinyin: 'wàng', word: '忘记' }, { char: '泼', pinyin: 'pō', word: '泼水' },
      { char: '度', pinyin: 'dù', word: '度过' }, { char: '龙', pinyin: 'lóng', word: '龙船' },
      { char: '炮', pinyin: 'pào', word: '花炮' }, { char: '穿', pinyin: 'chuān', word: '穿着' },
      { char: '始', pinyin: 'shǐ', word: '开始' }, { char: '令', pinyin: 'lìng', word: '口令' }
    ]},
    { id: 218, title: '古诗二首（山寺）', chars: [
      { char: '危', pinyin: 'wēi', word: '危险' }, { char: '敢', pinyin: 'gǎn', word: '勇敢' },
      { char: '惊', pinyin: 'jīng', word: '吃惊' }, { char: '阴', pinyin: 'yīn', word: '阴天' },
      { char: '似', pinyin: 'sì', word: '似乎' }, { char: '野', pinyin: 'yě', word: '野外' },
      { char: '茫', pinyin: 'máng', word: '茫茫' }, { char: '苍', pinyin: 'cāng', word: '苍白' }
    ]},
    { id: 219, title: '雾在哪里', chars: [
      { char: '雾', pinyin: 'wù', word: '大雾' }, { char: '淘', pinyin: 'táo', word: '淘气' },
      { char: '藏', pinyin: 'cáng', word: '躲藏' }, { char: '暗', pinyin: 'àn', word: '黑暗' },
      { char: '街', pinyin: 'jiē', word: '街道' }, { char: '梁', pinyin: 'liáng', word: '桥梁' },
      { char: '甚', pinyin: 'shèn', word: '甚至' }, { char: '至', pinyin: 'zhì', word: '至于' }
    ]},
    { id: 220, title: '雪孩子', chars: [
      { char: '孩', pinyin: 'hái', word: '孩子' }, { char: '谁', pinyin: 'shuí', word: '是谁' },
      { char: '赶', pinyin: 'gǎn', word: '赶快' }, { char: '旁', pinyin: 'páng', word: '旁边' },
      { char: '浑', pinyin: 'hún', word: '浑身' }, { char: '候', pinyin: 'hòu', word: '时候' },
      { char: '旺', pinyin: 'wàng', word: '兴旺' }, { char: '围', pinyin: 'wéi', word: '包围' }
    ]},
    { id: 221, title: '狐假虎威', chars: [
      { char: '食', pinyin: 'shí', word: '食物' }, { char: '物', pinyin: 'wù', word: '动物' },
      { char: '眼', pinyin: 'yǎn', word: '眼睛' }, { char: '爪', pinyin: 'zhuǎ', word: '爪子' },
      { char: '神', pinyin: 'shén', word: '神气' }, { char: '活', pinyin: 'huó', word: '生活' },
      { char: '猪', pinyin: 'zhū', word: '小猪' }, { char: '违', pinyin: 'wéi', word: '违反' }
    ]}
  ];

  var G2S2 = [
    { id: 301, title: '古诗二首（咏柳）', chars: [
      { char: '诗', pinyin: 'shī', word: '古诗' }, { char: '碧', pinyin: 'bì', word: '碧绿' },
      { char: '妆', pinyin: 'zhuāng', word: '化妆' }, { char: '绿', pinyin: 'lǜ', word: '绿色' },
      { char: '丝', pinyin: 'sī', word: '丝线' }, { char: '剪', pinyin: 'jiǎn', word: '剪刀' },
      { char: '莺', pinyin: 'yīng', word: '黄莺' }, { char: '拂', pinyin: 'fú', word: '吹拂' }
    ]},
    { id: 302, title: '找春天', chars: [
      { char: '脱', pinyin: 'tuō', word: '脱下' }, { char: '袄', pinyin: 'ǎo', word: '棉袄' },
      { char: '寻', pinyin: 'xún', word: '寻找' }, { char: '眉', pinyin: 'méi', word: '眉毛' },
      { char: '吐', pinyin: 'tǔ', word: '吐出' }, { char: '芽', pinyin: 'yá', word: '发芽' },
      { char: '荡', pinyin: 'dàng', word: '荡秋千' }, { char: '柳', pinyin: 'liǔ', word: '柳树' }
    ]},
    { id: 303, title: '开满鲜花的小路', chars: [
      { char: '邮', pinyin: 'yóu', word: '邮局' }, { char: '递', pinyin: 'dì', word: '传递' },
      { char: '员', pinyin: 'yuán', word: '人员' }, { char: '原', pinyin: 'yuán', word: '原来' },
      { char: '叔', pinyin: 'shū', word: '叔叔' }, { char: '局', pinyin: 'jú', word: '邮局' },
      { char: '堆', pinyin: 'duī', word: '堆积' }, { char: '礼', pinyin: 'lǐ', word: '礼物' }
    ]},
    { id: 304, title: '邓小平爷爷植树', chars: [
      { char: '邓', pinyin: 'dèng', word: '邓小平' }, { char: '植', pinyin: 'zhí', word: '植树' },
      { char: '格', pinyin: 'gé', word: '格子' }, { char: '引', pinyin: 'yǐn', word: '引导' },
      { char: '注', pinyin: 'zhù', word: '注意' }, { char: '满', pinyin: 'mǎn', word: '满足' },
      { char: '休', pinyin: 'xiū', word: '休息' }, { char: '息', pinyin: 'xī', word: '休息' }
    ]},
    { id: 305, title: '雷锋叔叔', chars: [
      { char: '锋', pinyin: 'fēng', word: '雷锋' }, { char: '昨', pinyin: 'zuó', word: '昨天' },
      { char: '冒', pinyin: 'mào', word: '冒雨' }, { char: '留', pinyin: 'liú', word: '留下' },
      { char: '弯', pinyin: 'wān', word: '弯曲' }, { char: '背', pinyin: 'bēi', word: '背着' },
      { char: '洒', pinyin: 'sǎ', word: '洒水' }, { char: '温', pinyin: 'wēn', word: '温暖' }
    ]},
    { id: 306, title: '赋得古原草送别', chars: [
      { char: '诗', pinyin: 'shī', word: '古诗' }, { char: '野', pinyin: 'yě', word: '野外' },
      { char: '烧', pinyin: 'shāo', word: '燃烧' }, { char: '荣', pinyin: 'róng', word: '光荣' },
      { char: '枯', pinyin: 'kū', word: '枯树' }, { char: '吹', pinyin: 'chuī', word: '吹拂' },
      { char: '离', pinyin: 'lí', word: '离开' }, { char: '原', pinyin: 'yuán', word: '草原' }
    ]},
    { id: 307, title: '一匹出色的马', chars: [
      { char: '匹', pinyin: 'pǐ', word: '一匹' }, { char: '波', pinyin: 'bō', word: '波浪' },
      { char: '纹', pinyin: 'wén', word: '波纹' }, { char: '异', pinyin: 'yì', word: '异常' },
      { char: '恋', pinyin: 'liàn', word: '留恋' }, { char: '舍', pinyin: 'shě', word: '舍得' },
      { char: '求', pinyin: 'qiú', word: '要求' }, { char: '株', pinyin: 'zhū', word: '一株' }
    ]},
    { id: 308, title: '彩色的梦', chars: [
      { char: '彩', pinyin: 'cǎi', word: '彩色' }, { char: '梦', pinyin: 'mèng', word: '梦想' },
      { char: '森', pinyin: 'sēn', word: '森林' }, { char: '拉', pinyin: 'lā', word: '拉手' },
      { char: '结', pinyin: 'jié', word: '结果' }, { char: '苹', pinyin: 'píng', word: '苹果' },
      { char: '精', pinyin: 'jīng', word: '精灵' }, { char: '灵', pinyin: 'líng', word: '灵活' }
    ]},
    { id: 309, title: '枫树上的喜鹊', chars: [
      { char: '伞', pinyin: 'sǎn', word: '雨伞' }, { char: '姨', pinyin: 'yí', word: '阿姨' },
      { char: '弟', pinyin: 'dì', word: '弟弟' }, { char: '便', pinyin: 'biàn', word: '方便' },
      { char: '教', pinyin: 'jiāo', word: '教学' }, { char: '游', pinyin: 'yóu', word: '游戏' },
      { char: '戏', pinyin: 'xì', word: '游戏' }, { char: '母', pinyin: 'mǔ', word: '母亲' }
    ]},
    { id: 310, title: '沙滩上的童话', chars: [
      { char: '堡', pinyin: 'bǎo', word: '城堡' }, { char: '插', pinyin: 'chā', word: '插入' },
      { char: '凶', pinyin: 'xiōng', word: '凶狠' }, { char: '狠', pinyin: 'hěn', word: '狠心' },
      { char: '充', pinyin: 'chōng', word: '充满' }, { char: '商', pinyin: 'shāng', word: '商量' },
      { char: '量', pinyin: 'liàng', word: '数量' }, { char: '驾', pinyin: 'jià', word: '驾驶' }
    ]},
    { id: 311, title: '寓言二则', chars: [
      { char: '亡', pinyin: 'wáng', word: '亡羊' }, { char: '牢', pinyin: 'láo', word: '牢固' },
      { char: '钻', pinyin: 'zuān', word: '钻出' }, { char: '劝', pinyin: 'quàn', word: '劝告' },
      { char: '丢', pinyin: 'diū', word: '丢失' }, { char: '告', pinyin: 'gào', word: '告诉' },
      { char: '筋', pinyin: 'jīn', word: '筋疲力尽' }, { char: '疲', pinyin: 'pí', word: '疲劳' }
    ]},
    { id: 312, title: '画杨桃', chars: [
      { char: '图', pinyin: 'tú', word: '图画' }, { char: '课', pinyin: 'kè', word: '上课' },
      { char: '摆', pinyin: 'bǎi', word: '摆放' }, { char: '座', pinyin: 'zuò', word: '座位' },
      { char: '室', pinyin: 'shì', word: '教室' }, { char: '交', pinyin: 'jiāo', word: '交流' },
      { char: '哈', pinyin: 'hā', word: '哈哈' }, { char: '页', pinyin: 'yè', word: '书页' }
    ]},
    { id: 313, title: '小马过河', chars: [
      { char: '愿', pinyin: 'yuàn', word: '愿意' }, { char: '意', pinyin: 'yì', word: '意思' },
      { char: '麦', pinyin: 'mài', word: '麦子' }, { char: '该', pinyin: 'gāi', word: '应该' },
      { char: '伯', pinyin: 'bó', word: '伯伯' }, { char: '浅', pinyin: 'qiǎn', word: '深浅' },
      { char: '突', pinyin: 'tū', word: '突然' }, { char: '掉', pinyin: 'diào', word: '掉下' }
    ]},
    { id: 314, title: '古诗二首（绝句）', chars: [
      { char: '绝', pinyin: 'jué', word: '绝对' }, { char: '鸣', pinyin: 'míng', word: '鸣叫' },
      { char: '含', pinyin: 'hán', word: '包含' }, { char: '岭', pinyin: 'lǐng', word: '山岭' },
      { char: '吴', pinyin: 'wú', word: '东吴' }, { char: '泊', pinyin: 'bó', word: '停泊' },
      { char: '晓', pinyin: 'xiǎo', word: '拂晓' }, { char: '净', pinyin: 'jìng', word: '干净' }
    ]},
    { id: 315, title: '雷雨', chars: [
      { char: '雷', pinyin: 'léi', word: '打雷' }, { char: '乌', pinyin: 'wū', word: '乌云' },
      { char: '黑', pinyin: 'hēi', word: '黑色' }, { char: '压', pinyin: 'yā', word: '压住' },
      { char: '垂', pinyin: 'chuí', word: '垂下' }, { char: '哗', pinyin: 'huā', word: '哗哗' },
      { char: '渐', pinyin: 'jiàn', word: '渐渐' }, { char: '亮', pinyin: 'liàng', word: '明亮' }
    ]},
    { id: 316, title: '要是你在野外迷了路', chars: [
      { char: '慌', pinyin: 'huāng', word: '慌张' }, { char: '辨', pinyin: 'biàn', word: '辨别' },
      { char: '忠', pinyin: 'zhōng', word: '忠实' }, { char: '导', pinyin: 'dǎo', word: '指导' },
      { char: '盏', pinyin: 'zhǎn', word: '一盏' }, { char: '永', pinyin: 'yǒng', word: '永远' },
      { char: '闯', pinyin: 'chuǎng', word: '闯荡' }, { char: '稠', pinyin: 'chóu', word: '稠密' }
    ]},
    { id: 317, title: '太空生活趣事多', chars: [
      { char: '宇', pinyin: 'yǔ', word: '宇宙' }, { char: '宙', pinyin: 'zhòu', word: '宇宙' },
      { char: '舱', pinyin: 'cāng', word: '船舱' }, { char: '浴', pinyin: 'yù', word: '浴室' },
      { char: '桶', pinyin: 'tǒng', word: '水桶' }, { char: '固', pinyin: 'gù', word: '固定' },
      { char: '定', pinyin: 'dìng', word: '一定' }, { char: '杯', pinyin: 'bēi', word: '杯子' }
    ]},
    { id: 318, title: '大象的耳朵', chars: [
      { char: '扇', pinyin: 'shàn', word: '扇子' }, { char: '慢', pinyin: 'màn', word: '慢慢' },
      { char: '遇', pinyin: 'yù', word: '遇见' }, { char: '根', pinyin: 'gēn', word: '树根' },
      { char: '痛', pinyin: 'tòng', word: '痛苦' }, { char: '最', pinyin: 'zuì', word: '最好' },
      { char: '烦', pinyin: 'fán', word: '麻烦' }, { char: '似', pinyin: 'sì', word: '似乎' }
    ]},
    { id: 319, title: '蜘蛛开店', chars: [
      { char: '店', pinyin: 'diàn', word: '商店' }, { char: '决', pinyin: 'jué', word: '决定' },
      { char: '定', pinyin: 'dìng', word: '一定' }, { char: '商', pinyin: 'shāng', word: '商人' },
      { char: '夫', pinyin: 'fū', word: '丈夫' }, { char: '终', pinyin: 'zhōng', word: '终于' },
      { char: '完', pinyin: 'wán', word: '完成' }, { char: '换', pinyin: 'huàn', word: '交换' }
    ]},
    { id: 320, title: '小毛虫', chars: [
      { char: '整', pinyin: 'zhěng', word: '整齐' }, { char: '抽', pinyin: 'chōu', word: '抽丝' },
      { char: '纺', pinyin: 'fǎng', word: '纺织' }, { char: '织', pinyin: 'zhī', word: '织布' },
      { char: '编', pinyin: 'biān', word: '编织' }, { char: '怎', pinyin: 'zěn', word: '怎么' },
      { char: '布', pinyin: 'bù', word: '布匹' }, { char: '昆', pinyin: 'kūn', word: '昆虫' }
    ]}
  ];

  var SEMESTERS = [
    { id: 'g1s2', name: '一年级下册', desc: '一升二重点复习', lessons: G1S2 },
    { id: 'g1s1', name: '一年级上册', desc: '巩固回顾', lessons: G1S1 },
    { id: 'g2s1', name: '二年级上册', desc: '新学期预习', lessons: G2S1 },
    { id: 'g2s2', name: '二年级下册', desc: '提前认读', lessons: G2S2 }
  ];

  var charPool = {};
  function addToPool(item) {
    if (!charPool[item.char]) charPool[item.char] = item;
  }
  if (window.CHAR_DATA && window.CHAR_DATA.CHARACTERS) {
    window.CHAR_DATA.CHARACTERS.forEach(addToPool);
  }
  SEMESTERS.forEach(function (sem) {
    sem.lessons.forEach(function (lesson) {
      lesson.chars.forEach(addToPool);
    });
  });

  var STORAGE_KEY = 'lesson_progress_v1';

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function getCharMeta(char) {
    return charPool[char] || { char: char, pinyin: '', word: char };
  }

  function getAllPinyinPool() {
    var list = [];
    var seen = {};
    Object.keys(charPool).forEach(function (c) {
      var py = charPool[c].pinyin;
      if (py && !seen[py]) {
        seen[py] = true;
        list.push(py);
      }
    });
    return list;
  }

  function starsFromScore(score, total) {
    if (total <= 0) return 0;
    var pct = score / total;
    if (pct >= 0.95) return 3;
    if (pct >= 0.8) return 2;
    if (pct >= 0.6) return 1;
    return 0;
  }

  return {
    SEMESTERS: SEMESTERS,
    getCharMeta: getCharMeta,
    getAllPinyinPool: getAllPinyinPool,
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    starsFromScore: starsFromScore,
    findLesson: function (lessonId) {
      var found = null;
      SEMESTERS.some(function (sem) {
        sem.lessons.some(function (les) {
          if (les.id === lessonId) {
            found = { semester: sem, lesson: les };
            return true;
          }
          return false;
        });
        return !!found;
      });
      return found;
    }
  };
})();
