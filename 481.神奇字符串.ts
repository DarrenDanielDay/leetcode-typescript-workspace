/*
 * @lc app=leetcode.cn id=481 lang=typescript
 *
 * [481] 神奇字符串
 */

// @lc code=start
function magicalString(n: number): number {
  const buf = ["1", "2", "2"];
  let index = 1;
  let computed = 2;
  while (index < n) {
    const generatedLength = buf.length;
    for (let i = computed; i < generatedLength; i++) {
      buf.push(...(buf.at(-1) === "1" ? "2" : "1")!.repeat(+buf[i]!));
    }
    computed = generatedLength;
    index = buf.length;
  }
  return _.sum(buf.slice(0, n).map((c) => (c === "1" ? 1 : 0)));
}
// @lc code=end
test.Func(magicalString).tryParseMultiCases(
  `
示例 0：

输入：n = 7
输出：4
示例 1：

输入：n = 6
输出：3
解释：神奇字符串 s 的前 6 个元素是 “122112”，它包含三个 1，因此返回 3 。 
示例 2：

输入：n = 1
输出：1
`
);

export {};
