/*
 * @lc app=leetcode.cn id=827 lang=typescript
 *
 * [827] 最大人工岛
 */

// @lc code=start
function largestIsland(grid: number[][]): number {
  type Point = [number, number];

  const store = grid.map((row, i) =>
    row.map((_, j) => ({
      father: [i, j] as Point,
      area: 0,
      visited: false,
    }))
  );
  const zeros = [] as Point[];
  const starts = [] as Point[];
  const offsets: Point[] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  function dfs(start: Point) {
    const [si, sj] = start;
    const startState = store[si]![sj]!;
    if (startState.visited) {
      return;
    }
    starts.push(start);
    const stack = [start];
    for (let top = stack.at(-1); top; top = stack.at(-1)) {
      const [i, j] = top;
      const state = store[i]![j]!;
      if (state.visited) {
        stack.pop();
        continue;
      }
      state.visited = true;
      state.father = start;
      startState.area++;
      for (const [di, dj] of offsets) {
        const [vi, vj] = [i + di, j + dj];
        const neighbor = grid[vi]?.[vj];
        if (neighbor) {
          // in bound and is island
          const state = store[vi]![vj]!;
          if (!state.visited) {
            stack.push([vi, vj]);
          }
        }
      }
    }
  }
  grid.forEach((row, i) => {
    row.forEach((isIsland, j) => {
      if (isIsland) {
        dfs([i, j]);
      } else {
        zeros.push([i, j]);
      }
    });
  });
  if (!starts.length) {
    return 1;
  }
  if (!zeros.length) {
    return starts.reduce((max, [i, j]) => Math.max(max, store[i]![j]!.area), -Infinity);
  }
  return zeros.reduce((max, [zi, zj]) => {
    const connectedArea =
      _.uniqBy(
        offsets
          .map(([di, dj]) => store[zi + di]?.[zj + dj]?.father)
          .filter(Boolean as unknown as <T>(a: T) => a is NonNullable<T>),
        ([i, j]) => `${i}.${j}`
      ).reduce((sum, father) => {
        return sum + (father ? store[father[0]]![father[1]]!.area : 0);
      }, 0) + 1;
    return Math.max(max, connectedArea);
  }, 1);
}
// @lc code=end
test.Func(largestIsland).tryParseMultiCases(
  `
示例 1:

输入: grid = [[1, 0], [0, 1]]
输出: 3
解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。

  
示例 2:

输入: grid = [[1, 1], [1, 0]]
输出: 4
解释: 将一格0变成1，岛屿的面积扩大为 4。

示例 3:
  
输入: grid = [[1, 1], [1, 1]]
输出: 4
解释: 没有0可以让我们变成1，面积依然为 4。
`
);
export {};
