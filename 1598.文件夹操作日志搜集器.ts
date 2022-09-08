/*
 * @lc app=leetcode.cn id=1598 lang=typescript
 *
 * [1598] 文件夹操作日志搜集器
 */

// @lc code=start
function minOperations(logs: string[]): number {
  let level = 0;
  for (const log of logs) {
    if (log[0] !== ".") {
      level++;
      continue;
    }
    if (log[1] === ".") {
      level = Math.max(0, level - 1);
    }
  }
  return level;
}
// @lc code=end
test.Func(minOperations).tryParseCases(
  `
输入：logs = ["d1/","d2/","../","d21/","./"]
输出：2
解释：执行 "../" 操作变更文件夹 2 次，即可回到主文件夹
`,
  `
输入：logs = ["d1/","d2/","./","d3/","../","d31/"]
输出：3
`,
  `
输入：logs = ["d1/","../","../","../"]
输出：0
`
);
export {};
