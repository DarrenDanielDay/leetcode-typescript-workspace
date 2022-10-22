/*
 * @lc app=leetcode.cn id=1768 lang=typescript
 *
 * [1768] 交替合并字符串
 */

// @lc code=start
function mergeAlternately(word1: string, word2: string): string {
  return _.zip([...word1], [...word2])
    .map(([x, y]) => `${x ?? ""}${y ?? ""}`)
    .join("");
}
// @lc code=end
test.Func(mergeAlternately)
.tryParseMultiCases(
`
示例 1：
输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"

示例 2：

输入：word1 = "ab", word2 = "pqrs"
输出："apbqrs"

示例 3：
输入：word1 = "abcd", word2 = "pq"
输出："apbqcd"
`
)

export {}