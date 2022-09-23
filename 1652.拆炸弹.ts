/*
 * @lc app=leetcode.cn id=1652 lang=typescript
 *
 * [1652] 拆炸弹
 */

// @lc code=start
function decrypt(code: number[], k: number): number[] {
  const n = Math.abs(k);
  const step = Math.round(n / k);
  const bounded = (idx: number) => (idx + code.length) % code.length;
  return code.map((_, i) => {
    let sum = 0;
    for (let j = 1; j <= n; j++) {
      sum += code[bounded(i + j * step)]!;
    }
    return sum;
  });
}
// @lc code=end
test.Func(decrypt).tryParseMultiCases(
  `
示例 1：

输入：code = [5,7,1,4], k = 3
输出：[12,10,16,13]
解释：每个数字都被接下来 3 个数字之和替换。解密后的密码为 [7+1+4, 1+4+5, 4+5+7, 5+7+1]。注意到数组是循环连接的。
示例 2：

输入：code = [1,2,3,4], k = 0
输出：[0,0,0,0]
解释：当 k 为 0 时，所有数字都被 0 替换。
示例 3：

输入：code = [2,4,9,3], k = -2
输出：[12,5,6,13]
解释：解密后的密码为 [3+9, 2+3, 4+2, 9+4] 。注意到数组是循环连接的。如果 k 是负数，那么和为 之前 的数字。
`
);
export {};
