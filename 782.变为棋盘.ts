/*
 * @lc app=leetcode.cn id=782 lang=typescript
 *
 * [782] 变为棋盘
 */

// @lc code=start
function movesToChessboard(board: number[][]): number {
  const row = board[0]!;
  const col = board.map((row) => row[0]!);
  let checked = false;
  function countOps(seedLine: number[], lines: Iterable<Iterable<number>>): number {
    let zeroes = 0,
      ones = 0;
    for (let i = 0; i < seedLine.length; i++) {
      const num = seedLine[i]!;
      if (num) {
        ones++;
      } else {
        zeroes++;
      }
    }
    if (Math.abs(ones - zeroes) > 1) {
      return -1;
    }
    if (!checked) {
      checked = true;
      for (const line of lines) {
        let i = 0;
        let matcher: number | null = null;
        for (const grid of line) {
          const maching = seedLine[i]!;
          if (matcher === null) {
            matcher = grid ^ maching;
          }
          if (matcher === (grid ^ maching)) {
            i++;
            continue;
          }
          return -1;
        }
      }
    }
    if (zeroes === ones) {
      const possible = seedLine.reduce((sum, grid, i) => sum + (grid ^ (i & 1)), 0);
      return Math.min(possible, seedLine.length - possible) / 2;
    } else {
      const main = +(ones > zeroes);
      return seedLine.reduce((sum, grid, i) => sum + ((i & 1) ^ main ^ grid), 0) / 2;
    }
  }
  const r1 = countOps(
    row,
    (function* () {
      for (let i = 1; i < board.length; i++) {
        yield board[i]!;
      }
    })()
  );
  if (r1 === -1) {
    return -1;
  }
  const r2 = countOps(
    col,
    (function* () {
      for (let i = 1; i < row.length; i++) {
        yield (function* () {
          for (let j = 0; j < col.length; j++) {
            yield board[i]![j]!;
          }
        })();
      }
    })()
  );
  if (r2 === -1) {
    return -1;
  }
  return r1 + r2;
}
// @lc code=end
test.Func(movesToChessboard).withCases(
  [
    [
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ],
    ],
    2,
  ],
  [
    [
      [
        [0, 1],
        [1, 0],
      ],
    ],
    0,
  ],
  [
    [
      [
        [1, 0],
        [1, 0],
      ],
    ],
    -1,
  ]
);
export {};
