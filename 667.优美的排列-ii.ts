/*
 * @lc app=leetcode.cn id=667 lang=typescript
 *
 * [667] 优美的排列 II
 */

// @lc code=start
function constructArray(n: number, k: number): number[] {
  const isOdd = k % 2;
  const restStep = isOdd ? 1 : -1;
  const half = Math.ceil(k / 2);
  const restStart = isOdd ? half : n + 1 - half;
  return Array.from({ length: n }, (_, i) => {
    const seq = i + 1;
    if (seq >= k) {
      return restStart + restStep * (i - k + 1);
    }
    const isOdd = seq % 2;
    const generateStep = isOdd ? 1 : -1;
    const start = isOdd ? 1 : n;
    return start + generateStep * Math.floor(i / 2);
  });
}
// @lc code=end

test.Func(constructArray).tryParseCases(
  `
输入：n = 3, k = 1
输出：[1, 2, 3]
解释：[1, 2, 3] 包含 3 个范围在 1-3 的不同整数，并且 [1, 1] 中有且仅有 1 个不同整数：1
`,
  `
输入：n = 3, k = 2
输出：[1, 3, 2]
解释：[1, 3, 2] 包含 3 个范围在 1-3 的不同整数，并且 [2, 1] 中有且仅有 2 个不同整数：1 和 2
`
);

export {};
