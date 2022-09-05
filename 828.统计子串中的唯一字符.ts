/*
 * @lc app=leetcode.cn id=828 lang=typescript
 *
 * [828] 统计子串中的唯一字符
 */

// @lc code=start
function uniqueLetterString(s: string): number {
  const index: Record<string, number> = {};
  const counted: Record<string, number> = {};
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;
    const count = i - (index[char] ?? -1);
    const lastCount = counted[char] ?? 0;
    sum += lastCount * count;
    counted[char] = count;
    index[char] = i;
  }
  const { length } = s;
  sum += Object.keys(index).reduce((total, char) => total + (length - index[char]!) * counted[char]!, 0);
  return sum;
}
// @lc code=end
test.Func(uniqueLetterString).tryParseCases(
  `
输入: s = "ABC"
输出: 10
解释: 所有可能的子串为："A","B","C","AB","BC" 和 "ABC"。
     其中，每一个子串都由独特字符构成。
     所以其长度总和为：1 + 1 + 1 + 2 + 2 + 3 = 10
`,
  `
输入: s = "ABA"
输出: 8
解释: 除了 countUniqueChars("ABA") = 1 之外，其余与示例 1 相同。
`,
  `
输入：s = "LEETCODE"
输出：92
`
);
export {};
