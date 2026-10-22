/**
 * 三年级数学 · 知识点预习（人教版导向）
 */
module.exports = (function () {
  'use strict';

  var CATEGORIES = [
    { id: 'calc', name: '万以内计算', icon: '🔢' },
    { id: 'mult', name: '乘除法', icon: '✖️' },
    { id: 'mix', name: '混合运算', icon: '🧮' },
    { id: 'measure', name: '测量与时间', icon: '📏' },
    { id: 'shape', name: '图形与周长', icon: '⬜' },
    { id: 'problem', name: '解决问题', icon: '💡' }
  ];

  var ITEMS = [
    {
      category: 'calc',
      title: '万以内加减',
      content: '三年级要学习万以内的加法和减法，注意进位和退位。',
      example: '例：356 + 428 = 784　900 − 375 = 525',
      speak: '万以内加减法要注意进位和退位。356 加 428 等于 784。'
    },
    {
      category: 'calc',
      title: '估算',
      content: '先估一估，再精算。把数看成整十、整百来算近似值。',
      example: '例：398 + 502 ≈ 400 + 500 = 900',
      speak: '估算把数看成整十整百。398 加 502 约等于 900。'
    },
    {
      category: 'calc',
      title: '验算',
      content: '做完要检查：加法用减法验，减法用加法验。',
      example: '例：784 − 428 = 356，用来验算 356 + 428',
      speak: '验算：加法用减法验，减法用加法验。'
    },
    {
      category: 'mult',
      title: '多位数乘一位数',
      content: '从个位乘起，哪一位满几十就向高位进几。',
      example: '例：123 × 4 = 492',
      speak: '多位数乘一位数，从个位乘起，满几十向高位进几。123 乘 4 等于 492。'
    },
    {
      category: 'mult',
      title: '除法（有余数）',
      content: '平均分有时分不完，剩下的叫余数，余数要比除数小。',
      example: '例：17 ÷ 5 = 3 …… 2',
      speak: '除法有余数，余数要比除数小。17 除以 5 等于 3 余 2。'
    },
    {
      category: 'mult',
      title: '0 的乘法',
      content: '0 和任何数相乘都得 0。',
      example: '例：0 × 9 = 0　105 × 0 = 0',
      speak: '0 和任何数相乘都得 0。'
    },
    {
      category: 'mix',
      title: '乘加、乘减',
      content: '先算乘法，再算加减法。',
      example: '例：5 × 3 + 2 = 17　24 − 4 × 5 = 4',
      speak: '乘加乘减，先算乘法再算加减。5 乘 3 加 2 等于 17。'
    },
    {
      category: 'mix',
      title: '带括号的运算',
      content: '有括号先算括号里面的。',
      example: '例：(12 + 8) × 3 = 60',
      speak: '有括号先算括号里面。12 加 8 的和乘 3 等于 60。'
    },
    {
      category: 'mix',
      title: '列综合算式',
      content: '把分步算式合并成一个算式，注意用括号。',
      example: '例：先算 20 − 8 = 12，再算 12 ÷ 3 → (20 − 8) ÷ 3',
      speak: '列综合算式注意用括号。20 减 8 的差除以 3。'
    },
    {
      category: 'measure',
      title: '毫米、厘米、分米',
      content: '1 厘米 = 10 毫米，1 分米 = 10 厘米，会换算和测量。',
      example: '例：3 分米 = 30 厘米 = 300 毫米',
      speak: '长度单位：1 分米等于 10 厘米，1 厘米等于 10 毫米。'
    },
    {
      category: 'measure',
      title: '千克与吨',
      content: '1 吨 = 1000 千克，用来表示较重的物体质量。',
      example: '例：一辆小汽车约重 1 吨',
      speak: '1 吨等于 1000 千克，表示较重的物体。'
    },
    {
      category: 'measure',
      title: '年月日',
      content: '认识年、月、日，知道大月 31 天、小月 30 天，2 月特殊。',
      example: '例：一年有 12 个月，7 月有 31 天',
      speak: '认识年月日。大月 31 天，小月 30 天，2 月特殊。'
    },
    {
      category: 'shape',
      title: '长方形与正方形',
      content: '认识边和角，知道四个角都是直角。',
      example: '例：黑板面、课桌面多是长方形',
      speak: '长方形和正方形都有四个直角。'
    },
    {
      category: 'shape',
      title: '周长',
      content: '封闭图形一周的长度叫周长。长方形周长 = (长 + 宽) × 2。',
      example: '例：长 5 厘米、宽 3 厘米 → 周长 (5+3)×2 = 16 厘米',
      speak: '周长是一周的长度。长方形周长等于长加宽的和乘 2。'
    },
    {
      category: 'shape',
      title: '分数初步',
      content: '把一个物体平均分成几份，其中一份或几份可以用分数表示。',
      example: '例：把一张纸平均分成 4 份，1 份是 1/4',
      speak: '分数：平均分成几份，一份是几分之一。平均分成 4 份，一份是四分之一。'
    },
    {
      category: 'problem',
      title: '倍数问题',
      content: '「A 是 B 的几倍」用除法：A ÷ B。',
      example: '例：小明有 12 颗糖，是小红的 3 倍 → 小红 12÷3 = 4 颗',
      speak: '倍数问题用除法。12 是 3 的几倍，用 12 除以 3。'
    },
    {
      category: 'problem',
      title: '和差问题',
      content: '知道总和与相差数，可以求两个数（进阶拓展）。',
      example: '例：两数和 20、差 4 → 较大数 (20+4)÷2 = 12',
      speak: '和差问题：知道总和与相差数，可以求两个数。'
    },
    {
      category: 'problem',
      title: '画图帮助思考',
      content: '应用题可以画线段图或示意图，帮助理解数量关系。',
      example: '例：画线段表示「比……多」「比……少」',
      speak: '解决问题可以画线段图，帮助理解数量关系。'
    },
    {
      category: 'calc',
      title: '竖式计算',
      content: '加减法列竖式，相同数位对齐，从个位算起，注意进位退位。',
      example: '例：\n  356\n+ 428\n────\n  784',
      speak: '竖式计算相同数位对齐，从个位算起，注意进位退位。'
    },
    {
      category: 'calc',
      title: '连续进位与退位',
      content: '多位数加减时，某一位满十要向前一位进一；不够减要向前一位借一。',
      example: '例：199 + 1 = 200（个位、十位连续进位）',
      speak: '连续进位退位要细心。199 加 1 等于 200，个位十位都要进位。'
    },
    {
      category: 'calc',
      title: '口算技巧',
      content: '整十整百数相加减，先算十位百位，再在末尾补零。',
      example: '例：60 + 40 = 100　700 − 300 = 400',
      speak: '整十整百口算，先算十位百位再补零。60 加 40 等于 100。'
    },
    {
      category: 'mult',
      title: '表内乘法复习',
      content: '熟练背诵乘法口诀，是多位数乘除法的基础。',
      example: '例：7 × 8 = 56　6 × 9 = 54',
      speak: '表内乘法要熟练。7 乘 8 等于 56，6 乘 9 等于 54。'
    },
    {
      category: 'mult',
      title: '除法验算',
      content: '用「商 × 除数 + 余数 = 被除数」检查除法是否正确。',
      example: '例：17 ÷ 5 = 3……2 → 3×5+2 = 17',
      speak: '除法验算：商乘除数加余数等于被除数。17 除以 5 余 2，3 乘 5 加 2 等于 17。'
    },
    {
      category: 'mult',
      title: '整十整百乘一位数',
      content: '先算十位或百位上的数乘一位数，再在末尾添零。',
      example: '例：20 × 4 = 80　300 × 3 = 900',
      speak: '整十整百乘一位数，先算前面的数，末尾添零。20 乘 4 等于 80。'
    },
    {
      category: 'mix',
      title: '运算顺序口诀',
      content: '先乘除后加减；同级运算从左到右；有括号先算括号里。',
      example: '例：8 + 4 × 2 = 8 + 8 = 16',
      speak: '运算顺序：先乘除后加减，有括号先算括号里。'
    },
    {
      category: 'mix',
      title: '两步应用题',
      content: '先想第一步求什么，再求最后问题，可以分步列式或列综合算式。',
      example: '例：买 3 支笔每支 5 元，付 20 元找回多少？先算 3×5',
      speak: '两步应用题先求中间量。买 3 支笔每支 5 元，先算花了多少钱。'
    },
    {
      category: 'measure',
      title: '24 时计时法',
      content: '一天 24 小时，下午 1 点用 13 时表示，晚上 8 点用 20 时表示。',
      example: '例：下午 3 时 = 15 时　晚上 9 时 = 21 时',
      speak: '24 时计时法，下午 1 点是 13 时，晚上 8 点是 20 时。'
    },
    {
      category: 'measure',
      title: '闰年与平年',
      content: '平年 365 天，闰年 366 天；四年一闰，百年不闰，四百年再闰。',
      example: '例：2024 年是闰年，2 月有 29 天',
      speak: '闰年 366 天，平年 365 天。2024 年是闰年，2 月有 29 天。'
    },
    {
      category: 'measure',
      title: '面积单位',
      content: '1 平方分米 = 100 平方厘米，用来表示平面图形的大小。',
      example: '例：橡皮约 4 平方厘米，课本约 4 平方分米',
      speak: '面积单位：1 平方分米等于 100 平方厘米。'
    },
    {
      category: 'shape',
      title: '周长与面积',
      content: '周长是图形一周的长度；面积是图形所占平面的大小，单位不同。',
      example: '例：围篱笆算周长，铺地砖算面积',
      speak: '周长是一周的长度，面积是平面的大小。围篱笆算周长，铺地砖算面积。'
    },
    {
      category: 'shape',
      title: '正方形周长',
      content: '正方形四条边相等，周长 = 边长 × 4。',
      example: '例：边长 5 厘米 → 周长 5×4 = 20 厘米',
      speak: '正方形周长等于边长乘 4。边长 5 厘米，周长 20 厘米。'
    },
    {
      category: 'shape',
      title: '分数比大小',
      content: '分母相同比分子，分子大的分数大；分子相同比分母，分母大的分数小。',
      example: '例：3/5 > 2/5　1/3 > 1/4',
      speak: '分数比大小：分母相同比分子，分子相同比分母。'
    },
    {
      category: 'problem',
      title: '购物找零',
      content: '先算花了多少钱，再用付的钱减去花费得到找回的钱。',
      example: '例：买 2 件各 15 元，付 50 元 → 50 − 2×15 = 20 元',
      speak: '购物找零：先算花了多少，再用付的钱减去花费。'
    },
    {
      category: 'problem',
      title: '平均数',
      content: '把一组数据加起来再除以个数，得到平均数。',
      example: '例：(80+90+70) ÷ 3 = 80 分',
      speak: '平均数：先求和再除以个数。80、90、70 的平均数是 80。'
    },
    {
      category: 'problem',
      title: '间隔问题',
      content: '植树、锯木头等问题，注意段数与间隔数的关系。',
      example: '例：锯 3 段要锯 2 次；4 棵树 3 个间隔',
      speak: '间隔问题：锯 3 段锯 2 次，4 棵树有 3 个间隔。'
    }
  ];

  function getItems(categoryId) {
    return ITEMS.filter(function (item) {
      return item.category === categoryId;
    });
  }

  function getCategory(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i];
    }
    return CATEGORIES[0];
  }

  return {
    CATEGORIES: CATEGORIES,
    ITEMS: ITEMS,
    getItems: getItems,
    getCategory: getCategory
  };
})();
