/*
 * @lc app=leetcode.cn id=769 lang=typescript
 *
 * [769] 最多能完成排序的块
 */

// @lc code=start
function maxChunksToSorted(arr: number[]): number {
  let chunks = 0;
  let groupMax = -1;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]!;
    if (!~groupMax) {
      chunks++;
    }
    if (num > groupMax) {
      groupMax = num;
    }
    if (i === groupMax) {
      groupMax = -1;
    }
  }
  return chunks;
}
// @lc code=end
test.Func(maxChunksToSorted).tryParseMultiCases(
  `
示例 1:

输入: arr = [4,3,2,1,0]
输出: 1
解释:
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [4, 3], [2, 1, 0] 的结果是 [3, 4, 0, 1, 2]，这不是有序的数组。
示例 2:

输入: arr = [1,0,2,3,4]
输出: 4
解释:
我们可以把它分成两块，例如 [1, 0], [2, 3, 4]。
然而，分成 [1, 0], [2], [3], [4] 可以得到最多的块数。
`
);

export {};
