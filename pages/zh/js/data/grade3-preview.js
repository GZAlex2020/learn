/**
 * 三年级语文 · 上册暑假必背（来源：docs/新版三年级上册语文必背内容汇总.pdf）
 */
window.GRADE3_PREVIEW = (function () {
  'use strict';

  var CATEGORIES = [
    { id: 'all', name: '按序学习', icon: '📋' },
    { id: 'garden', name: '日积月累', icon: '🌿' },
    { id: 'poem', name: '古诗必背', icon: '📜' },
    { id: 'text', name: '课文背诵', icon: '📗' }
  ];

  var RECITE_STORAGE_KEY = 'grade3_recite_v2';

  var ITEMS = [
    {
      category: 'garden', id: 'g3_g1_suojian', order: 1,
      unit: '语文园地一 · 日积月累',
      title: '《所见》', author: '【清】袁枚', poemId: 'g3_suojian',
      recite: '牧童骑黄牛，歌声振林樾。意欲捕鸣蝉，忽然闭口立。',
      lines: [
        { text: '牧童骑黄牛，', pinyin: 'mù tóng qí huáng niú,' },
        { text: '歌声振林樾。', pinyin: 'gē shēng zhèn lín yuè.' },
        { text: '意欲捕鸣蝉，', pinyin: 'yì yù bǔ míng chán,' },
        { text: '忽然闭口立。', pinyin: 'hū rán bì kǒu lì.' }
      ],
      content: '牧童骑黄牛，\n歌声振林樾。\n意欲捕鸣蝉，\n忽然闭口立。',
      notes: '①所见：写诗人所看见的事物。②振：振荡；回荡。③林樾：指道旁成荫的树。④欲：想要。',
      example: '译文：牧童骑黄牛，歌声在林中回荡；想捕鸣蝉，忽然闭口静立。\n中心：借牧童捕蝉，写田园童趣。',
      speak: '牧童骑黄牛，歌声振林樾。意欲捕鸣蝉，忽然闭口立。'
    },
    {
      category: 'poem', id: 'g3_wangdongting', order: 2,
      unit: '第二单元 第4课《古诗三首》',
      title: '《望洞庭》', author: '【唐】刘禹锡', poemId: 'g3_wangdongting',
      recite: '湖光秋月两相和，潭面无风镜未磨。遥望洞庭山水翠，白银盘里一青螺。',
      lines: [
        { text: '湖光秋月两相和，', pinyin: 'hú guāng qiū yuè liǎng xiāng hé,' },
        { text: '潭面无风镜未磨。', pinyin: 'tán miàn wú fēng jìng wèi mó,' },
        { text: '遥望洞庭山水翠，', pinyin: 'yáo wàng dòng tíng shān shuǐ cuì,' },
        { text: '白银盘里一青螺。', pinyin: 'bái yín pán lǐ yī qīng luó.' }
      ],
      content: '湖光秋月两相和，\n潭面无风镜未磨。\n遥望洞庭山水翠，\n白银盘里一青螺。',
      notes: '①洞庭：洞庭湖。②和：和谐交融。③镜未磨：湖面平静如未磨的铜镜。④青螺：比喻君山岛。',
      example: '译文：湖水与秋月交相辉映，湖面无风如未磨之镜；远望君山，如白银盘中的青螺。\n中心：表达对洞庭美景的热爱与开阔胸怀。',
      speak: '湖光秋月两相和，潭面无风镜未磨。遥望洞庭山水翠，白银盘里一青螺。'
    },
    {
      category: 'poem', id: 'g3_shanxing', order: 3,
      unit: '第二单元 第4课《古诗三首》',
      title: '《山行》', author: '【唐】杜牧', poemId: 'g3_shanxing',
      recite: '远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。',
      lines: [
        { text: '远上寒山石径斜，', pinyin: 'yuǎn shàng hán shān shí jìng xié,' },
        { text: '白云生处有人家。', pinyin: 'bái yún shēng chù yǒu rén jiā.' },
        { text: '停车坐爱枫林晚，', pinyin: 'tíng chē zuò ài fēng lín wǎn,' },
        { text: '霜叶红于二月花。', pinyin: 'shuāng yè hóng yú èr yuè huā.' }
      ],
      content: '远上寒山石径斜，\n白云生处有人家。\n停车坐爱枫林晚，\n霜叶红于二月花。',
      notes: '①山行：在山中行走。②寒山：深秋的山。③径：小路。④斜（xié）：蜿蜒。⑤生：出现。⑥坐：因为。',
      example: '译文：沿石径登深秋寒山，白云深处有人家；停车爱枫林晚景，霜叶比二月春花还红。\n中心：描绘深秋山景，表达对大自然的热爱。',
      speak: '远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。'
    },
    {
      category: 'poem', id: 'g3_yeshu', order: 4,
      unit: '第二单元 第4课《古诗三首》',
      title: '《夜书所见》', author: '【宋】叶绍翁', poemId: 'g3_yeshu',
      recite: '萧萧梧叶送寒声，江上秋风动客情。知有儿童挑促织，夜深篱落一灯明。',
      lines: [
        { text: '萧萧梧叶送寒声，', pinyin: 'xiāo xiāo wú yè sòng hán shēng,' },
        { text: '江上秋风动客情。', pinyin: 'jiāng shàng qiū fēng dòng kè qíng.' },
        { text: '知有儿童挑促织，', pinyin: 'zhī yǒu ér tóng tiāo cù zhī,' },
        { text: '夜深篱落一灯明。', pinyin: 'yè shēn lí luò yī dēng míng.' }
      ],
      content: '萧萧梧叶送寒声，\n江上秋风动客情。\n知有儿童挑促织，\n夜深篱落一灯明。',
      notes: '①萧萧：风吹梧桐叶的声音。②挑：用细棍拨。③促织：蟋蟀。④篱落：篱笆。',
      example: '译文：秋风吹梧叶，游子思乡；见儿童挑蟋蟀，篱笆下一盏灯，更衬游子孤独。\n中心：借秋景与童趣，表达客居思乡之情。',
      speak: '萧萧梧叶送寒声，江上秋风动客情。知有儿童挑促织，夜深篱落一灯明。'
    },
    {
      category: 'text', id: 'g3_qiutianyu', order: 5,
      unit: '第二单元 第6课',
      title: '《秋天的雨》第2自然段',
      recite: '秋天的雨，有一盒五彩缤纷的颜料。你看，它把黄色给了银杏树，黄黄的叶子像一把把小扇子，扇哪扇哪，扇走了夏天的炎热。它把红色给了枫树，红红的枫叶像一枚枚邮票，飘哇飘哇，邮来了秋天的凉爽。金黄色是给田野的，看，田野像金色的海洋。橙红色是给果树的，橘子、柿子你挤我碰，争着要人们去摘呢！菊花仙子得到的颜色就更多了，紫红的、淡黄的、雪白的……美丽的菊花在秋雨里频频点头。',
      content: '秋天的雨，有一盒五彩缤纷的颜料。\n你看，它把黄色给了银杏树……\n（见教材第二自然段全文）',
      example: '中心：用比喻、拟人写秋雨带来的缤纷色彩，表达对秋天的喜爱与赞美。',
      speak: '秋天的雨有一盒五彩缤纷的颜料，把黄色给了银杏树，把红色给了枫树，把金黄色给了田野。'
    },
    {
      category: 'garden', id: 'g3_zhouye', order: 6,
      unit: '语文园地二 · 日积月累',
      title: '《舟夜书所见》', author: '【清】查慎行', poemId: 'g3_zhouye',
      recite: '月黑见渔灯，孤光一点萤。微微风簇浪，散作满河星。',
      lines: [
        { text: '月黑见渔灯，', pinyin: 'yuè hēi jiàn yú dēng,' },
        { text: '孤光一点萤。', pinyin: 'gū guāng yī diǎn yíng.' },
        { text: '微微风簇浪，', pinyin: 'wēi wēi fēng cù làng,' },
        { text: '散作满河星。', pinyin: 'sàn zuò mǎn hé xīng.' }
      ],
      content: '月黑见渔灯，\n孤光一点萤。\n微微风簇浪，\n散作满河星。',
      notes: '①月黑：没有月亮的夜晚。②渔灯：渔船上的灯。③孤光：孤零零的光。④萤：萤火虫。⑤风簇浪：风吹起波浪。',
      example: '译文：无月之夜见渔灯如萤；微风吹浪，灯光散作满河星光。\n中心：写江夜奇景，表达对自然造化的赞叹。',
      speak: '月黑见渔灯，孤光一点萤。微微风簇浪，散作满河星。'
    },
    {
      category: 'garden', id: 'g3_g3_yi1', order: 7,
      unit: '语文园地三 · 日积月累',
      title: '不迁怒，不贰过',
      recite: '不迁怒，不贰过。——《论语》',
      content: '不迁怒，不贰过。\n——《论语》',
      notes: '不迁怒：不把怒气发泄在别人身上。不贰过：不重复犯同样的错误。',
      example: '强调自我反省，不把怒气转嫁他人，也不重复犯错。',
      speak: '不迁怒，不贰过。出自论语。'
    },
    {
      category: 'garden', id: 'g3_g3_yi2', order: 8,
      unit: '语文园地三 · 日积月累',
      title: '爱人若爱其身',
      recite: '爱人若爱其身。——《墨子》',
      content: '爱人若爱其身。\n——《墨子》',
      notes: '爱别人就像爱自己一样，体现墨家"兼爱"思想。',
      example: '倡导推己及人，以爱己之心爱人。',
      speak: '爱人若爱其身。出自墨子。'
    },
    {
      category: 'garden', id: 'g3_g3_yi3', order: 9,
      unit: '语文园地三 · 日积月累',
      title: '仁者爱人，有礼者敬人',
      recite: '仁者爱人，有礼者敬人。——《孟子》',
      content: '仁者爱人，有礼者敬人。\n——《孟子》',
      notes: '仁爱的人爱别人，有礼的人尊敬别人。',
      example: '说明"仁"与"礼"是待人接物的基本准则。',
      speak: '仁者爱人，有礼者敬人。出自孟子。'
    },
    {
      category: 'garden', id: 'g3_g3_yi4', order: 10,
      unit: '语文园地三 · 日积月累',
      title: '与人善言，暖于布帛',
      recite: '与人善言，暖于布帛；伤人以言，深于矛戟。——《论语》',
      content: '与人善言，暖于布帛；\n伤人以言，深于矛戟。\n——《论语》',
      notes: '帛（bó）：丝织品。戟（jǐ）：兵器。善言使人温暖，恶语伤人更深。',
      example: '告诫人们说话要友善，恶语比兵器更伤人。',
      speak: '与人善言，暖于布帛；伤人以言，深于矛戟。'
    },
    {
      category: 'garden', id: 'g3_g4_yi1', order: 11,
      unit: '语文园地四 · 日积月累',
      title: '人心齐，泰山移',
      recite: '人心齐，泰山移。',
      content: '人心齐，泰山移。',
      notes: '众人齐心协力，力量巨大，连泰山也能移走。',
      example: '强调集体团结的力量。',
      speak: '人心齐，泰山移。'
    },
    {
      category: 'garden', id: 'g3_g4_yi2', order: 12,
      unit: '语文园地四 · 日积月累',
      title: '二人同心，其利断金',
      recite: '二人同心，其利断金。',
      content: '二人同心，其利断金。',
      notes: '两人心意一致、团结协作，力量足以断金。',
      example: '强调合作双方的默契与信任。',
      speak: '二人同心，其利断金。'
    },
    {
      category: 'garden', id: 'g3_g4_yi3', order: 13,
      unit: '语文园地四 · 日积月累',
      title: '三个臭皮匠，顶个诸葛亮',
      recite: '三个臭皮匠，顶个诸葛亮。',
      content: '三个臭皮匠，顶个诸葛亮。',
      notes: '集思广益，集体智慧可以胜过个人。',
      example: '强调集体智慧的重要性。',
      speak: '三个臭皮匠，顶个诸葛亮。'
    },
    {
      category: 'garden', id: 'g3_zaofa', order: 14,
      unit: '语文园地六 · 日积月累',
      title: '《早发白帝城》', author: '【唐】李白', poemId: 'g3_zaofa',
      recite: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。',
      lines: [
        { text: '朝辞白帝彩云间，', pinyin: 'zhāo cí bái dì cǎi yún jiān,' },
        { text: '千里江陵一日还。', pinyin: 'qiān lǐ jiāng líng yī rì huán.' },
        { text: '两岸猿声啼不住，', pinyin: 'liǎng àn yuán shēng tí bù zhù,' },
        { text: '轻舟已过万重山。', pinyin: 'qīng zhōu yǐ guò wàn chóng shān.' }
      ],
      content: '朝辞白帝彩云间，\n千里江陵一日还。\n两岸猿声啼不住，\n轻舟已过万重山。',
      notes: '①发：出发。②白帝城：在今重庆。③猿：猿猴。④万重山：层层叠叠的山。',
      example: '译文：清晨告别白帝城，一日千里到江陵；两岸猿声不断，轻舟已过万重山。\n中心：写行舟轻快，表达遇赦后的喜悦。',
      speak: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。'
    },
    {
      category: 'poem', id: 'g3_luzhai', order: 15,
      unit: '第七单元 第20课《古诗三首》',
      title: '《鹿柴》', author: '【唐】王维', poemId: 'g3_luzhai',
      recite: '空山不见人，但闻人语响。返景入深林，复照青苔上。',
      lines: [
        { text: '空山不见人，', pinyin: 'kōng shān bù jiàn rén,' },
        { text: '但闻人语响。', pinyin: 'dàn wén rén yǔ xiǎng,' },
        { text: '返景入深林，', pinyin: 'fǎn jǐng rù shēn lín,' },
        { text: '复照青苔上。', pinyin: 'fù zhào qīng tái shàng.' }
      ],
      content: '空山不见人，\n但闻人语响。\n返景入深林，\n复照青苔上。',
      notes: '①鹿柴（zhài）：地名，有栅栏的意思。②空山：空阔的山林。③但：只。④返景：傍晚的阳光。',
      example: '译文：空山不见人，只闻人语；夕阳映入深林，照在青苔上。\n中心：以声衬静，写空山深林的幽美。',
      speak: '空山不见人，但闻人语响。返景入深林，复照青苔上。'
    },
    {
      category: 'poem', id: 'g3_wangtianmen', order: 16,
      unit: '第七单元 第20课《古诗三首》',
      title: '《望天门山》', author: '【唐】李白', poemId: 'g3_wangtianmen',
      recite: '天门中断楚江开，碧水东流至此回。两岸青山相对出，孤帆一片日边来。',
      lines: [
        { text: '天门中断楚江开，', pinyin: 'tiān mén zhōng duàn chǔ jiāng kāi,' },
        { text: '碧水东流至此回。', pinyin: 'bì shuǐ dōng liú zhì cǐ huí,' },
        { text: '两岸青山相对出，', pinyin: 'liǎng àn qīng shān xiāng duì chū,' },
        { text: '孤帆一片日边来。', pinyin: 'gū fān yī piàn rì biān lái.' }
      ],
      content: '天门中断楚江开，\n碧水东流至此回。\n两岸青山相对出，\n孤帆一片日边来。',
      notes: '①天门山：安徽当涂的天门山。②楚江：长江。③开：劈开。④回：回旋。',
      example: '译文：楚江劈开天门山，碧水东流至此回旋；两岸青山相对而出，孤帆从日边驶来。\n中心：写天门山雄奇，表达豪迈情怀。',
      speak: '天门中断楚江开，碧水东流至此回。两岸青山相对出，孤帆一片日边来。'
    },
    {
      category: 'poem', id: 'g3_yinhu', order: 17,
      unit: '第七单元 第20课《古诗三首》',
      title: '《饮湖上初晴后雨》', author: '【宋】苏轼', poemId: 'g3_yinhu',
      recite: '水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。',
      lines: [
        { text: '水光潋滟晴方好，', pinyin: 'shuǐ guāng liàn yàn qíng fāng hǎo,' },
        { text: '山色空蒙雨亦奇。', pinyin: 'shān sè kōng méng yǔ yì qí,' },
        { text: '欲把西湖比西子，', pinyin: 'yù bǎ xī hú bǐ xī zǐ,' },
        { text: '淡妆浓抹总相宜。', pinyin: 'dàn zhuāng nóng mǒ zǒng xiāng yí.' }
      ],
      content: '水光潋滟晴方好，\n山色空蒙雨亦奇。\n欲把西湖比西子，\n淡妆浓抹总相宜。',
      notes: '①潋滟：波光闪动。②方：正。③空蒙：云雾迷茫。④西子：西施。',
      example: '译文：晴日西湖水光潋滟，雨中山色空蒙；把西湖比作西施，淡妆浓抹都相宜。\n中心：赞美西湖晴雨皆美的天然姿色。',
      speak: '水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。'
    },
    {
      category: 'text', id: 'g3_daziran', order: 18,
      unit: '第七单元 第21课',
      title: '《大自然的声音》第2-3自然段',
      recite: '风，是大自然的音乐家。他会在森林里演奏他的手风琴。当他翻动树叶，树叶便像歌手一样，唱出各种不同的歌曲。不一样的树叶，有不一样的声音；不一样的季节，有不一样的音乐。当微风拂过，那声音轻轻柔柔的，好像呢喃细语，让人感受到大自然的温柔；当狂风吹起，整座森林都激动起来，合奏出一首雄伟的乐曲，那声音充满力量，令人感受到大自然的威力。水，也是大自然的音乐家。下雨的时候，他喜欢玩打击乐器。小雨滴敲敲打打，一场热闹的音乐会便开始了。滴滴答答……叮叮咚咚……所有的树林，树林里的每片树叶，所有的房子，房子的屋顶和窗户，都发出不同的声音。当小雨滴汇聚起来，他们便一起唱着歌：小溪淙淙，流向河流；河流潺潺，流向大海；大海哗哗，汹涌澎湃。从一首轻快的山中小曲，唱到波澜壮阔的海洋大合唱。',
      content: '风，是大自然的音乐家。\n他会在森林里演奏他的手风琴……\n（见教材第2、3自然段全文）',
      example: '中心：用拟人写风、水等声音，展现大自然声音的丰富奇妙，引导用心倾听自然。',
      speak: '风是大自然的音乐家，水也是大自然的音乐家。'
    },
    {
      category: 'garden', id: 'g3_cailian', order: 19,
      unit: '语文园地七 · 日积月累',
      title: '《采莲曲》', author: '【唐】王昌龄', poemId: 'g3_cailian',
      recite: '荷叶罗裙一色裁，芙蓉向脸两边开。乱入池中看不见，闻歌始觉有人来。',
      lines: [
        { text: '荷叶罗裙一色裁，', pinyin: 'hé yè luó qún yī sè cái,' },
        { text: '芙蓉向脸两边开。', pinyin: 'fú róng xiàng liǎn liǎng biān kāi,' },
        { text: '乱入池中看不见，', pinyin: 'luàn rù chí zhōng kàn bù jiàn,' },
        { text: '闻歌始觉有人来。', pinyin: 'wén gē shǐ jué yǒu rén lái.' }
      ],
      content: '荷叶罗裙一色裁，\n芙蓉向脸两边开。\n乱入池中看不见，\n闻歌始觉有人来。',
      notes: '①罗裙：丝织的裙子。②芙蓉：荷花。③乱入：混入其中。',
      example: '译文：采莲女与荷叶、荷花融为一体，闻歌声才知有人来。\n中心：写采莲情景，表现人与自然和谐之美。',
      speak: '荷叶罗裙一色裁，芙蓉向脸两边开。乱入池中看不见，闻歌始觉有人来。'
    },
    {
      category: 'text', id: 'g3_simaguang', order: 20,
      unit: '第八单元 第23课',
      title: '《司马光》',
      recite: '群儿戏于庭，一儿登瓮，足跌没水中。众皆弃去，光持石击瓮破之，水迸，儿得活。',
      content: '群儿戏于庭，一儿登瓮，足跌没水中。\n众皆弃去，光持石击瓮破之，水迸，儿得活。',
      notes: '①庭：庭院。②瓮：口小肚大的陶器。③皆：都。④迸：涌出。⑤光：指司马光。',
      example: '译文：孩子们玩耍，一人登瓮落水，众人弃去，司马光砸瓮救人。\n中心：表现司马光机智勇敢、沉着果断。',
      speak: '群儿戏于庭，一儿登瓮，足跌没水中。众皆弃去，光持石击瓮破之，水迸，儿得活。'
    },
    {
      category: 'garden', id: 'g3_g8_yi1', order: 21,
      unit: '语文园地八 · 日积月累',
      title: '士不可以不弘毅',
      recite: '士不可以不弘毅，任重而道远。——《论语》',
      content: '士不可以不弘毅，任重而道远。\n——《论语》',
      notes: '士：有抱负的人。弘毅：志向远大、意志坚强。责任重大，道路遥远。',
      example: '强调读书人应有远大志向和坚强意志。',
      speak: '士不可以不弘毅，任重而道远。'
    },
    {
      category: 'garden', id: 'g3_g8_yi2', order: 22,
      unit: '语文园地八 · 日积月累',
      title: '志不强者智不达',
      recite: '志不强者智不达，言不信者行不果。——《墨子》',
      content: '志不强者智不达，言不信者行不果。\n——《墨子》',
      notes: '意志不坚强，智慧就难以发挥；说话不诚信，行动就难以成功。',
      example: '强调坚定意志和诚实守信的重要性。',
      speak: '志不强者智不达，言不信者行不果。'
    },
    {
      category: 'garden', id: 'g3_g8_yi3', order: 23,
      unit: '语文园地八 · 日积月累',
      title: '锲而不舍，金石可镂',
      recite: '锲而舍之，朽木不折；锲而不舍，金石可镂。——《荀子》',
      content: '锲而舍之，朽木不折；\n锲而不舍，金石可镂。\n——《荀子》',
      notes: '镂：雕刻。半途而废连朽木也折不断；坚持不懈，金属石头也能雕刻。',
      example: '说明做事要有恒心，坚持不懈才能成功。',
      speak: '锲而不舍，金石可镂。'
    }
  ];

  function getItems(catId) {
    var list;
    if (catId === 'all') {
      list = ITEMS.slice().sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
      });
    } else {
      list = ITEMS.filter(function (item) {
        return item.category === catId;
      }).sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
      });
    }
    return list;
  }

  function getCategory(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i];
    }
    return CATEGORIES[0];
  }

  function getItemId(item) {
    return item.id || item.poemId || item.title;
  }

  function loadReciteAll() {
    try {
      return JSON.parse(localStorage.getItem(RECITE_STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveReciteAll(data) {
    try {
      localStorage.setItem(RECITE_STORAGE_KEY, JSON.stringify(data));
    } catch (e2) { /* ignore */ }
  }

  function gradeFromPercent(percent) {
    if (percent >= 92) return '优';
    if (percent >= 75) return '良';
    return '待练';
  }

  function formatReciteDate(ts) {
    var d = new Date(ts);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function saveReciteRecord(itemId, result, heard) {
    if (!itemId || !result) return null;
    var all = loadReciteAll();
    var rec = all[itemId] || { best: 0, bestGrade: '', history: [] };
    var entry = {
      at: Date.now(),
      percent: result.percent,
      grade: gradeFromPercent(result.percent),
      level: result.level,
      message: result.message,
      heard: heard || ''
    };
    rec.history.unshift(entry);
    if (rec.history.length > 8) rec.history.length = 8;
    if (result.percent >= rec.best) {
      rec.best = result.percent;
      rec.bestGrade = entry.grade;
    }
    all[itemId] = rec;
    saveReciteAll(all);
    return entry;
  }

  function getReciteRecord(itemId) {
    return loadReciteAll()[itemId] || null;
  }

  function clearReciteRecords() {
    saveReciteAll({});
  }

  function getChecklistCount() {
    return 16;
  }

  return {
    CATEGORIES: CATEGORIES,
    ITEMS: ITEMS,
    getItems: getItems,
    getCategory: getCategory,
    getItemId: getItemId,
    loadReciteAll: loadReciteAll,
    saveReciteRecord: saveReciteRecord,
    getReciteRecord: getReciteRecord,
    clearReciteRecords: clearReciteRecords,
    gradeFromPercent: gradeFromPercent,
    formatReciteDate: formatReciteDate,
    getChecklistCount: getChecklistCount
  };
})();
