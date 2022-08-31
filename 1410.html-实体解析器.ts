/*
 * @lc app=leetcode.cn id=1410 lang=typescript
 *
 * [1410] HTML 实体解析器
 */

// @lc code=start
function entityParser(text: string): string {
  const mapping: Record<string, string | undefined> = {
    quot: `"`,
    apos: `'`,
    amp: `&`,
    gt: `>`,
    lt: `<`,
    frasl: `/`,
  };
  return text.replace(/&([^&]*?);/g, (all, tag) => mapping[tag] || all);
}
// @lc code=end
test.Func(entityParser).tryParseCases(
  `输入：text = "&amp; is an HTML entity but &ambassador; is not."
输出："& is an HTML entity but &ambassador; is not."
`,
  `
输入：text = "and I quote: &quot;...&quot;"
输出："and I quote: \\"...\\""
`,
  `
输入：text = "x &gt; y &amp;&amp; x &lt; y is always false"
输出："x > y && x < y is always false"
`,
  `
输入：text = "Stay home! Practice on Leetcode :)"
输出："Stay home! Practice on Leetcode :)"
`,
  `
输入：text = "leetcode.com&frasl;problemset&frasl;all"
输出："leetcode.com/problemset/all"
`
);
export {};
