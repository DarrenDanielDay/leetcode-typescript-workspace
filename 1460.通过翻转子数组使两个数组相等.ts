/*
 * @lc app=leetcode.cn id=1460 lang=typescript
 *
 * [1460] 通过翻转子数组使两个数组相等
 */

// @lc code=start
function canBeEqual(target: number[], arr: number[]): boolean {
  target.sort();
  arr.sort();
  return target.every((n, i) => arr[i] === n);
}
// @lc code=end
test.Func(canBeEqual).withCases(
  [
    [
      [1, 2, 3, 4],
      [2, 4, 1, 3],
    ],
    true,
  ],
  [
    [
      [3, 7, 9],
      [3, 7, 11],
    ],
    false,
  ]
);

export {};
