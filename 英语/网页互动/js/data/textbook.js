/**
 * 人教版 PEP（2024）导向 · 课本单元词汇与句型
 * 一二年级（一起）+ 三年级上
 */
window.ENGLISH_TEXTBOOK = (function () {
  'use strict';

  function w(en, zh) { return { en: en, zh: zh, speak: en }; }
  function p(en, zh) { return { en: en, zh: zh, speak: en }; }

  var UNITS_G12 = [
    {
      id: 'g1u1', grade: '一年级上', title: 'Unit 1 Hello!',
      words: [
        w('hello', '你好'), w('hi', '嗨'), w('I', '我'), w('am', '是'),
        w('name', '名字'), w('my', '我的'), w('goodbye', '再见'), w('bye', '拜拜')
      ],
      phrases: [
        p('Hello!', '你好！'), p('Hi!', '嗨！'),
        p('My name is Tom.', '我叫汤姆。'),
        p('Goodbye!', '再见！'), p('Bye-bye!', '拜拜！')
      ]
    },
    {
      id: 'g1u2', grade: '一年级上', title: 'Unit 2 My first class',
      words: [
        w('teacher', '老师'), w('class', '班级'), w('stand', '站'), w('sit', '坐'),
        w('up', '向上'), w('down', '向下'), w('please', '请'), w('ok', '好的')
      ],
      phrases: [
        p('Stand up, please.', '请起立。'),
        p('Sit down, please.', '请坐下。'),
        p('Good morning, class!', '同学们早上好！'),
        p('Good morning, teacher!', '老师早上好！')
      ]
    },
    {
      id: 'g1u3', grade: '一年级上', title: 'Unit 3 Look, listen and learn',
      words: [
        w('look', '看'), w('listen', '听'), w('learn', '学习'), w('eye', '眼睛'),
        w('ear', '耳朵'), w('mouth', '嘴巴'), w('hand', '手'), w('nose', '鼻子')
      ],
      phrases: [
        p('Look!', '看！'), p('Listen!', '听！'),
        p('This is my eye.', '这是我的眼睛。'),
        p('Touch your nose.', '摸摸你的鼻子。')
      ]
    },
    {
      id: 'g1u4', grade: '一年级上', title: 'Unit 4 Ready for school',
      words: [
        w('book', '书'), w('pen', '钢笔'), w('pencil', '铅笔'), w('bag', '书包'),
        w('ruler', '尺子'), w('eraser', '橡皮'), w('school', '学校'), w('ready', '准备好')
      ],
      phrases: [
        p('This is my book.', '这是我的书。'),
        p('I have a pencil.', '我有一支铅笔。'),
        p('Where is my bag?', '我的书包在哪里？'),
        p('I am ready for school.', '我准备好上学了。')
      ]
    },
    {
      id: 'g1u5', grade: '一年级上', title: 'Unit 5 People around me',
      words: [
        w('mum', '妈妈'), w('dad', '爸爸'), w('friend', '朋友'), w('boy', '男孩'),
        w('girl', '女孩'), w('brother', '兄弟'), w('sister', '姐妹'), w('family', '家庭')
      ],
      phrases: [
        p('This is my mum.', '这是我的妈妈。'),
        p('This is my dad.', '这是我的爸爸。'),
        p('He is my friend.', '他是我的朋友。'),
        p('I love my family.', '我爱我的家人。')
      ]
    },
    {
      id: 'g2u1', grade: '二年级上', title: 'Unit 1 Fun numbers and letters',
      words: [
        w('one', '一'), w('two', '二'), w('three', '三'), w('four', '四'),
        w('five', '五'), w('six', '六'), w('seven', '七'), w('eight', '八'),
        w('nine', '九'), w('ten', '十'), w('letter', '字母'), w('number', '数字')
      ],
      phrases: [
        p('How many?', '多少？'),
        p('I can count to ten.', '我能数到十。'),
        p('A B C D E.', 'A B C D E。'),
        p('What number is it?', '这是几？')
      ]
    },
    {
      id: 'g2u2', grade: '二年级上', title: 'Unit 2 A great picture',
      words: [
        w('picture', '图画'), w('draw', '画'), w('colour', '颜色'), w('red', '红色'),
        w('blue', '蓝色'), w('green', '绿色'), w('yellow', '黄色'), w('big', '大的'),
        w('small', '小的')
      ],
      phrases: [
        p('What colour is it?', '它是什么颜色？'),
        p('It is red.', '它是红色的。'),
        p('I can draw a picture.', '我会画画。'),
        p('What a great picture!', '多棒的画啊！')
      ]
    },
    {
      id: 'g2u3', grade: '二年级上', title: 'Unit 3 Helpful hands',
      words: [
        w('help', '帮助'), w('clean', '打扫'), w('wash', '洗'), w('make', '做'),
        w('bed', '床'), w('table', '桌子'), w('door', '门'), w('window', '窗户')
      ],
      phrases: [
        p('Can I help you?', '我能帮你吗？'),
        p('I can clean the table.', '我能擦桌子。'),
        p('Please open the door.', '请开门。'),
        p('Thank you for your help.', '谢谢你的帮助。')
      ]
    },
    {
      id: 'g2u4', grade: '二年级上', title: "Unit 4 I'm happy!",
      words: [
        w('happy', '高兴的'), w('sad', '难过的'), w('hungry', '饿的'), w('thirsty', '渴的'),
        w('tired', '累的'), w('feel', '感觉'), w('smile', '微笑'), w('cry', '哭')
      ],
      phrases: [
        p('How do you feel?', '你感觉怎么样？'),
        p('I am happy!', '我很高兴！'),
        p('I am hungry.', '我饿了。'),
        p('Are you tired?', '你累了吗？')
      ]
    },
    {
      id: 'g2u5', grade: '二年级上', title: 'Unit 5 Work time',
      words: [
        w('work', '工作'), w('play', '玩'), w('read', '读'), w('write', '写'),
        w('sing', '唱'), w('dance', '跳舞'), w('run', '跑'), w('jump', '跳')
      ],
      phrases: [
        p('It is work time.', '到学习时间了。'),
        p('I like to read.', '我喜欢阅读。'),
        p('Let us sing a song.', '我们唱首歌吧。'),
        p('Time to play!', '该玩了！')
      ]
    }
  ];

  var UNITS_G3A = [
    {
      id: 'g3u1', grade: '三年级上', title: 'Unit 1 Making friends',
      words: [
        w('nice', '友好的'), w('ear', '耳朵'), w('hand', '手'), w('eye', '眼睛'),
        w('mouth', '嘴'), w('arm', '胳膊'), w('can', '可以'), w('share', '分享'),
        w('smile', '微笑'), w('listen', '听'), w('help', '帮助'), w('say', '说'),
        w('and', '和'), w('goodbye', '再见'), w('toy', '玩具'), w('friend', '朋友'),
        w('good', '好的')
      ],
      phrases: [
        p("Hello! I'm Mike.", '你好！我是迈克。'),
        p('Nice to meet you.', '很高兴见到你。'),
        p('Nice to meet you too.', '我也很高兴见到你。'),
        p('We can share.', '我们可以一起分享。'),
        p('Thank you.', '谢谢你。'),
        p("It's OK.", '没关系。')
      ]
    },
    {
      id: 'g3u2', grade: '三年级上', title: 'Unit 2 Different families',
      words: [
        w('mum', '妈妈'), w('dad', '爸爸'), w('grandma', '奶奶/外婆'), w('grandpa', '爷爷/外公'),
        w('mother', '母亲'), w('father', '父亲'), w('me', '我'), w('sister', '姐/妹'),
        w('family', '家庭'), w('have', '有'), w('big', '大的'), w('cousin', '堂/表亲'),
        w('brother', '兄弟'), w('baby', '婴儿'), w('uncle', '叔叔/舅舅'), w('aunt', '阿姨/姑姑'),
        w('some', '一些'), w('small', '小的')
      ],
      phrases: [
        p('This is my mum.', '这是我的妈妈。'),
        p('This is my dad.', '这是我的爸爸。'),
        p('I have a big family.', '我有一个大家庭。'),
        p('Who lives with you?', '谁和你住在一起？'),
        p('I love my family.', '我爱我的家人。')
      ]
    },
    {
      id: 'g3u3', grade: '三年级上', title: 'Unit 3 Amazing animals',
      words: [
        w('like', '喜欢'), w('dog', '狗'), w('pet', '宠物'), w('cat', '猫'),
        w('fish', '鱼'), w('bird', '鸟'), w('rabbit', '兔子'), w('go', '去'),
        w('zoo', '动物园'), w('fox', '狐狸'), w('panda', '大熊猫'), w('cute', '可爱的'),
        w('monkey', '猴子'), w('tiger', '老虎'), w('elephant', '大象'), w('lion', '狮子'),
        w('giraffe', '长颈鹿'), w('tall', '高的'), w('fast', '快的')
      ],
      phrases: [
        p('I like dogs.', '我喜欢狗。'),
        p('I have a pet cat.', '我有一只宠物猫。'),
        p('Let us go to the zoo.', '我们去动物园吧。'),
        p('The panda is cute.', '熊猫很可爱。'),
        p('What animals do you like?', '你喜欢什么动物？')
      ]
    },
    {
      id: 'g3u4', grade: '三年级上', title: 'Unit 4 Plants around us',
      words: [
        w('apple', '苹果'), w('banana', '香蕉'), w('farm', '农场'), w('air', '空气'),
        w('orange', '橙子'), w('grape', '葡萄'), w('school', '学校'), w('garden', '花园'),
        w('need', '需要'), w('water', '水/浇水'), w('flower', '花'), w('grass', '草'),
        w('plant', '植物'), w('new', '新的'), w('tree', '树'), w('sun', '太阳'),
        w('give', '给'), w('us', '我们'), w('them', '它们')
      ],
      phrases: [
        p('I like apples.', '我喜欢苹果。'),
        p('Plants need water.', '植物需要水。'),
        p('Plants need the sun.', '植物需要阳光。'),
        p('This is a flower.', '这是一朵花。'),
        p('Let us water the plants.', '我们给植物浇水吧。')
      ]
    },
    {
      id: 'g3u5', grade: '三年级上', title: 'Unit 5 The colourful world',
      words: [
        w('colour', '颜色'), w('green', '绿色'), w('red', '红色'), w('blue', '蓝色'),
        w('make', '做'), w('purple', '紫色'), w('brown', '棕色'), w('bear', '熊'),
        w('yellow', '黄色'), w('duck', '鸭子'), w('sea', '海'), w('pink', '粉色'),
        w('draw', '画'), w('white', '白色'), w('black', '黑色')
      ],
      phrases: [
        p('What colour is it?', '它是什么颜色？'),
        p('It is blue.', '它是蓝色的。'),
        p('I can draw a duck.', '我会画鸭子。'),
        p('The sea is blue.', '大海是蓝色的。'),
        p('What colours do you see?', '你看见了什么颜色？')
      ]
    },
    {
      id: 'g3u6', grade: '三年级上', title: 'Unit 6 Useful numbers',
      words: [
        w('old', '岁/旧的'), w('five', '五'), w('year', '年/岁'), w('one', '一'),
        w('two', '二'), w('three', '三'), w('four', '四'), w('ten', '十'),
        w('six', '六'), w('seven', '七'), w('eight', '八'), w('nine', '九'),
        w("o'clock", '……点钟'), w('cut', '切'), w('piece', '块/片'), w('eat', '吃'),
        w('cake', '蛋糕')
      ],
      phrases: [
        p('How old are you?', '你几岁了？'),
        p('I am nine years old.', '我九岁了。'),
        p('It is five o\'clock.', '现在五点了。'),
        p('Happy birthday!', '生日快乐！'),
        p('I like cake.', '我喜欢蛋糕。')
      ]
    }
  ];

  function flattenWords(units) {
    var map = {};
    var list = [];
    units.forEach(function (u) {
      (u.words || []).forEach(function (item) {
        var key = item.en.toLowerCase();
        if (!map[key]) {
          map[key] = true;
          list.push(item);
        }
      });
    });
    return list;
  }

  function flattenPhrases(units) {
    var list = [];
    units.forEach(function (u) {
      (u.phrases || []).forEach(function (item) { list.push(item); });
    });
    return list;
  }

  function findUnit(id) {
    var all = UNITS_G12.concat(UNITS_G3A);
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  return {
    BOOK: '人教版 PEP（2024）',
    UNITS_G12: UNITS_G12,
    UNITS_G3A: UNITS_G3A,
    findUnit: findUnit,
    allWordsG12: function () { return flattenWords(UNITS_G12); },
    allWordsG3: function () { return flattenWords(UNITS_G3A); },
    allPhrasesG12: function () { return flattenPhrases(UNITS_G12); },
    allPhrasesG3: function () { return flattenPhrases(UNITS_G3A); }
  };
})();
