/*
 * @lc app=leetcode.cn id=1624 lang=typescript
 *
 * [1624] 两个相同字符之间的最长子字符串
 */

// @lc code=start
function maxLengthBetweenEqualCharacters(s: string): number {
  const firstIndexOf: Record<string, number> = {};
  let max = -1;
  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;
    const firstIndex = firstIndexOf[char];
    if (firstIndex != null) {
      max = Math.max(max, i - firstIndex - 1);
    } else {
      firstIndexOf[char] = i;
    }
  }
  return max;
}
// @lc code=end
test.Func(maxLengthBetweenEqualCharacters).tryParseMultiCases(
  `
示例 1：

输入：s = "aa"
输出：0
解释：最优的子字符串是两个 'a' 之间的空子字符串。
示例 2：

输入：s = "abca"
输出：2
解释：最优的子字符串是 "bc" 。
示例 3：

输入：s = "cbzxy"
输出：-1
解释：s 中不存在出现出现两次的字符，所以返回 -1 。
示例 4：

输入：s = "cabbac"
输出：4
解释：最优的子字符串是 "abba" ，其他的非最优解包括 "bb" 和 "" 。
示例 5：

输入：s = "mgntdygtxrvxjnwksqhxuxtrv"
输出：18
`
);
export {};
