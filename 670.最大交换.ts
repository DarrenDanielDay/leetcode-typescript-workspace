/*
 * @lc app=leetcode.cn id=670 lang=typescript
 *
 * [670] 最大交换
 */

// @lc code=start
function maximumSwap(num: number): number {
  const s = `${num}`;
  const swapped = (i: number, j: number) => +`${s.slice(0, i)}${s[j]!}${s.slice(i + 1, j)}${s[i]!}${s.slice(j + 1)}`;
  const swappedList: number[] = [];
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      swappedList.push(swapped(i, j));
    }
  }
  const largest = swappedList.reduce((m, x) => Math.max(m, x), -Infinity);
  return Math.max(largest, num);
}
// @lc code=end
test.Func(maximumSwap).tryParseMultiCases(
  `
示例 1 :

输入: num = 2736
输出: 7236
解释: 交换数字2和数字7。
示例 2 :

输入: num = 9973
输出: 9973
解释: 不需要交换。
`
);
export {};
