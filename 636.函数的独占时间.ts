/*
 * @lc app=leetcode.cn id=636 lang=typescript
 *
 * [636] 函数的独占时间
 */

// @lc code=start
function exclusiveTime(n: number, logs: string[]): number[] {
  const parseLog = (log: string) => {
    const [id, type, time] = log.split(":");
    const v = type === "start";
    return {
      id: +id!,
      type: v,
      time: +time! + +!v,
    };
  };
  const parsedLogs = logs.map(parseLog);
  const result = Array.from({ length: n }, () => 0);
  const stack: ReturnType<typeof parseLog>[] = [];
  for (const log of parsedLogs) {
    const top = stack[stack.length - 1];
    if (log.type) {
      if (top) {
        result[top.id] += log.time - top.time;
      }
      stack.push(log);
    } else {
      result[log!.id] += log!.time - top!.time;
      stack.pop();
      const newTop = stack[stack.length - 1];
      if (newTop) {
        newTop.time = log!.time;
      }
    }
  }
  return result;
}
// @lc code=end
test.Func(exclusiveTime).withCases(
  [
    [2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]],
    [3, 4],
  ],
  [[1, ["0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"]], [8]],
  [
    [2, ["0:start:0", "0:start:2", "0:end:5", "1:start:6", "1:end:6", "0:end:7"]],
    [7, 1],
  ]
);
export {};
