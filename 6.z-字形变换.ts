/*
 * @lc app=leetcode.cn id=6 lang=typescript
 *
 * [6] Z 字形变换
 */

// @lc code=start
function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;
  const buf = Array.from({ length: numRows }, (): string[] => []);
  const loop = 2 * numRows - 2;
  for (let i = 0; i < s.length; i++) {
    const mod = i % loop;
    if (mod < numRows) {
      buf[mod]!.push(s[i]!);
    } else {
      buf[loop - mod]!.push(s[i]!);
    }
  }
  return buf.flat().join("");
}
// @lc code=end

test.Func(convert)
.tryParseMultiCases(
`
示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"
`
)

export {}