/*
 * @lc app=leetcode.cn id=1790 lang=typescript
 *
 * [1790] 仅执行一次字符串交换能否使两个字符串相等
 */

// @lc code=start
function areAlmostEqual(s1: string, s2: string): boolean {
  const n = s1.length;
  const diffs: string[] = []
  for (let i = 0; i < n; i++) {
    const c1 = s1[i]!, c2 = s2[i]!;
    if (c1 !== c2) {
      diffs.push(c1, c2);
      if (diffs.length > 4) {
        return false;
      }
    }
  }
  if (diffs.length === 2) {
    return false;
  }
  if (diffs.length === 0) {
    return true;
  }
  return new Set(diffs).size === 2 && diffs[0] === diffs[3];
};
// @lc code=end

test.Func(areAlmostEqual)
.tryParseMultiCases(
`
示例 1：

输入：s1 = "bank", s2 = "kanb"
输出：true
解释：例如，交换 s2 中的第一个和最后一个字符可以得到 "bank"
示例 2：

输入：s1 = "attack", s2 = "defend"
输出：false
解释：一次字符串交换无法使两个字符串相等
示例 3：

输入：s1 = "kelb", s2 = "kelb"
输出：true
解释：两个字符串已经相等，所以不需要进行字符串交换
示例 4：

输入：s1 = "abcd", s2 = "dcba"
输出：false
`
)

export {}