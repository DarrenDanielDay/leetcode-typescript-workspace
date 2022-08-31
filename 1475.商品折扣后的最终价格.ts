/*
 * @lc app=leetcode.cn id=1475 lang=typescript
 *
 * [1475] 商品折扣后的最终价格
 */

// @lc code=start
function finalPrices(prices: number[]): number[] {
  return prices.map((pi, i, arr) => {
    const pj = arr.find((pj, j) => j > i && pj <= pi);
    if (pj == null) {
      return pi;
    }
    return pi - pj;
  });
}
// @lc code=end
test.Func(finalPrices).tryParseCases(
  `
输入：prices = [8,4,6,2,3]
输出：[4,2,4,2,3]
  `,
  `
输入：prices = [1,2,3,4,5]
输出：[1,2,3,4,5]
`,
  `
输入：prices = [10,1,1,6]
输出：[9,0,1,6]
`
);
export {};
