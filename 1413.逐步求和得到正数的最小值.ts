/*
 * @lc app=leetcode.cn id=1413 lang=typescript
 *
 * [1413] 逐步求和得到正数的最小值
 */

// @lc code=start
function minStartValue(nums: number[]): number {
  const sums = nums.reduce<number[]>((acc, num, i) => {
    acc.push((acc[i - 1] ?? 0) + num);
    return acc;
  }, []);
  return Math.max(1, 1 - sums.reduce((pre, cur) => (pre < cur ? pre : cur), 0));
}
// @lc code=end
test.Func(minStartValue).withCases([[[-3, 2, -3, 4, 2]], 5], [[[1, 2]], 1], [[[1, -2, -3]], 5]);
export {};
