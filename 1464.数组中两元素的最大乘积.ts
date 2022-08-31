/*
 * @lc app=leetcode.cn id=1464 lang=typescript
 *
 * [1464] 数组中两元素的最大乘积
 */

// @lc code=start
function maxProduct(nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b);
  return (sorted.at(-1)! - 1) * (sorted.at(-2)! - 1);
}
// @lc code=end
test.Func(maxProduct).withCases([[[10, 2, 5, 2]], 36], [[[3, 4, 5, 2]], 12], [[[1, 5, 4, 5]], 16], [[[3, 7]], 12]);
export {};
