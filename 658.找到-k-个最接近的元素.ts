/*
 * @lc app=leetcode.cn id=658 lang=typescript
 *
 * [658] 找到 K 个最接近的元素
 */

// @lc code=start
function findClosestElements(arr: number[], k: number, x: number): number[] {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const item = arr[mid]!;
    if (item >= x) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  [left, right] = [left - 1, left];
  while (k--) {
    if (left < 0) {
      right++;
    } else if (right >= arr.length || x - arr[left]! <= arr[right]! - x) {
      left--;
    } else {
      right++;
    }
  }
  return arr.slice(left + 1, right);
}
// @lc code=end
test.Func(findClosestElements).withCases(
  [
    [[1, 2, 3, 4, 5], 4, 3],
    [1, 2, 3, 4],
  ],
  [
    [[1, 2, 3, 4, 5], 4, -1],
    [1, 2, 3, 4],
  ]
);

export {};
