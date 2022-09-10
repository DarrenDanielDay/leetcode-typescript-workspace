/*
 * @lc app=leetcode.cn id=857 lang=typescript
 *
 * [857] 雇佣 K 名工人的最低成本
 */

// @lc code=start
function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
  interface Struct {
    q: number;
    i: number;
    w: number;
    p: number;
  }
  const infos = quality
    .map<Struct>((q, i) => {
      const w = wage[i]!;
      return {
        q,
        i,
        w,
        p: w / q,
      };
    })
    .sort((a, b) => a.p - b.p);
  const pq = new MaxPriorityQueue({
    priority: (e: Struct) => e.q,
  });
  let totalQ = 0;
  for (let i = 0; i < k - 1; i++) {
    const info = infos[i]!;
    totalQ += info.q;
    pq.enqueue(info);
  }
  function dequeue() {
    const struct = pq.dequeue();
    if ("element" in struct) {
      return struct.element;
    }
    return struct;
  }
  let minCost = Infinity;
  for (let i = k - 1; i < infos.length; i++) {
    const info = infos[i]!;
    totalQ += info.q;
    pq.enqueue(info);
    minCost = Math.min(minCost, info.p * totalQ);
    totalQ -= dequeue().q;
  }
  return minCost;
}
// @lc code=end

test.Func(mincostToHireWorkers).tryParseCases(
  `
输入： quality = [10,20,5], wage = [70,50,30], k = 2
输出： 105.00000
解释： 我们向 0 号工人支付 70，向 2 号工人支付 35。
`,
  `
输入： quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
输出： 30.66667
解释： 我们向 0 号工人支付 4，向 2 号和 3 号分别支付 13.33333。
`
);

export {};
