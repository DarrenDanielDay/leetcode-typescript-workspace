/*
 * @lc app=leetcode.cn id=1592 lang=typescript
 *
 * [1592] 重新排列单词间的空格
 */

// @lc code=start
function reorderSpaces(text: string): string {
  const words = text.trim().split(/ +/g);
  const wordsLength = words.reduce((s, word) => s + word.length, 0);
  const spaces = text.length - wordsLength;
  const sepLength = Math.floor(spaces / Math.max(1, words.length - 1));
  return words.join(" ".repeat(sepLength)) + " ".repeat(spaces - (words.length - 1) * sepLength);
}
// @lc code=end
test.Func(reorderSpaces).tryParseCases(
  `
输入：text = "  this   is  a sentence "
输出："this   is   a   sentence"
解释：总共有 9 个空格和 4 个单词。可以将 9 个空格平均分配到相邻单词之间，相邻单词间空格数为：9 / (4-1) = 3 个。
`,
  `
输入：text = " practice   makes   perfect"
输出："practice   makes   perfect "
解释：总共有 7 个空格和 3 个单词。7 / (3-1) = 3 个空格加上 1 个多余的空格。多余的空格需要放在字符串的末尾。
`,
  `
输入：text = "hello   world"
输出："hello   world"
`,
  `
输入：text = "  walks  udp package   into  bar a"
输出："walks  udp  package  into  bar  a "
`,
  `
输入：text = "a"
输出："a"
`
);
export {};
