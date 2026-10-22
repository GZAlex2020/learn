# -*- coding: utf-8 -*-
"""生成数学暑假 56 天每日一练"""
import os
import random

random.seed(42)

ROOT = os.path.dirname(__file__)
OUT = os.path.join(ROOT, '数学', '打印版', '04-每日一练', '暑假56天每日一练.md')

CONCEPTS = [
    ('>', '大于', '5 > 3'), ('<', '小于', '2 < 7'), ('=', '等于', '4 = 4'),
    ('+', '加法', '3 + 2 = 5'), ('-', '减法', '5 - 2 = 3'),
    ('十位', '35 的 3', '3 个十'), ('个位', '35 的 5', '5 个一'),
    ('正方形', '4 边相等', '魔方一面'), ('圆形', '能滚动', '硬币'),
    ('三角形', '3 个角', '三明治'), ('长方形', '对边相等', '书本'),
    ('凑十', '先凑 10', '9+5=9+1+4'), ('破十', '先减 10', '13-5'),
    ('1 元', '= 10 角', '1 元=10 角'), ('整点', '分针指 12', '3:00'),
    ('一共', '加起来', '5+4=9'), ('还剩', '剩下', '12-5=7'),
    ('比…多', '大减小', '9-6=3'), ('相差', '差多少', '10-7=3'),
    ('时针', '短针', '看小时'), ('分针', '长针', '看分钟'),
    ('和', '加法结果', '3+4=7'), ('差', '减法结果', '9-4=5'),
    ('最大', '最大的数', '3,7,5→7'), ('最小', '最小的数', '3,7,5→3'),
    ('平面图形', '平平的', '圆、方'), ('角', '尖尖的', '桌角'),
    ('元', '人民币', '1 元'), ('角', '10 角=1 元', '5 角'),
    ('找回', '付钱减价', '5-3=2'), ('列式', '写算式', '5+3=?'),
    ('合计', '总共', '2+3=5'), ('剩余', '还有', '10-4=6'),
    ('增加', '变多', '5+2=7'), ('用去', '用掉', '8-3=5'),
    ('每', '每一个', '每人 2 个'), ('看图', '看图画', '数个数'),
    ('比大小', '> < =', '8 > 5'), ('找规律', '下一个数', '2,4,6,8'),
    ('选择', '选一个', '选对的'), ('填空', '填括号', '7+()=10'),
    ('计算', '算出得数', '9-3=6'), ('解答', '写完整', '算式+答'),
    ('又', '再增加', '3+2=5'), ('原来', '开始', '有时加有时减'),
    ('卖出', '卖掉了', '减法'), ('吃了', '减少了', '减法'),
    ('谁多', '比较', '大减小'), ('谁少', '比较', '大减小'),
    ('拼组', '拼图形', '2 三角拼方'), ('分类', '分组', '按形状分'),
    ('进位', '满十进一', '8+5=13'), ('退位', '借十', '13-5=8'),
    ('口算', '心算', '不用笔'), ('相邻', '挨着的', '9 和 10'),
    ('付', '给钱', '5 元'), ('便宜', '价格低', '3 元<5 元'),
    ('乘法', '几个几', '3×4=12'), ('除法', '平均分', '12÷3=4'),
    ('被除数', '÷ 前面', '12÷3 的 12'), ('除数', '÷ 后面', '12÷3 的 3'),
    ('商', '除法结果', '12÷3=4 的 4'), ('积', '乘法结果', '3×4=12 的 12'),
    ('倍', '几个同样多', '3 的 4 倍'), ('平均分', '分成同样多', '除法'),
]

