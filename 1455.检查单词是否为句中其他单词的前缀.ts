/*
 * @lc app=leetcode.cn id=1455 lang=typescript
 *
 * [1455] 检查单词是否为句中其他单词的前缀
 */

// @lc code=start
function isPrefixOfWord(sentence: string, searchWord: string): number {
  const index = sentence.split(" ").findIndex((word) => word.startsWith(searchWord));
  return index === -1 ? index : index + 1;
}
// @lc code=end
test.Func(isPrefixOfWord).withCases([["i love eating burger", "burg"], 4]);
export {};
