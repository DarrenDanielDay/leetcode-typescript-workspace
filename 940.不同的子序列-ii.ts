/*
 * @lc app=leetcode.cn id=940 lang=typescript
 *
 * [940] 不同的子序列 II
 */

// @lc code=start
function distinctSubseqII(s: string): number {
  const m = 1e9 + 7;
  const mod = (n: number) => (n + m) % m;
  const n = s.length;
  let sum = 0;
  const aCharCode = 'a'.charCodeAt(0)
  const dp: number[] = Array.from({length: 26}, () => 0);
  for (let i = 0; i < n; i++) {
    const char = s[i]!;
    const charIndex = char.charCodeAt(0) - aCharCode;
    const lastCharSum = dp[charIndex]!;
    const endsWithSi = mod(sum + 1 - lastCharSum);
    dp[charIndex] = mod(endsWithSi + lastCharSum);
    sum = mod(sum + endsWithSi);
  }
  return sum;
}
// @lc code=end
test.Func(distinctSubseqII).tryParseMultiCases(
  `
示例 1：

输入：s = "abc"
输出：7
解释：7 个不同的子序列分别是 "a", "b", "c", "ab", "ac", "bc", 以及 "abc"。
示例 2：

输入：s = "aba"
输出：6
解释：6 个不同的子序列分别是 "a", "b", "ab", "ba", "aa" 以及 "aba"。
示例 3：

输入：s = "aaa"
输出：3
解释：3 个不同的子序列分别是 "a", "aa" 以及 "aaa"。
`
);

export {};
