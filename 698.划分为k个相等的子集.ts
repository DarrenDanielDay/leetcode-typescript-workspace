/*
 * @lc app=leetcode.cn id=698 lang=typescript
 *
 * [698] 划分为k个相等的子集
 */

// @lc code=start
function canPartitionKSubsets(nums: number[], k: number): boolean {
  const sum = _.sum(nums);
  const avg = sum / k;
  if (avg !== Math.floor(avg)) {
    return false;
  }
  const n = nums.length;
  const cache: Record<number, true> = {};
  const dfs = (rest: number, groupSum: number): boolean => {
    if (!rest) {
      return true;
    }
    if (cache[rest]) {
      return false;
    }
    for (let i = 0; i < n; i++) {
      const flag = 1 << i;
      const thisSum = nums[i]! + groupSum;
      if (thisSum > avg) {
        break;
      }
      if (rest & flag) {
        if (dfs(rest - flag, thisSum % avg)) {
          return true;
        }
      }
    }
    cache[rest] = true;
    return false;
  };
  nums = _.sortBy(nums, _.identity);
  return dfs(-1 ^ (-1 << n), 0);
}
// @lc code=end
test.Func(canPartitionKSubsets).tryParseMultiCases(
  `
示例 1：

输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
输出： true
说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
示例 2:

输入: nums = [1,2,3,4], k = 3
输出: false
示例 3:

输入: nums = [2,2,2,2,3,4,5], k = 4
输出: false
`
);
export {};
