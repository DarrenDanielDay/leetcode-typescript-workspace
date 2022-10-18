/*
 * @lc app=leetcode.cn id=902 lang=typescript
 *
 * [902] 最大为 N 的数字组合
 */

// @lc code=start
function atMostNGivenDigitSet(digits: string[], n: number): number {
  const nDigits = [...n.toString()].map((c) => +c).reverse();
  const ds = digits.map((d) => +d);
  function lengthSameAns(digits: number[], num: number[]): number {
    if (num.length === 1) {
      const n = num[0]!;
      return digits.filter((d) => d <= n).length;
    }
    const n = num.at(-1)!;
    const lessThanNDigits = digits.filter((d) => d <= n);
    if (!lessThanNDigits.length) {
      return 0;
    }
    const maxLessThanNDigit = lessThanNDigits.at(-1)!;
    if (maxLessThanNDigit < n) {
      return lessThanNDigits.length * digits.length ** (num.length - 1);
    } else {
      return (
        (lessThanNDigits.length - 1) * digits.length ** (num.length - 1) +
        lengthSameAns(digits, num.slice(0, num.length - 1))
      );
    }
  }
  const q = ds.length;
  const s = q === 1 ? (nDigits.length - 1) : (q * (1 - q ** (nDigits.length - 1))) / (1 - q);
  return lengthSameAns(ds, nDigits) + s;
}
// @lc code=end

test.Func(atMostNGivenDigitSet).tryParseMultiCases(
  `
示例 0:

输入：digits = ["5","7","8"], n = 59
输出：6

示例 1：

输入：digits = ["1","3","5","7"], n = 100
输出：20
解释：
可写出的 20 个数字是：
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
示例 2：

输入：digits = ["1","4","9"], n = 1000000000
输出：29523
解释：
我们可以写 3 个一位数字，9 个两位数字，27 个三位数字，
81 个四位数字，243 个五位数字，729 个六位数字，
2187 个七位数字，6561 个八位数字和 19683 个九位数字。
总共，可以使用D中的数字写出 29523 个整数。
示例 3:

输入：digits = ["7"], n = 8
输出：1
`
);

export {};
