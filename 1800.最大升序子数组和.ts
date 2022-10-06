/*
 * @lc app=leetcode.cn id=1800 lang=typescript
 *
 * [1800] 最大升序子数组和
 */

// @lc code=start
function maxAscendingSum(nums: number[]): number {
  let maxSum = -Infinity;
  let sum = 0;
  let previous = -Infinity;
  for (const num of nums) {
    if (num > previous) {
      sum += num;
      maxSum = Math.max(sum, maxSum);
    } else {
      sum = num;
      maxSum = Math.max(sum, maxSum);
    }
    previous = num;
  }
  return maxSum;
}
// @lc code=end
test.Func(maxAscendingSum)
.tryParseMultiCases(
`
示例 1：

输入：nums = [10,20,30,5,10,50]
输出：65
解释：[5,10,50] 是元素和最大的升序子数组，最大元素和为 65 。
示例 2：

输入：nums = [10,20,30,40,50]
输出：150
解释：[10,20,30,40,50] 是元素和最大的升序子数组，最大元素和为 150 。 
示例 3：

输入：nums = [12,17,15,13,10,11,12]
输出：33
解释：[10,11,12] 是元素和最大的升序子数组，最大元素和为 33 。 
示例 4：

输入：nums = [100,10,1]
输出：100
`
)
export {}