/**
 * 部编版 · 一二年级必背古诗词（共 27 首）
 */
window.POEM_DATA = (function () {
  'use strict';

  function poem(id, title, author, dynasty, lines, fullText, speakText) {
    var ft = fullText || lines.map(function (l) { return l.text; }).join('');
    return {
      id: id,
      title: title,
      author: author,
      dynasty: dynasty,
      lines: lines,
      fullText: ft,
      speakText: speakText || ft
    };
  }

  var G1S1 = [
    poem('yonge', '咏鹅', '骆宾王', '唐', [
      { text: '鹅，鹅，鹅，', pinyin: 'é, é, é,' },
      { text: '曲项向天歌。', pinyin: 'qū xiàng xiàng tiān gē.' },
      { text: '白毛浮绿水，', pinyin: 'bái máo fú lǜ shuǐ,' },
      { text: '红掌拨清波。', pinyin: 'hóng zhǎng bō qīng bō.' }
    ], null, '峨，峨，峨，曲项向天歌。白毛浮绿水，红掌拨清波。'),
    poem('jiangnan', '江南', '汉乐府', '汉', [
      { text: '江南可采莲，', pinyin: 'jiāng nán kě cǎi lián,' },
      { text: '莲叶何田田。', pinyin: 'lián yè hé tián tián.' },
      { text: '鱼戏莲叶间。', pinyin: 'yú xì lián yè jiān.' },
      { text: '鱼戏莲叶东，', pinyin: 'yú xì lián yè dōng,' },
      { text: '鱼戏莲叶西，', pinyin: 'yú xì lián yè xī,' },
      { text: '鱼戏莲叶南，', pinyin: 'yú xì lián yè nán,' },
      { text: '鱼戏莲叶北。', pinyin: 'yú xì lián yè běi.' }
    ]),
    poem('hua', '画', '王维', '唐', [
      { text: '远看山有色，', pinyin: 'yuǎn kàn shān yǒu sè,' },
      { text: '近听水无声。', pinyin: 'jìn tīng shuǐ wú shēng.' },
      { text: '春去花还在，', pinyin: 'chūn qù huā hái zài,' },
      { text: '人来鸟不惊。', pinyin: 'rén lái niǎo bù jīng.' }
    ]),
    poem('minong2', '悯农（其二）', '李绅', '唐', [
      { text: '锄禾日当午，', pinyin: 'chú hé rì dāng wǔ,' },
      { text: '汗滴禾下土。', pinyin: 'hàn dī hé xià tǔ.' },
      { text: '谁知盘中餐，', pinyin: 'shuí zhī pán zhōng cān,' },
      { text: '粒粒皆辛苦。', pinyin: 'lì lì jiē xīn kǔ.' }
    ]),
    poem('gulangyue', '古朗月行（节选）', '李白', '唐', [
      { text: '小时不识月，', pinyin: 'xiǎo shí bù shí yuè,' },
      { text: '呼作白玉盘。', pinyin: 'hū zuò bái yù pán.' },
      { text: '又疑瑶台镜，', pinyin: 'yòu yí yáo tái jìng,' },
      { text: '飞在青云端。', pinyin: 'fēi zài qīng yún duān.' }
    ]),
    poem('feng', '风', '李峤', '唐', [
      { text: '解落三秋叶，', pinyin: 'jiě luò sān qiū yè,' },
      { text: '能开二月花。', pinyin: 'néng kāi èr yuè huā.' },
      { text: '过江千尺浪，', pinyin: 'guò jiāng qiān chǐ làng,' },
      { text: '入竹万竿斜。', pinyin: 'rù zhú wàn gān xié.' }
    ])
  ];

  var G1S2 = [
    poem('chunxiao', '春晓', '孟浩然', '唐', [
      { text: '春眠不觉晓，', pinyin: 'chūn mián bù jué xiǎo,' },
      { text: '处处闻啼鸟。', pinyin: 'chù chù wén tí niǎo.' },
      { text: '夜来风雨声，', pinyin: 'yè lái fēng yǔ shēng,' },
      { text: '花落知多少。', pinyin: 'huā luò zhī duō shǎo.' }
    ]),
    poem('zengwanglun', '赠汪伦', '李白', '唐', [
      { text: '李白乘舟将欲行，', pinyin: 'lǐ bái chéng zhōu jiāng yù xíng,' },
      { text: '忽闻岸上踏歌声。', pinyin: 'hū wén àn shàng tà gē shēng.' },
      { text: '桃花潭水深千尺，', pinyin: 'táo huā tán shuǐ shēn qiān chǐ,' },
      { text: '不及汪伦送我情。', pinyin: 'bù jí wāng lún sòng wǒ qíng.' }
    ]),
    poem('jingyesi', '静夜思', '李白', '唐', [
      { text: '床前明月光，', pinyin: 'chuáng qián míng yuè guāng,' },
      { text: '疑是地上霜。', pinyin: 'yí shì dì shàng shuāng.' },
      { text: '举头望明月，', pinyin: 'jǔ tóu wàng míng yuè,' },
      { text: '低头思故乡。', pinyin: 'dī tóu sī gù xiāng.' }
    ]),
    poem('xunyinzhe', '寻隐者不遇', '贾岛', '唐', [
      { text: '松下问童子，', pinyin: 'sōng xià wèn tóng zǐ,' },
      { text: '言师采药去。', pinyin: 'yán shī cǎi yào qù.' },
      { text: '只在此山中，', pinyin: 'zhǐ zài cǐ shān zhōng,' },
      { text: '云深不知处。', pinyin: 'yún shēn bù zhī chù.' }
    ]),
    poem('chishang', '池上', '白居易', '唐', [
      { text: '小娃撑小艇，', pinyin: 'xiǎo wá chēng xiǎo tǐng,' },
      { text: '偷采白莲回。', pinyin: 'tōu cǎi bái lián huí.' },
      { text: '不解藏踪迹，', pinyin: 'bù jiě cáng zōng jì,' },
      { text: '浮萍一道开。', pinyin: 'fú píng yī dào kāi.' }
    ]),
    poem('xiaochi', '小池', '杨万里', '宋', [
      { text: '泉眼无声惜细流，', pinyin: 'quán yǎn wú shēng xī xì liú,' },
      { text: '树阴照水爱晴柔。', pinyin: 'shù yīn zhào shuǐ ài qíng róu.' },
      { text: '小荷才露尖尖角，', pinyin: 'xiǎo hé cái lù jiān jiān jiǎo,' },
      { text: '早有蜻蜓立上头。', pinyin: 'zǎo yǒu qīng tíng lì shàng tóu.' }
    ]),
    poem('huaji', '画鸡', '唐寅', '明', [
      { text: '头上红冠不用裁，', pinyin: 'tóu shàng hóng guān bù yòng cái,' },
      { text: '满身雪白走将来。', pinyin: 'mǎn shēn xuě bái zǒu jiāng lái.' },
      { text: '平生不敢轻言语，', pinyin: 'píng shēng bù gǎn qīng yán yǔ,' },
      { text: '一叫千门万户开。', pinyin: 'yī jiào qiān mén wàn hù kāi.' }
    ])
  ];

  var G2S1 = [
    poem('meihua', '梅花', '王安石', '宋', [
      { text: '墙角数枝梅，', pinyin: 'qiáng jiǎo shù zhī méi,' },
      { text: '凌寒独自开。', pinyin: 'líng hán dú zì kāi.' },
      { text: '遥知不是雪，', pinyin: 'yáo zhī bù shì xuě,' },
      { text: '为有暗香来。', pinyin: 'wèi yǒu àn xiāng lái.' }
    ]),
    poem('xiaoer', '小儿垂钓', '胡令能', '唐', [
      { text: '蓬头稚子学垂纶，', pinyin: 'péng tóu zhì zǐ xué chuí lún,' },
      { text: '侧坐莓苔草映身。', pinyin: 'cè zuò méi tái cǎo yìng shēn.' },
      { text: '路人借问遥招手，', pinyin: 'lù rén jiè wèn yáo zhāo shǒu,' },
      { text: '怕得鱼惊不应人。', pinyin: 'pà dé yú jīng bù yìng rén.' }
    ]),
    poem('dengguanque', '登鹳雀楼', '王之涣', '唐', [
      { text: '白日依山尽，', pinyin: 'bái rì yī shān jìn,' },
      { text: '黄河入海流。', pinyin: 'huáng hé rù hǎi liú.' },
      { text: '欲穷千里目，', pinyin: 'yù qióng qiān lǐ mù,' },
      { text: '更上一层楼。', pinyin: 'gèng shàng yī céng lóu.' }
    ]),
    poem('wanglushan', '望庐山瀑布', '李白', '唐', [
      { text: '日照香炉生紫烟，', pinyin: 'rì zhào xiāng lú shēng zǐ yān,' },
      { text: '遥看瀑布挂前川。', pinyin: 'yáo kàn pù bù guà qián chuān.' },
      { text: '飞流直下三千尺，', pinyin: 'fēi liú zhí xià sān qiān chǐ,' },
      { text: '疑是银河落九天。', pinyin: 'yí shì yín hé luò jiǔ tiān.' }
    ]),
    poem('jiangxue', '江雪', '柳宗元', '唐', [
      { text: '千山鸟飞绝，', pinyin: 'qiān shān niǎo fēi jué,' },
      { text: '万径人踪灭。', pinyin: 'wàn jìng rén zōng miè.' },
      { text: '孤舟蓑笠翁，', pinyin: 'gū zhōu suō lì wēng,' },
      { text: '独钓寒江雪。', pinyin: 'dú diào hán jiāng xuě.' }
    ]),
    poem('yesu', '夜宿山寺', '李白', '唐', [
      { text: '危楼高百尺，', pinyin: 'wēi lóu gāo bǎi chǐ,' },
      { text: '手可摘星辰。', pinyin: 'shǒu kě zhāi xīng chén.' },
      { text: '不敢高声语，', pinyin: 'bù gǎn gāo shēng yǔ,' },
      { text: '恐惊天上人。', pinyin: 'kǒng jīng tiān shàng rén.' }
    ]),
    poem('chile', '敕勒歌', '北朝民歌', '北朝', [
      { text: '敕勒川，阴山下。', pinyin: 'chì lè chuān, yīn shān xià.' },
      { text: '天似穹庐，笼盖四野。', pinyin: 'tiān sì qióng lú, lǒng gài sì yě.' },
      { text: '天苍苍，野茫茫，', pinyin: 'tiān cāng cāng, yě máng máng,' },
      { text: '风吹草低见牛羊。', pinyin: 'fēng chuī cǎo dī xiàn niú yáng.' }
    ])
  ];

  var G2S2 = [
    poem('cunju', '村居', '高鼎', '清', [
      { text: '草长莺飞二月天，', pinyin: 'cǎo zhǎng yīng fēi èr yuè tiān,' },
      { text: '拂堤杨柳醉春烟。', pinyin: 'fú dī yáng liǔ zuì chūn yān.' },
      { text: '儿童散学归来早，', pinyin: 'ér tóng sàn xué guī lái zǎo,' },
      { text: '忙趁东风放纸鸢。', pinyin: 'máng chèn dōng fēng fàng zhǐ yuān.' }
    ]),
    poem('yongliu', '咏柳', '贺知章', '唐', [
      { text: '碧玉妆成一树高，', pinyin: 'bì yù zhuāng chéng yī shù gāo,' },
      { text: '万条垂下绿丝绦。', pinyin: 'wàn tiáo chuí xià lǜ sī tāo.' },
      { text: '不知细叶谁裁出，', pinyin: 'bù zhī xì yè shuí cái chū,' },
      { text: '二月春风似剪刀。', pinyin: 'èr yuè chūn fēng sì jiǎn dāo.' }
    ]),
    poem('fudecao', '赋得古原草送别', '白居易', '唐', [
      { text: '离离原上草，', pinyin: 'lí lí yuán shàng cǎo,' },
      { text: '一岁一枯荣。', pinyin: 'yī suì yī kū róng.' },
      { text: '野火烧不尽，', pinyin: 'yě huǒ shāo bù jìn,' },
      { text: '春风吹又生。', pinyin: 'chūn fēng chuī yòu shēng.' }
    ]),
    poem('xiaochu', '晓出净慈寺送林子方', '杨万里', '宋', [
      { text: '毕竟西湖六月中，', pinyin: 'bì jìng xī hú liù yuè zhōng,' },
      { text: '风光不与四时同。', pinyin: 'fēng guāng bù yǔ sì shí tóng.' },
      { text: '接天莲叶无穷碧，', pinyin: 'jiē tiān lián yè wú qióng bì,' },
      { text: '映日荷花别样红。', pinyin: 'yìng rì hé huā bié yàng hóng.' }
    ]),
    poem('jueju', '绝句', '杜甫', '唐', [
      { text: '两个黄鹂鸣翠柳，', pinyin: 'liǎng gè huáng lí míng cuì liǔ,' },
      { text: '一行白鹭上青天。', pinyin: 'yī háng bái lù shàng qīng tiān.' },
      { text: '窗含西岭千秋雪，', pinyin: 'chuāng hán xī lǐng qiān qiū xuě,' },
      { text: '门泊东吴万里船。', pinyin: 'mén bó dōng wú wàn lǐ chuán.' }
    ]),
    poem('minong1', '悯农（其一）', '李绅', '唐', [
      { text: '春种一粒粟，', pinyin: 'chūn zhòng yī lì sù,' },
      { text: '秋收万颗子。', pinyin: 'qiū shōu wàn kē zǐ.' },
      { text: '四海无闲田，', pinyin: 'sì hǎi wú xián tián,' },
      { text: '农夫犹饿死。', pinyin: 'nóng fū yóu è sǐ.' }
    ]),
    poem('zhouye', '舟夜书所见', '查慎行', '清', [
      { text: '月黑见渔灯，', pinyin: 'yuè hēi jiàn yú dēng,' },
      { text: '孤光一点萤。', pinyin: 'gū guāng yī diǎn yíng.' },
      { text: '微微风簇浪，', pinyin: 'wēi wēi fēng cù làng,' },
      { text: '散作满河星。', pinyin: 'sàn zuò mǎn hé xīng.' }
    ])
  ];

  var SEMESTERS = [
    { id: 'g1s1', label: '一年级上', poems: G1S1 },
    { id: 'g1s2', label: '一年级下', poems: G1S2 },
    { id: 'g2s1', label: '二年级上', poems: G2S1 },
    { id: 'g2s2', label: '二年级下', poems: G2S2 }
  ];

  var POEM_TOTAL = G1S1.length + G1S2.length + G2S1.length + G2S2.length;

  function getSemester(semId) {
    for (var i = 0; i < SEMESTERS.length; i++) {
      if (SEMESTERS[i].id === semId) return SEMESTERS[i];
    }
    return SEMESTERS[0];
  }

  function findPoem(id) {
    for (var s = 0; s < SEMESTERS.length; s++) {
      var list = SEMESTERS[s].poems;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          return { semester: SEMESTERS[s], poem: list[i], index: i };
        }
      }
    }
    return null;
  }

  return {
    SEMESTERS: SEMESTERS,
    POEM_TOTAL: POEM_TOTAL,
    getSemester: getSemester,
    findPoem: findPoem
  };
})();
