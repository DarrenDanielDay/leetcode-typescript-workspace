/*
 * @lc app=leetcode.cn id=1822 lang=typescript
 *
 * [1822] 数组元素积的符号
 */

// @lc code=start
function arraySign(nums: number[]): number {
  return Math.sign(nums.reduce((acc, cur) => acc * Math.sign(cur), 1));
}
// @lc code=end
test.Func(arraySign)
.tryParseMultiCases(
`
示例 1：

输入：nums = [-1,-2,-3,-4,3,2,1]
输出：1
解释：数组中所有值的乘积是 144 ，且 signFunc(144) = 1
示例 2：

输入：nums = [1,5,0,2,-3]
输出：0
解释：数组中所有值的乘积是 0 ，且 signFunc(0) = 0
示例 3：

输入：nums = [-1,1,-1,1,-1]
输出：-1
解释：数组中所有值的乘积是 -1 ，且 signFunc(-1) = -1
`
)
export {}