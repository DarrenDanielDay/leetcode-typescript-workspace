/*
 * @lc app=leetcode.cn id=1784 lang=typescript
 *
 * [1784] 检查二进制字符串字段
 */

// @lc code=start
function checkOnesSegment(s: string): boolean {
  let has1 = false;
  let hasBreak = false;
  for (const char of s) {
    switch (char) {
      case "1":
        if (hasBreak) {
          return false;
        }
        has1 = true;
        break;
      case "0":
        if (has1) {
          hasBreak = true;
        }
        break;
      default:
        break;
    }
  }
  return true;
}
// @lc code=end

test.Func(checkOnesSegment)
.tryParseMultiCases(
`
示例 1：

输入：s = "1001"
输出：false
解释：由连续若干个 '1' 组成的字段数量为 2，返回 false
示例 2：

输入：s = "110"
输出：true
`
)

export {}
