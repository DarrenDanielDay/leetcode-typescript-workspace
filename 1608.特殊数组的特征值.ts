/*
 * @lc app=leetcode.cn id=1608 lang=typescript
 *
 * [1608] 特殊数组的特征值
 */

// @lc code=start
function specialArray(nums: number[]): number {
  nums.sort((a, b) => b - a);
  for (let i = 0; i < nums.length; i++) {
    const x = i + 1;
    if (nums[i]! >= x && !(nums[i + 1]! >= x)) {
      return x;
    }
  }
  return -1;
}
// @lc code=end
test.Func(specialArray).tryParseCases(
  `
输入：nums = [3,5]
输出：2
解释：有 2 个元素（3 和 5）大于或等于 2 。
`,
  `
输入：nums = [0,0]
输出：-1
解释：没有满足题目要求的特殊数组，故而也不存在特征值 x 。
如果 x = 0，应该有 0 个元素 >= x，但实际有 2 个。
如果 x = 1，应该有 1 个元素 >= x，但实际有 0 个。
如果 x = 2，应该有 2 个元素 >= x，但实际有 0 个。
x 不能取更大的值，因为 nums 中只有两个元素。
`,
  `
输入：nums = [0,4,3,0,4]
输出：3
解释：有 3 个元素大于或等于 3 。
`,
  `
输入：nums = [3,6,7,7,0]
输出：-1
`
);
export {};
