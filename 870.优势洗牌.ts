/*
 * @lc app=leetcode.cn id=870 lang=typescript
 *
 * [870] 优势洗牌
 */

// @lc code=start
function advantageCount(nums1: number[], nums2: number[]): number[] {
  interface E {
    n: number;
    i: number;
  }
  const choices = [...nums1].sort((a, b) => b - a);
  const indexMapping2 = nums2.map<E>((n, i) => ({ n, i })).sort((a, b) => b.n - a.n);
  let large = 0,
    small = -1;
  const count = choices.length;
  const result: E[] = [];
  for (const { i, n } of indexMapping2) {
    const larger = choices[large]!;
    const smaller = choices[count + small]!;
    if (larger > n) {
      result.push({ i, n: larger });
      large++;
    } else {
      result.push({ i, n: smaller });
      small--;
    }
  }
  return result.sort((a, b) => a.i - b.i).map((e) => e.n);
}
// @lc code=end
