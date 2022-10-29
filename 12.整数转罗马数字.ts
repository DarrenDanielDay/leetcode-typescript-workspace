/*
 * @lc app=leetcode.cn id=12 lang=typescript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
function intToRoman(num: number): string {
  const levels = [
    ["I", "V"],
    ["X", "L"],
    ["C", "D"],
    ["M", "?"],
  ] as const;
  const buf = [
    ...(function* () {
      const s = num.toString();
      for (const [i, c] of Object.entries(s)) {
        const idx = s.length - 1 - +i;
        const [one, five] = levels[idx]!;
        const n = +c;
        switch (n) {
          case 0:
            break;
          case 1:
          case 2:
          case 3:
            yield one.repeat(n);
            break;
          case 4:
            yield `${one}${five}`;
            break;
          case 5:
          case 6:
          case 7:
          case 8:
            yield `${five}${one.repeat(n - 5)}`;
            break;
          case 9:
          default:
            yield `${one}${levels[idx + 1]![0]}`;
            break;
        }
      }
    })(),
  ];
  return buf.join("");
}
// @lc code=end

test.Func(intToRoman).tryParseMultiCases(
  `
示例 1:

输入: num = 3
输出: "III"
示例 2:

输入: num = 4
输出: "IV"
示例 3:

输入: num = 9
输出: "IX"
示例 4:

输入: num = 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
示例 5:

输入: num = 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
`
);

export {};
