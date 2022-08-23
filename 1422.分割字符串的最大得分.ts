/*
 * @lc app=leetcode.cn id=1422 lang=typescript
 *
 * [1422] 分割字符串的最大得分
 */

// @lc code=start
function maxScore(s: string): number {
  const chars = [...s];
  const leftSum = chars.reduce<number[]>((arr, char, i) => {
    arr.push((arr[i - 1] ?? 0) + +(char === "0"));
    return arr;
  }, []);
  const rightSum = chars
    .reverse()
    .reduce<number[]>((arr, char, i) => {
      arr.push((arr[i - 1] ?? 0) + +(char === "1"));
      return arr;
    }, [])
    .reverse();
  let max = -Infinity;
  for (let i = 0; i < s.length; i++) {
    if (i < s.length - 1) {
      max = Math.max(max, leftSum[i]! + rightSum[i + 1]!);
    }
  }
  return max;
}
// @lc code=end
test.Func(maxScore).withCases([["011101"], 5]);
export {};
