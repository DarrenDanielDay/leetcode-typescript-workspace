/*
 * @lc app=leetcode.cn id=793 lang=typescript
 *
 * [793] 阶乘函数后 K 个零
 */

// @lc code=start
function preimageSizeFZF(k: number): number {
  if (k < 0) {
    return 0;
  }
  if (k === 0) {
    return 5;
  }
  function f(x: number) {
    let result = 0;
    while (x) {
      x = Math.floor(x / 5);
      result += x;
    }
    return result;
  }
  let left = 0;
  let right = 5 * k;
  while (right - left > 1) {
    const mid = Math.floor((right + left) / 2);
    const value = f(mid);
    if (value === k) {
      return 5;
    }
    if (value > k) {
      right = mid;
    } else {
      left = mid;
    }
  }
  if (f(left) === k || f(right) === k) {
    return 5;
  }
  return 0;
}
// @lc code=end
test.Func(preimageSizeFZF).withCases([[0], 5], [[5], 0], [[3], 5]);
export {};
