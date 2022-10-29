/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  const shouldAverage = total % 2 === 0;
  let exclude = Math.floor((total - 1) / 2);
  let i1 = 0,
    i2 = 0;
  while (exclude > 1) {
    const half = Math.floor(exclude / 2);
    const d1 = Math.min(i1 + half, nums1.length - 1) - i1;
    const d2 = Math.min(i2 + half, nums2.length - 1) - i2;

    const j1 = i1 + d1;
    const j2 = i2 + d2;
    const n1 = nums1[j1]!;
    const n2 = nums2[j2]!;
    if (n1 < n2) {
      if (d1 === 0) {
        i1 = nums1.length;
        i2 += exclude - 1;
        exclude = 0;
      } else {
        i1 = j1;
        exclude -= d1;
      }
    } else {
      if (d2 === 0) {
        i2 = nums2.length;
        i1 += exclude - 1;
        exclude = 0;
      } else {
        i2 = j2;
        exclude -= d2;
      }
    }
  }
  const nums = Array.from({ length: 3 }, (_, i) => [nums1[i1 + i] ?? Infinity, nums2[i2 + i] ?? Infinity])
    .flat()
    .sort((a, b) => a - b)
    .slice(exclude);
  return _.mean(shouldAverage ? nums.slice(0, 2) : nums.slice(0, 1));
}
// @lc code=end

test.Func(findMedianSortedArrays).tryParseMultiCases(
  `  
示例 0：
输入：nums1 = [2,2,4,4], nums2 = [2,2,4,4]
输出：3

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
`
);

export {};
