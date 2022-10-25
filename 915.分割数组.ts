/*
 * @lc app=leetcode.cn id=915 lang=typescript
 *
 * [915] 分割数组
 */

// @lc code=start
function partitionDisjoint(nums: number[]): number {
  let leftMax = Infinity;
  let currentMax = -Infinity;
  let index = NaN;
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]!;
    currentMax = Math.max(currentMax, current);
    if (current < leftMax) {
      leftMax = currentMax;
      index = i;
    }
  }
  return index + 1;
}
// @lc code=end
test.Func(partitionDisjoint).tryParseMultiCases(
  `
示例 1：

输入：nums = [5,0,3,8,6]
输出：3
解释：left = [5,0,3]，right = [8,6]
示例 2：

输入：nums = [1,1,1,0,6,12]
输出：4
解释：left = [1,1,1,0]，right = [6,12]
`
);
export {};
