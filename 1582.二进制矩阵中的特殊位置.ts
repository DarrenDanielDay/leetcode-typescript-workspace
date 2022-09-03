/*
 * @lc app=leetcode.cn id=1582 lang=typescript
 *
 * [1582] 二进制矩阵中的特殊位置
 */

// @lc code=start
function numSpecial(mat: number[][]): number {
  const visitedRows = new Set<number>();
  const visitedCols = new Set<number>();
  let sum = 0;
  for (const [i, row] of mat.entries()) {
    if (visitedRows.has(i)) {
      continue;
    }
    for (const [j, flag] of row.entries()) {
      if (visitedCols.has(j)) {
        continue;
      }
      if (flag) {
        visitedRows.add(i);
        visitedCols.add(j);
        if (
          (() => {
            for (let c = 0; c < row.length; c++) {
              if (c !== j && row[c]) {
                return false;
              }
            }
            for (let r = 0; r < mat.length; r++) {
              if (r !== i && mat[r]![j]) {
                return false;
              }
            }
            return true;
          })()
        ) {
          sum++;
        }
      }
    }
  }
  return sum;
}
// @lc code=end

test.Func(numSpecial).tryParseCases(
  `
输入：mat = [[1,0,0],[0,0,1],[1,0,0]]
输出：1
解释：(1,2) 是一个特殊位置，因为 mat[1][2] == 1 且所处的行和列上所有其他元素都是 0
`,
  `
输入：mat = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
解释：(0,0), (1,1) 和 (2,2) 都是特殊位置
`,
  `
输入：mat = [[0,0,0,1],[1,0,0,0],[0,1,1,0],[0,0,0,0]]
输出：2
`,
  `
输入：mat = [[0,0,0,0,0],[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]
输出：3
`
);

export {};
