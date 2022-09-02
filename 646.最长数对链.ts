/*
 * @lc app=leetcode.cn id=646 lang=typescript
 *
 * [646] 最长数对链
 */

// @lc code=start
function findLongestChain(pairs: [number, number][]): number {
  pairs.sort(([, a], [, b]) => a - b);
  let res = 0;
  let lastEnd = -Infinity;
  for (const [begin, end] of pairs) {
    if (lastEnd < begin) {
      lastEnd = end;
      res++;
    }
  }
  return res;
}
// @lc code=end
test.Func(findLongestChain).tryParseCases(
  `
输入：pairs = [[1,2], [2,3], [3,4]]
输出：2
解释：最长的数对链是 [1,2] -> [3,4]`
);
export {};
