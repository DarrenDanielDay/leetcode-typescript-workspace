/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let max = 0;
  const n = s.length;
  let lastValidStart = -1;
  for (let i = 0; i < n; i++) {
    const char = s[i]!;
    const lastIndex = lastSeen.get(char);
    if (lastIndex != null) {
      lastValidStart = lastIndex;
      max = Math.max(i - lastIndex, max);
      for (const [key, value] of [...lastSeen.entries()]) {
        if (value < lastIndex) {
          lastSeen.delete(key);
        }
      }
    } else {
      max = Math.max(i - lastValidStart, max);
    }
    lastSeen.set(char, i);
  }
  return max;
}
// @lc code=end
test.Func(lengthOfLongestSubstring).tryParseMultiCases(
  `
示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
`
);
export {};
