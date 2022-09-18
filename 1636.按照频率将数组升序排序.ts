/*
 * @lc app=leetcode.cn id=1636 lang=typescript
 *
 * [1636] 按照频率将数组升序排序
 */

// @lc code=start
function frequencySort(nums: number[]): number[] {
  const counts = nums.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] ?? 0) + 1;
    return acc;
  }, {});
  return nums.sort((a, b) => counts[a]! - counts[b]! || b - a);
}
// @lc code=end
test.Func(frequencySort).tryParseMultiCases(
  `
示例 1：

输入：nums = [1,1,2,2,2,3]
输出：[3,1,1,2,2,2]
解释：'3' 频率为 1，'1' 频率为 2，'2' 频率为 3 。
示例 2：

输入：nums = [2,3,1,3,2]
输出：[1,3,3,2,2]
解释：'2' 和 '3' 频率都为 2 ，所以它们之间按照数值本身降序排序。
示例 3：

输入：nums = [-1,1,-6,4,5,-6,1,4,1]
输出：[5,-1,4,4,-6,-6,1,1,1]
`
);
export {};