READ_ITEMS = [
    ('小明有 5 个苹果，小红有 4 个，一共有几个？', '一共', '要把 5 和 4 加起来', '5+4=9'),
    ('树上有 12 只鸟，飞走 5 只，还剩几只？', '还剩', '从 12 里去掉 5', '12-5=7'),
    ('小刚 9 本，小丽 6 本，小刚比小丽多几本？', '比……多', '9 减 6', '9-6=3'),
    ('请选择正确得数：8+7=？', '选择', '我要选一个对的', '15'),
    ('请填空：6+（  ）= 10', '填空', '我要填括号', '4'),
    ('看图列式：左边 3 个，右边 2 个', '看图列式', '3 加 2', '3+2=5'),
    ('在○里填> < =：9 ○ 6', '比大小', '9 比 6 大', '9>6'),
    ('妈妈付 50 元，买 20 元，找回几元？', '找回', '50 减 20', '50-20=30'),
    ('2，4，6，8，（  ）', '找规律', '每次加 2', '10'),
    ('列式计算：15 - 8 = ?', '列式', '写出算式并计算', '15-8=7'),
    ('盒里有 10 个球，拿走 3 个，还剩？', '还剩', '10 减 3', '10-3=7'),
    ('小明又买了 4 支笔，原来 5 支，现在几支？', '又', '5 加 4', '5+4=9'),
    ('爸爸 35 岁，小明 8 岁，相差几岁？', '相差', '35 减 8', '35-8=27'),
    ('1 元铅笔，5 角橡皮，一共几角？', '一共', '10 角加 5 角', '15 角'),
    ('请判断：3+4=8 对不对', '判断', '3+4=7，不对', '错'),
]

READ_G2 = [
    ('每支铅笔 2 元，买 5 支一共几元？', '每', '2 乘 5', '2×5=10'),
    ('把 12 个苹果平均分给 3 人，每人几个？', '平均', '12 除以 3', '12÷3=4'),
    ('小红有 4 盒，每盒 3 个，一共有几个？', '每', '4 乘 3', '4×3=12'),
    ('列式计算：6 × 7 = ?', '乘法', '写出算式并计算', '6×7=42'),
    ('列式计算：24 ÷ 4 = ?', '除法', '写出算式并计算', '24÷4=6'),
    ('3 的 4 倍是多少？', '倍', '3 乘 4', '3×4=12'),
    ('有 15 个，每 5 个装一盒，能装几盒？', '每', '15 除以 5', '15÷5=3'),
    ('8 × 9 = ? 请选择正确得数', '选择', '我要选一个对的', '72'),
    ('18 ÷ 3 = ? 请填空', '填空', '我要填括号', '6'),
    ('小明有 5 组，每组 2 人，一共有几人？', '每', '5 乘 2', '5×2=10'),
]


def gen_multiply(max_table=9):
    a = random.randint(2, max_table)
    b = random.randint(2, max_table)
    return f'{a} × {b}', a * b


def gen_divide(max_table=9):
    b = random.randint(2, max_table)
    ans = random.randint(2, max_table)
    a = b * ans
    return f'{a} ÷ {b}', ans


def gen_calc(week, day):
    if week == 1:
        a, b = random.randint(1, 9), random.randint(1, 9)
        if random.random() < 0.5:
            return f'{a} + {b}', a + b
        m, n = max(a, b), min(a, b)
        return f'{m} - {n}', m - n
    if week == 2:
        if random.random() < 0.5:
            a, b = random.randint(5, 9), random.randint(2, 9)
            return f'{a} + {b}', a + b
        a, b = random.randint(11, 18), random.randint(2, 9)
        return f'{a} - {b}', a - b
    if week <= 4:
        if random.random() < 0.5:
            a = random.randint(1, 9) * 10
            b = random.randint(1, 9) * 10 if random.random() < 0.5 else random.randint(1, 9)
            return f'{a} + {b}', a + b
        a = random.randint(2, 9) * 10 + random.randint(0, 9)
        b = random.randint(1, 9)
        return f'{a} - {b}', a - b
    if week <= 6:
        r = random.random()
        if r < 0.35:
            return gen_multiply(5)
        if r < 0.55:
            return gen_divide(5)
        if r < 0.75:
            a = random.randint(2, 9) * 10 + random.randint(0, 9)
            b = random.randint(1, 9) * 10 if random.random() < 0.5 else random.randint(1, 9)
            if random.random() < 0.5:
                return f'{a} + {b}', a + b
            m, n = max(a, b), min(a, b)
            return f'{m} - {n}', m - n
        a, b = random.randint(11, 18), random.randint(2, 9)
        return f'{a} - {b}', a - b
    r = random.random()
    if r < 0.3:
        return gen_multiply(9)
    if r < 0.5:
        return gen_divide(9)
    if r < 0.75:
        a = random.randint(2, 9) * 10 + random.randint(0, 9)
        b = random.randint(1, 9)
        if random.random() < 0.5:
            return f'{a} + {b}', a + b
        return f'{a} - {b}', a - b
    a, b = random.randint(1, 20), random.randint(1, 20)
    if random.random() < 0.5:
        return f'{a} + {b}', a + b
    m, n = max(a, b), min(a, b)
    return f'{m} - {n}', m - n


