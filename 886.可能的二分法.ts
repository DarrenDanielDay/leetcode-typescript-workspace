/*
 * @lc app=leetcode.cn id=886 lang=typescript
 *
 * [886] 可能的二分法
 */

// @lc code=start
function possibleBipartition(n: number, dislikes: [number, number][]): boolean {
  const dislikeGroup = Array.from({ length: n + 1 }, () => new Set<number>());
  const likeGroup = Array.from({ length: n + 1 }, () => new Set<number>());
  for (const [a, b] of dislikes) {
    const ad = dislikeGroup[a]!;
    const bd = dislikeGroup[b]!;
    const al = likeGroup[a]!;
    const bl = likeGroup[b]!;
    ad.add(b);
    bd.add(a);
    al.add(a);
    bl.add(b);
    // merge ad & bl
    if (ad !== bl) {
      const smaller = ad.size < bl.size ? ad : bl;
      const greater = smaller === bl ? ad : bl;
      for (const e of smaller) {
        greater.add(e);
      }
      dislikeGroup[a] = likeGroup[b] = greater;
    }
    // merge al & bd
    if (al !== bd) {
      const smaller = al.size < bd.size ? al : bd;
      const greater = smaller === bd ? al : bd;
      for (const e of smaller) {
        greater.add(e);
      }
      likeGroup[a] = dislikeGroup[b] = greater;
    }
    if (bl.has(a) || al.has(b)) {
      return false;
    }
  }
  return true;
}
// @lc code=end
test.Func(possibleBipartition).tryParseMultiCases(
  `
示例 1：

输入：n = 4, dislikes = [[1,2],[1,3],[2,4]]
输出：true
解释：group1 [1,4], group2 [2,3]
示例 2：

输入：n = 3, dislikes = [[1,2],[1,3],[2,3]]
输出：false
示例 3：

输入：n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
输出：false
`
);
export {};
