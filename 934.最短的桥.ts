/*
 * @lc app=leetcode.cn id=934 lang=typescript
 *
 * [934] 最短的桥
 */

// @lc code=start
function shortestBridge(grid: number[][]): number {
  const visited = grid.map((row) => row.map(() => false));
  let id = 0;
  const n = grid.length;
  const m = grid[0]!.length;
  const offsets: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const inRange = (i: number, j: number) => 0 <= i && i < n && 0 <= j && j < m;
  const blocks: [number, number, number][] = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]!;
    for (let j = 0; j < row.length; j++) {
      if (visited[i]![j]) {
        continue;
      }
      const block = row[j]!;
      if (!block) {
        continue;
      }
      id++;
      (function dfs(i, j) {
        if (visited[i]![j]) {
          return;
        }
        const block = grid[i]![j];
        if (!block) {
          return;
        }
        if (id === 1) {
          blocks.push([i, j, 0]);
        }
        visited[i]![j] = true;
        grid[i]![j] = id;
        for (const [di, dj] of offsets) {
          const x = i + di,
            y = j + dj;
          if (inRange(x, y)) {
            dfs(x, y);
          }
        }
      })(i, j);
    }
  }
  if (id !== 2) {
    throw new Error("Impossible");
  }
  for (let i = 0; i < visited.length; i++) {
    const row = visited[i]!;
    for (let j = 0; j < row.length; j++) {
      row[j] = false;
    }
  }
  const queue = new Queue.Queue([] as [number, number, number][]);
  for (const block of blocks) {
    queue.enqueue(block);
    const [x, y] = block;
    visited[x]![y] = true;
  }
  let minDis = Infinity;
  while (!queue.isEmpty()) {
    const [i, j, distance] = queue.dequeue();
    for (const [di, dj] of offsets) {
      const x = i + di,
        y = j + dj;
      if (inRange(x, y)) {
        if (visited[x]![y]!) {
          continue;
        }
        visited[x]![y] = true;
        const blockId = grid[x]![y]!;
        if (blockId === 2) {
          minDis = Math.min(minDis, distance);
        }
        queue.enqueue([x, y, distance + +(blockId !== 1)]);
      }
    }
  }
  return minDis;
}
// @lc code=end
test.Func(shortestBridge).tryParseMultiCases(
  `
示例 0：

输入：grid = [[0,1,0,0,0],[0,1,0,1,1],[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0]]
输出：1

示例 1：

输入：grid = [[0,1],[1,0]]
输出：1

示例 2：
输入：grid = [[0,1,0],[0,0,0],[0,0,1]]
输出：2
示例 3：

输入：grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
输出：1
`
);

export {};
