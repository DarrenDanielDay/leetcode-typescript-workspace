/*
 * @lc app=leetcode.cn id=801 lang=typescript
 *
 * [801] 使序列递增的最小交换次数
 */

// @lc code=start
const enum CompareToPrevious {
  Both = 0,
  Keep = 1,
  Swap = 2,
}
function minSwap(nums1: number[], nums2: number[]): number {
  const n = Math.max(nums1.length, nums2.length);
  const choices = nums1.map((n1, i) => {
    const p1 = nums1[i - 1] ?? -Infinity;
    const p2 = nums2[i - 1] ?? -Infinity;
    const n2 = nums2[i]!;
    const canSwap = p1 < n2 && p2 < n1;
    const canKeep = p1 < n1 && p2 < n2;
    return canKeep ? (canSwap ? CompareToPrevious.Both : CompareToPrevious.Keep) : CompareToPrevious.Swap;
  });
  const dp = nums2.map((): [number, number] => [0, 0]);
  const last = dp[n - 1]!;
  last[1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    const next = i + 1;
    const choice = choices[next]!;
    const pending = dp[i]!;
    const previous = dp[next]!;
    switch (choice) {
      case CompareToPrevious.Both:
        const m = Math.min(...previous);
        pending[0] = m;
        pending[1] = 1 + m;
        break;
      case CompareToPrevious.Keep:
        pending[0] = previous[0];
        pending[1] = 1 + previous[1];
        break;
      case CompareToPrevious.Swap:
        pending[0] = previous[1];
        pending[1] = 1 + previous[0];
        break;
      default:
        break;
    }
  }
  return Math.min(...dp[0]!);
}
// @lc code=end

test.Func(minSwap).tryParseMultiCases(
  `
示例 1:

输入: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
输出: 1
解释: 
交换 A[3] 和 B[3] 后，两个数组如下:
A = [1, 3, 5, 7] ， B = [1, 2, 3, 4]
两个数组均为严格递增的。
示例 2:

输入: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
输出: 1

示例 3:

输入: nums1 = [0,4,4,5,9], nums2 = [0,1,6,8,10]
输出: 1
`
);

export {};