def make_wrong_opts(ans, expr):
    wrong = {ans}
    is_mul_div = '×' in expr or '÷' in expr
    guard = 0
    while len(wrong) < 4 and guard < 30:
        guard += 1
        if is_mul_div:
            delta = random.randint(1, max(2, ans // 3))
            wrong.add(max(1, ans + random.choice([-1, 1]) * delta))
        else:
            wrong.add(ans + random.randint(-3, 3))
    opts = sorted(wrong)[:4]
    if ans not in opts:
        opts[0] = ans
    return ' / '.join(str(x) for x in sorted(set(opts)))


def pick_concepts(day):
    start = (day * 3) % len(CONCEPTS)
    return [CONCEPTS[(start + i) % len(CONCEPTS)] for i in range(5)]


def main():
    lines = [
        '# 暑假 56 天每日一练（数学）',
        '',
        '> 每天 1 页，约 15～20 分钟。先读题，再做题。',
        '> 第 1～4 周以 20/100 以内加减为主；第 5～8 周增加表内乘除法（二年级）。',
        '',
        '---',
        '',
    ]
    for day in range(1, 57):
        week = (day - 1) // 7 + 1
        calcs = [gen_calc(week, day) for _ in range(3)]
        concepts = pick_concepts(day)
        read_pool = READ_G2 if week >= 5 else READ_ITEMS
        read = read_pool[(day - 1) % len(read_pool)]
        extra1, ans1 = gen_calc(week, day)
        calc_title = '口算（3 题）—— 含乘除法（二年级）' if week >= 5 else '口算（3 题）'

        lines += [
            f'## 第 {day} 天（第 {week} 周）',
            '',
            '**日期：** ____________    **完成：** □    **家长签字：** ____________',
            '',
            f'### 一、{calc_title}',
            '',
        ]
        for i, (expr, ans) in enumerate(calcs, 1):
            opts_str = make_wrong_opts(ans, expr)
            lines.append(f'{i}. {expr} = ?  （{opts_str}）')
            lines.append(f'   **答案：{ans}**')
            lines.append('')

        lines += ['### 二、概念（5 个）—— 说名称 + 举例', '']
        for i, (name, desc, ex) in enumerate(concepts, 1):
            lines.append(f'{i}. **{name}**  →  {desc}  →  例：{ex}')
        lines.append('')

        lines += [
            '### 三、读题（1 题）—— 读题目 + 说要求',
            '',
            f'**题目：** {read[0]}',
            f'**关键词：** {read[1]}',
            f'**孩子应说：** {read[2]}',
            f'**参考列式/答案：** {read[3]}',
            '',
            '### 四、小练习（2 题）',
            '',
            f'1. 【口算】{extra1} = ______',
            f'   **答案：{ans1}**',
            '',
        ]
        if week >= 5 and random.random() < 0.5:
            mx, ma = gen_multiply(9 if week >= 7 else 5)
            lines += [
                f'2. 【乘除法】{mx} = ______',
                f'   **答案：{ma}**',
                '',
            ]
        else:
            lines += [
                f'2. 【概念/读题】「{concepts[0][0]}」是什么意思？',
                f'   **参考：{concepts[0][1]}**',
                '',
            ]
        lines += [
            '',
            '---',
            '',
        ]

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'已生成 {OUT}，共 56 天')


if __name__ == '__main__':
    main()
