/*
 * @lc app=leetcode.cn id=1450 lang=typescript
 *
 * [1450] 在既定时间做作业的学生人数
 */

// @lc code=start
function busyStudent(startTime: number[], endTime: number[], queryTime: number): number {
  return startTime.reduce((sum, start, i) => {
    const end = endTime[i]!;
    return sum + +(start <= queryTime && queryTime <= end);
  }, 0);
}
// @lc code=end
test.Func(busyStudent).withCases(
  [[[1,2,3], [3,2,7], 4], 1]
)
export {}