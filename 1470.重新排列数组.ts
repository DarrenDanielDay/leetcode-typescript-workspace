/*
 * @lc app=leetcode.cn id=1470 lang=typescript
 *
 * [1470] 重新排列数组
 */

// @lc code=start
function shuffle(nums: number[], n: number): number[] {
  return nums.map((_, i, arr) => {
    const q = Math.floor(i / 2);
    const r = i % 2;
    return arr[n * r + q]!;
  });
}
// @lc code=end
test.Func(shuffle).tryParseCases(
  `
输入：nums = [2,5,1,3,4,7], n = 3
输出：[2,3,5,4,1,7] 
解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 ，所以答案为 [2,3,5,4,1,7]
`,
  `
输入：nums = [1,2,3,4,4,3,2,1], n = 4
输出：[1,4,2,3,3,2,4,1]`,
  `
输入：nums = [1,1,2,2], n = 2
输出：[1,2,1,2]
`
);

export {};
