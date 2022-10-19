/*
 * @lc app=leetcode.cn id=779 lang=typescript
 *
 * [779] 第K个语法符号
 */

// @lc code=start
function kthGrammar(n: number, k: number): number {
  return (function recursive(n: number, k: number): number {
    if (n === 1 || k === 0) {
      return 0;
    }
    const div = Math.floor(k / 2);
    const mod = k % 2;
    const sub = recursive(n - 1, div);
    return sub ^ mod;
  })(n, k - 1);
}
// @lc code=end

test.Func(kthGrammar).tryParseMultiCases(
  `
示例 1:

输入: n = 1, k = 1
输出: 0
解释: 第一行：0
示例 2:

输入: n = 2, k = 1
输出: 0
解释: 
第一行: 0 
第二行: 01
示例 3:

输入: n = 2, k = 2
输出: 1
解释:
第一行: 0
第二行: 01
`
);

export {};
