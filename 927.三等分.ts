/*
 * @lc app=leetcode.cn id=927 lang=typescript
 *
 * [927] 三等分
 */

// @lc code=start
function threeEqualParts(arr: number[]): [number, number] {
  const ones = _.sum(arr);
  if (ones % 3) {
    return [-1, -1];
  }
  const part = ones / 3;
  if (part === 0) {
    return [0, 2];
  }
  function findPart(begin: number): [number, number] {
    let sum = 0;
    let i = begin;
    while (!sum) {
      i++;
      sum += arr[i]!;
    }
    let j = i;
    while (sum < part) {
      j++;
      sum += arr[j]!;
    }
    return [i, j];
  }
  const [b1, e1] = findPart(-1);
  const [b2, e2] = findPart(e1);
  const [b3, e3] = findPart(e2);
  const p1 = arr.slice(b1, e1);
  const p2 = arr.slice(b2, e2);
  const p3 = arr.slice(b3, e3);
  if (!_.isEqual(p1, p2) || !_.isEqual(p2, p3)) {
    return [-1, -1];
  }
  console.log(b1, e1, b2, e2, b3, e3);
  const afterZeros = arr.length - 1 - e3;
  if (afterZeros > b2 - 1 - e1 || afterZeros > b3 - 1 - e2) {
    return [-1, -1];
  }
  return [e1 + afterZeros, e2 + afterZeros + 1];
}
// @lc code=end
test.Func(threeEqualParts).tryParseMultiCases(
  `
示例 1：

输入：arr = [1,0,1,0,1]
输出：[0,3]
示例 2：

输入：arr = [1,1,0,1,1]
输出：[-1,-1]
示例 3:

输入：arr = [1,1,0,0,1]
输出：[0,2]
`
);

export {};
