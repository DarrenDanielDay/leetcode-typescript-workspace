/*
 * @lc app=leetcode.cn id=921 lang=typescript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
function minAddToMakeValid(s: string): number {
  let l = 0;
  let r = 0;
  for (const char of s) {
    switch (char) {
      case "(":
        l++;
        break;
      case ")":
        if (l === 0) {
          r++;
        } else {
          l--;
        }
        break;
      default:
        break;
    }
  }
  return l + r;
}
// @lc code=end
test.Func(minAddToMakeValid).tryParseMultiCases(
  `
示例 1：

输入：s = "())"
输出：1
示例 2：

输入：s = "((("
输出：3

示例 3：

输入：s = "()))(("
输出：4
`
);

export {};
