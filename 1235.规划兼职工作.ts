/*
 * @lc app=leetcode.cn id=1235 lang=typescript
 *
 * [1235] 规划兼职工作
 */

// @lc code=start
function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const n = startTime.length;
  const jobs = Array.from({length: n}, (_, i): [number, number, number] => [startTime[i]!, endTime[i]!, profit[i]!]);
  jobs.sort((a, b) => a[1] - b[1]);
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
      const k = binarySearch(jobs, i - 1, jobs[i - 1]![0]);
      dp[i] = Math.max(dp[i - 1], dp[k] + jobs[i - 1]![2]);
  }
  return dp[n];
};


const binarySearch = (jobs: [number, number, number][], right: number, target: number) => {
  let left = 0;
  while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (jobs[mid]![1]! > target) {
          right = mid;
      } else {
          left = mid + 1;
      }
  }
  return left;
};
// @lc code=end
test.Func(jobScheduling)
.tryParseMultiCases(
`
示例 1：



输入：startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
输出：120
解释：
我们选出第 1 份和第 4 份工作， 
时间范围是 [1-3]+[3-6]，共获得报酬 120 = 50 + 70。
示例 2：



输入：startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
输出：150
解释：
我们选择第 1，4，5 份工作。 
共获得报酬 150 = 20 + 70 + 60。
示例 3：



输入：startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
输出：6
`
)
export {}

