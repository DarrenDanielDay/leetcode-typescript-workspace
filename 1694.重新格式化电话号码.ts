/*
 * @lc app=leetcode.cn id=1694 lang=typescript
 *
 * [1694] 重新格式化电话号码
 */

// @lc code=start
function reformatNumber(number: string): string {
  const cleaned = [...number].filter((c) => !(c === " " || c === "-")).join("");
  const acc: string[] = [];
  let i = 0;
  for (; cleaned.length - i > 4; i += 3) {
    acc.push(cleaned.slice(i, i + 3));
  }
  switch (cleaned.length - i) {
    case 2:
    case 3:
      acc.push(cleaned.slice(i));
      break;
    default:
      acc.push(cleaned.slice(i, i + 2), cleaned.slice(i + 2));
      break;
  }
  return acc.join("-");
}
// @lc code=end
test.Func(reformatNumber)
.tryParseMultiCases(
`
示例 1：

输入：number = "1-23-45 6"
输出："123-456"

示例 2：

输入：number = "123 4-567"
输出："123-45-67"

示例 3：

输入：number = "123 4-5678"
输出："123-456-78"

示例 4：

输入：number = "12"
输出："12"
`
)

export {}