/**
 * 部编版课文识字 · 按课分组（一～三年级上）
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

  var G3S1 = [
    { id: 401, title: '大青树下的小学', chars: [
      { char: '坝', pinyin: 'bà', word: '大坝' }, { char: '汉', pinyin: 'hàn', word: '汉族' },
      { char: '艳', pinyin: 'yàn', word: '鲜艳' }, { char: '扮', pinyin: 'bàn', word: '打扮' },
      { char: '扬', pinyin: 'yáng', word: '表扬' }, { char: '读', pinyin: 'dú', word: '读书' },
      { char: '摔', pinyin: 'shuāi', word: '摔跤' }, { char: '跤', pinyin: 'jiāo', word: '摔跤' },
      { char: '凤', pinyin: 'fèng', word: '凤凰' }, { char: '洁', pinyin: 'jié', word: '洁白' }
    ]},
    { id: 402, title: '花的学校', chars: [
      { char: '荒', pinyin: 'huāng', word: '荒草' }, { char: '笛', pinyin: 'dí', word: '笛子' },
      { char: '罚', pinyin: 'fá', word: '惩罚' }, { char: '假', pinyin: 'jià', word: '放假' },
      { char: '裳', pinyin: 'shang', word: '衣裳' }
    ]},
    { id: 403, title: '不懂就要问', chars: [
      { char: '背', pinyin: 'bèi', word: '背书' }, { char: '诵', pinyin: 'sòng', word: '背诵' },
      { char: '例', pinyin: 'lì', word: '例子' }, { char: '圈', pinyin: 'quān', word: '圆圈' },
      { char: '段', pinyin: 'duàn', word: '段落' }, { char: '练', pinyin: 'liàn', word: '练习' },
      { char: '糊', pinyin: 'hú', word: '糊涂' }, { char: '涂', pinyin: 'tú', word: '涂改' },
      { char: '呆', pinyin: 'dāi', word: '发呆' }, { char: '戒', pinyin: 'jiè', word: '戒尺' },
      { char: '厉', pinyin: 'lì', word: '严厉' }, { char: '挨', pinyin: 'ái', word: '挨打' },
      { char: '楚', pinyin: 'chǔ', word: '清楚' }
    ]},
    { id: 404, title: '古诗三首', chars: [
      { char: '径', pinyin: 'jìng', word: '小径' }, { char: '斜', pinyin: 'xié', word: '倾斜' },
      { char: '赠', pinyin: 'zèng', word: '赠送' }, { char: '刘', pinyin: 'liú', word: '姓刘' },
      { char: '残', pinyin: 'cán', word: '残缺' }, { char: '犹', pinyin: 'yóu', word: '犹如' },
      { char: '傲', pinyin: 'ào', word: '骄傲' }, { char: '君', pinyin: 'jūn', word: '君子' },
      { char: '橙', pinyin: 'chéng', word: '橙子' }, { char: '橘', pinyin: 'jú', word: '橘子' },
      { char: '挑', pinyin: 'tiǎo', word: '挑战' }
    ]},
    { id: 405, title: '铺满金色巴掌的水泥道', chars: [
      { char: '洼', pinyin: 'wā', word: '水洼' }, { char: '印', pinyin: 'yìn', word: '脚印' },
      { char: '凌', pinyin: 'líng', word: '凌晨' }, { char: '增', pinyin: 'zēng', word: '增加' },
      { char: '棕', pinyin: 'zōng', word: '棕色' }, { char: '靴', pinyin: 'xuē', word: '靴子' }
    ]},
    { id: 406, title: '秋天的雨', chars: [
      { char: '钥', pinyin: 'yào', word: '钥匙' }, { char: '匙', pinyin: 'shi', word: '钥匙' },
      { char: '缤', pinyin: 'bīn', word: '缤纷' }, { char: '枚', pinyin: 'méi', word: '一枚' },
      { char: '争', pinyin: 'zhēng', word: '争着' }, { char: '勾', pinyin: 'gōu', word: '勾画' },
      { char: '喇', pinyin: 'lǎ', word: '喇叭' }, { char: '厚', pinyin: 'hòu', word: '厚厚' },
      { char: '曲', pinyin: 'qǔ', word: '歌曲' }, { char: '丰', pinyin: 'fēng', word: '丰富' }
    ]},
    { id: 407, title: '听听，秋的声音', chars: [
      { char: '抖', pinyin: 'dǒu', word: '抖动' }, { char: '蟋', pinyin: 'xī', word: '蟋蟀' },
      { char: '蟀', pinyin: 'shuài', word: '蟋蟀' }, { char: '振', pinyin: 'zhèn', word: '振动' },
      { char: '韵', pinyin: 'yùn', word: '韵律' }, { char: '掠', pinyin: 'lüè', word: '掠过' },
      { char: '吟', pinyin: 'yín', word: '吟诵' }, { char: '辽', pinyin: 'liáo', word: '辽阔' },
      { char: '阔', pinyin: 'kuò', word: '广阔' }
    ]},
    { id: 408, title: '卖火柴的小女孩', chars: [
      { char: '旧', pinyin: 'jiù', word: '旧的' }, { char: '饿', pinyin: 'è', word: '饥饿' },
      { char: '卷', pinyin: 'juǎn', word: '卷起' }, { char: '挣', pinyin: 'zhèng', word: '挣钱' },
      { char: '几', pinyin: 'jī', word: '几乎' }, { char: '燃', pinyin: 'rán', word: '燃烧' },
      { char: '焰', pinyin: 'yàn', word: '火焰' }, { char: '蜡', pinyin: 'là', word: '蜡烛' },
      { char: '烛', pinyin: 'zhú', word: '烛光' }, { char: '富', pinyin: 'fù', word: '富裕' },
      { char: '晃', pinyin: 'huǎng', word: '晃眼' }, { char: '划', pinyin: 'huá', word: '划船' },
      { char: '喷', pinyin: 'pèn', word: '喷香' }
    ]},
    { id: 409, title: '那一定会很好', chars: [
      { char: '缩', pinyin: 'suō', word: '缩小' }, { char: '努', pinyin: 'nǔ', word: '努力' },
      { char: '茎', pinyin: 'jīng', word: '根茎' }, { char: '锯', pinyin: 'jù', word: '锯子' },
      { char: '斧', pinyin: 'fǔ', word: '斧头' }, { char: '推', pinyin: 'tuī', word: '推动' },
      { char: '吱', pinyin: 'zhī', word: '吱呀' }, { char: '拆', pinyin: 'chāi', word: '拆除' }
    ]},
    { id: 410, title: '在牛肚子里旅行', chars: [
      { char: '咱', pinyin: 'zán', word: '咱们' }, { char: '偷', pinyin: 'tōu', word: '偷看' },
      { char: '答', pinyin: 'dá', word: '回答' }, { char: '应', pinyin: 'yìng', word: '答应' },
      { char: '骨', pinyin: 'gǔ', word: '骨头' }, { char: '齿', pinyin: 'chǐ', word: '牙齿' },
      { char: '嚼', pinyin: 'jiáo', word: '咀嚼' }, { char: '吞', pinyin: 'tūn', word: '吞咽' },
      { char: '胃', pinyin: 'wèi', word: '胃口' }, { char: '悲', pinyin: 'bēi', word: '悲伤' },
      { char: '咽', pinyin: 'yàn', word: '咽喉' }, { char: '泪', pinyin: 'lèi', word: '眼泪' },
      { char: '眯', pinyin: 'mī', word: '眯眼' }
    ]},
    { id: 411, title: '一块奶酪', chars: [
      { char: '宣', pinyin: 'xuān', word: '宣布' }, { char: '处', pinyin: 'chǔ', word: '处理' },
      { char: '诱', pinyin: 'yòu', word: '诱惑' }, { char: '舔', pinyin: 'tiǎn', word: '舔食' },
      { char: '毅', pinyin: 'yì', word: '毅力' }, { char: '强', pinyin: 'qiáng', word: '强壮' },
      { char: '犯', pinyin: 'fàn', word: '犯法' }, { char: '禁', pinyin: 'jìn', word: '禁止' },
      { char: '稍', pinyin: 'shāo', word: '稍微' }, { char: '豫', pinyin: 'yù', word: '犹豫' },
      { char: '跺', pinyin: 'duò', word: '跺脚' }, { char: '聚', pinyin: 'jù', word: '聚集' }
    ]},
    { id: 412, title: '总也倒不了的老屋', chars: [
      { char: '暴', pinyin: 'bào', word: '暴雨' }, { char: '凑', pinyin: 'còu', word: '凑近' },
      { char: '喵', pinyin: 'miāo', word: '喵呜' }, { char: '孵', pinyin: 'fū', word: '孵化' },
      { char: '叽', pinyin: 'jī', word: '叽叽' }, { char: '偶', pinyin: 'ǒu', word: '偶尔' },
      { char: '尔', pinyin: 'ěr', word: '偶尔' }
    ]},
    { id: 413, title: '胡萝卜先生的长胡子', chars: [
      { char: '萝', pinyin: 'luó', word: '萝卜' }, { char: '卜', pinyin: 'bo', word: '萝卜' },
      { char: '愁', pinyin: 'chóu', word: '忧愁' }, { char: '沾', pinyin: 'zhān', word: '沾水' },
      { char: '晾', pinyin: 'liàng', word: '晾晒' }
    ]},
    { id: 414, title: '小狗学叫', chars: [
      { char: '讨', pinyin: 'tǎo', word: '讨厌' }, { char: '厌', pinyin: 'yàn', word: '厌恶' },
      { char: '怒', pinyin: 'nù', word: '愤怒' }, { char: '批', pinyin: 'pī', word: '批评' },
      { char: '访', pinyin: 'fǎng', word: '访问' }, { char: '担', pinyin: 'dān', word: '担心' },
      { char: '压', pinyin: 'yā', word: '压力' }, { char: '差', pinyin: 'chà', word: '差点' },
      { char: '忍', pinyin: 'rěn', word: '忍耐' }, { char: '模', pinyin: 'mó', word: '模仿' },
      { char: '弹', pinyin: 'dàn', word: '子弹' }, { char: '疯', pinyin: 'fēng', word: '疯狂' },
      { char: '汪', pinyin: 'wāng', word: '汪汪' }, { char: '搞', pinyin: 'gǎo', word: '搞好' }
    ]},
    { id: 415, title: '搭船的鸟', chars: [
      { char: '父', pinyin: 'fù', word: '父亲' }, { char: '啦', pinyin: 'la', word: '好啦' },
      { char: '鹦', pinyin: 'yīng', word: '鹦鹉' }, { char: '鹉', pinyin: 'wǔ', word: '鹦鹉' },
      { char: '悄', pinyin: 'qiāo', word: '悄悄' }
    ]},
    { id: 416, title: '金色的草地', chars: [
      { char: '蒲', pinyin: 'pú', word: '蒲公英' }, { char: '英', pinyin: 'yīng', word: '英雄' },
      { char: '耍', pinyin: 'shuǎ', word: '玩耍' }, { char: '欠', pinyin: 'qiàn', word: '欠身' },
      { char: '钓', pinyin: 'diào', word: '钓鱼' }, { char: '拢', pinyin: 'lǒng', word: '聚拢' }
    ]},
    { id: 417, title: '古诗三首（望天门山）', chars: [
      { char: '亦', pinyin: 'yì', word: '亦然' }, { char: '抹', pinyin: 'mǒ', word: '涂抹' },
      { char: '宜', pinyin: 'yí', word: '适宜' }, { char: '庭', pinyin: 'tíng', word: '庭院' },
      { char: '未', pinyin: 'wèi', word: '未来' }, { char: '磨', pinyin: 'mó', word: '磨镜' },
      { char: '盘', pinyin: 'pán', word: '盘子' }
    ]},
    { id: 418, title: '富饶的西沙群岛', chars: [
      { char: '饶', pinyin: 'ráo', word: '富饶' }, { char: '优', pinyin: 'yōu', word: '优秀' },
      { char: '瑰', pinyin: 'guī', word: '瑰丽' }, { char: '岩', pinyin: 'yán', word: '岩石' },
      { char: '参', pinyin: 'shēn', word: '海参' }, { char: '虾', pinyin: 'xiā', word: '虾仁' },
      { char: '武', pinyin: 'wǔ', word: '武器' }, { char: '粪', pinyin: 'fèn', word: '鸟粪' },
      { char: '辈', pinyin: 'bèi', word: '前辈' }, { char: '设', pinyin: 'shè', word: '设计' }
    ]},
    { id: 419, title: '海滨小城', chars: [
      { char: '滨', pinyin: 'bīn', word: '海滨' }, { char: '鸥', pinyin: 'ōu', word: '海鸥' },
      { char: '胳', pinyin: 'gē', word: '胳膊' }, { char: '臂', pinyin: 'bì', word: '手臂' },
      { char: '睬', pinyin: 'cǎi', word: '理睬' }, { char: '载', pinyin: 'zài', word: '装载' },
      { char: '凰', pinyin: 'huáng', word: '凤凰' }, { char: '亚', pinyin: 'yà', word: '亚洲' },
      { char: '榕', pinyin: 'róng', word: '榕树' }, { char: '凳', pinyin: 'dèng', word: '板凳' },
      { char: '逢', pinyin: 'féng', word: '相逢' }, { char: '除', pinyin: 'chú', word: '除去' }
    ]},
    { id: 420, title: '美丽的小兴安岭', chars: [
      { char: '兴', pinyin: 'xīng', word: '兴安' }, { char: '融', pinyin: 'róng', word: '融化' },
      { char: '侧', pinyin: 'cè', word: '侧面' }, { char: '欣', pinyin: 'xīn', word: '欣赏' },
      { char: '浸', pinyin: 'jìn', word: '浸泡' }, { char: '乳', pinyin: 'rǔ', word: '乳白色' },
      { char: '梢', pinyin: 'shāo', word: '树梢' }, { char: '舍', pinyin: 'shě', word: '舍不得' },
      { char: '显', pinyin: 'xiǎn', word: '明显' }, { char: '材', pinyin: 'cái', word: '木材' },
      { char: '膝', pinyin: 'xī', word: '膝盖' }, { char: '临', pinyin: 'lín', word: '来临' },
      { char: '库', pinyin: 'kù', word: '宝库' }
    ]},
    { id: 421, title: '大自然的声音', chars: [
      { char: '妙', pinyin: 'miào', word: '奇妙' }, { char: '奏', pinyin: 'zòu', word: '演奏' },
      { char: '呢', pinyin: 'ní', word: '呢喃' }, { char: '喃', pinyin: 'nán', word: '呢喃' },
      { char: '伟', pinyin: 'wěi', word: '伟大' }, { char: '击', pinyin: 'jī', word: '打击' },
      { char: '汇', pinyin: 'huì', word: '汇合' }, { char: '喳', pinyin: 'zhā', word: '喳喳' }
    ]},
    { id: 422, title: '读不完的大书', chars: [
      { char: '黎', pinyin: 'lí', word: '黎明' }, { char: '凝', pinyin: 'níng', word: '凝视' },
      { char: '畅', pinyin: 'chàng', word: '畅快' }, { char: '瞬', pinyin: 'shùn', word: '瞬间' },
      { char: '猎', pinyin: 'liè', word: '打猎' }
    ]},
    { id: 423, title: '父亲、树林和鸟', chars: [
      { char: '枣', pinyin: 'zǎo', word: '枣树' }, { char: '馋', pinyin: 'chán', word: '嘴馋' },
      { char: '缓', pinyin: 'huǎn', word: '缓慢' }, { char: '讶', pinyin: 'yà', word: '惊讶' },
      { char: '测', pinyin: 'cè', word: '猜测' }, { char: '监', pinyin: 'jiān', word: '监视' },
      { char: '恍', pinyin: 'huǎng', word: '恍然' }, { char: '悟', pinyin: 'wù', word: '领悟' },
      { char: '逐', pinyin: 'zhú', word: '逐渐' }, { char: '扎', pinyin: 'zhā', word: '扎根' },
      { char: '聪', pinyin: 'cōng', word: '聪明' }
    ]},
    { id: 424, title: '司马光', chars: [
      { char: '司', pinyin: 'sī', word: '司马' }, { char: '跌', pinyin: 'diē', word: '跌倒' },
      { char: '皆', pinyin: 'jiē', word: '全都' }, { char: '弃', pinyin: 'qì', word: '放弃' },
      { char: '持', pinyin: 'chí', word: '拿着' }
    ]},
    { id: 425, title: '灰雀', chars: [
      { char: '默', pinyin: 'mò', word: '沉默' }, { char: '落', pinyin: 'luò', word: '落下' },
      { char: '姿', pinyin: 'zī', word: '姿势' }, { char: '势', pinyin: 'shì', word: '姿势' },
      { char: '投', pinyin: 'tóu', word: '投食' }, { char: '调', pinyin: 'diào', word: '曲调' },
      { char: '况', pinyin: 'kuàng', word: '情况' }, { char: '烈', pinyin: 'liè', word: '强烈' },
      { char: '镇', pinyin: 'zhèn', word: '镇定' }, { char: '述', pinyin: 'shù', word: '叙述' },
      { char: '普', pinyin: 'pǔ', word: '普通' }, { char: '忧', pinyin: 'yōu', word: '忧伤' },
      { char: '联', pinyin: 'lián', word: '联系' }
    ]},
    { id: 426, title: '手术台就是阵地', chars: [
      { char: '宁', pinyin: 'níng', word: '宁静' }, { char: '胸', pinyin: 'xiōng', word: '胸膛' },
      { char: '脯', pinyin: 'pú', word: '胸脯' }, { char: '惹', pinyin: 'rě', word: '惹事' },
      { char: '仰', pinyin: 'yǎng', word: '仰望' }, { char: '渣', pinyin: 'zhā', word: '渣滓' },
      { char: '或', pinyin: 'huò', word: '或者' }, { char: '者', pinyin: 'zhě', word: '或者' },
      { char: '惜', pinyin: 'xī', word: '爱惜' }, { char: '诚', pinyin: 'chéng', word: '诚实' }
    ]},
    { id: 427, title: '一个粗瓷大碗', chars: [
      { char: '斗', pinyin: 'dòu', word: '斗争' }, { char: '棒', pinyin: 'bàng', word: '木棒' },
      { char: '恩', pinyin: 'ēn', word: '恩情' }, { char: '撤', pinyin: 'chè', word: '撤退' },
      { char: '险', pinyin: 'xiǎn', word: '危险' }, { char: '瓦', pinyin: 'wǎ', word: '瓦片' },
      { char: '帘', pinyin: 'lián', word: '门帘' }, { char: '迅', pinyin: 'xùn', word: '迅速' },
      { char: '速', pinyin: 'sù', word: '速度' }, { char: '夺', pinyin: 'duó', word: '夺取' },
      { char: '秒', pinyin: 'miǎo', word: '分秒' }
    ]}
  ];


  var SEMESTERS = [
    { id: 'g1s2', name: '一年级下册', desc: '一升二重点复习', lessons: G1S2 },
    { id: 'g1s1', name: '一年级上册', desc: '巩固回顾', lessons: G1S1 },
    { id: 'g2s1', name: '二年级上册', desc: '新学期预习', lessons: G2S1 },
    { id: 'g2s2', name: '二年级下册', desc: '提前认读', lessons: G2S2 },
    { id: 'g3s1', name: '三年级上册', desc: '生字通关预习', lessons: G3S1 }
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
