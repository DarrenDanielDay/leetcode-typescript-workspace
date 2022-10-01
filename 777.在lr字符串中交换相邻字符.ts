/*
 * @lc app=leetcode.cn id=777 lang=typescript
 *
 * [777] 在LR字符串中交换相邻字符
 */

// @lc code=start
function canTransform(start: string, end: string): boolean {
  if (start.length !== end.length) {
    return false;
  }
  const filteredStart = [...start].filter((char) => char !== "X").join("");
  const filteredEnd = [...end].filter((char) => char !== "X").join("");
  if (filteredStart !== filteredEnd) {
    return false;
  }
  const n = start.length;
  const lastIndex = n - 1;
  let leftCount = 0;
  let rightCount = 0;

  for (let i = 0; i < n; i++) {
    const startIter = start[i],
      endIter = end[i],
      startReverseIter = start[lastIndex - i],
      endReverseIter = end[lastIndex - i];
    if (startIter === "L") {
      leftCount++;
    }
    if (endIter === "L") {
      leftCount--;
    }
    if (startReverseIter === "R") {
      rightCount++;
    }
    if (endReverseIter === "R") {
      rightCount--;
    }
    if (leftCount > 0 || rightCount > 0) {
      return false;
    }
  }
  return true;
}
// @lc code=end

test.Func(canTransform).tryParseCases(
  `
输入: start = "RXXLRXRXL", end = "XRLXXRRLX"
输出: true
解释:
我们可以通过以下几步将start转换成end:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX
`,
  `
输入: start = "LXXLXRLXXL", end = "XLLXRXLXLX"
输出: false
`
);

export {};
