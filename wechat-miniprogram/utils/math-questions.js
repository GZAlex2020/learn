/**
 * 题目数量与读题数据（与网页版 math.js QUESTION_DATA 一致）
 */
module.exports = {
  CALC_TOTAL: 10,
  CONCEPT_TOTAL: 8,
  READ_TOTAL: 5,
  READ_QUESTIONS: [
    {
      id: 1,
      text: '小明有 5 个苹果，小红有 4 个苹果，一共有几个苹果？',
      keyword: '一共',
      task: '要把 5 和 4 加起来',
      example: '5 + 4 = 9（个）'
    },
    {
      id: 2,
      text: '树上有 12 只鸟，飞走了 5 只，还剩几只？',
      keyword: '还剩',
      task: '从 12 里去掉 5',
      example: '12 - 5 = 7（只）'
    },
    {
      id: 3,
      text: '小刚有 9 本书，小丽有 6 本书，小刚比小丽多几本？',
      keyword: '比……多',
      task: '用减法，9 减 6',
      example: '9 - 6 = 3（本）'
    },
    {
      id: 4,
      text: '妈妈买了 20 元的水果，付了 50 元，应找回几元？',
      keyword: '找回',
      task: '50 减 20',
      example: '50 - 20 = 30（元）'
    },
    {
      id: 5,
      text: '请选择正确的算式：8 + 7 = ？',
      keyword: '选择',
      task: '我要选一个对的答案',
      example: '8 + 7 = 15'
    },
    {
      id: 6,
      text: '请填空：6 +（  ）= 10',
      keyword: '填空',
      task: '括号里填 4',
      example: '6 + 4 = 10'
    },
    {
      id: 7,
      text: '看图列式：左边 3 个圆，右边 2 个圆，一共几个？',
      keyword: '看图列式',
      task: '3 加 2',
      example: '3 + 2 = 5（个）'
    },
    {
      id: 8,
      text: '2，4，6，8，（  ）',
      keyword: '找规律',
      task: '每次加 2，下一个是 10',
      example: '10'
    }
  ]
};
