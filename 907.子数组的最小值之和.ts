/*
 * @lc app=leetcode.cn id=907 lang=typescript
 *
 * [907] 子数组的最小值之和
 */

// @lc code=start
function sumSubarrayMins(arr: number[]): number {
  const n = arr.length;
  const m = 1e9 + 7;
  const mod = (n: number) => n % m;
  const findFirstSmallers = (arr: number[], op: (a: number, b: number) => boolean) => {
    const result: number[] = [];
    const stack: number[] = [-1];
    for (const [i, n] of arr.entries()) {
      while (op(n, arr[stack.at(-1)!] ?? -Infinity)) stack.pop();
      result.push(stack.at(-1)!);
      stack.push(i);
    }
    return result;
  };
  const left = findFirstSmallers(arr, (a, b) => a <= b);
  const right = findFirstSmallers([...arr].reverse(), (a, b) => a < b)
    .reverse()
    .map((x) => n - 1 - x);
  return _.zip(left, right).reduce((acc, [l, r], i) => {
    return mod(acc + arr[i]! * (i - l!) * (r! - i));
  }, 0);
}
// @lc code=end

test.Func(sumSubarrayMins).tryParseMultiCases(
  `
示例 1：

输入：arr = [3,1,2,4]
输出：17
解释：
子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。 
最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
示例 2：

输入：arr = [11,81,94,43,3]
输出：444
`
);

export {};
