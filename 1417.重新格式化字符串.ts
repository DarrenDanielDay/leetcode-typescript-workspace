/*
 * @lc app=leetcode.cn id=1417 lang=typescript
 *
 * [1417] 重新格式化字符串
 */

// @lc code=start
function reformat(s: string): string {
  const chars: string[] = [];
  const nums: string[] = [];
  for (const c of s) {
    if ("0" <= c && c <= "9") {
      nums.push(c);
    } else {
      chars.push(c);
    }
  }
  if (Math.abs(chars.length - nums.length) > 1) {
    return "";
  }
  const [leading, following] = chars.length < nums.length ? [nums, chars] : [chars, nums];
  const flag = chars.length !== nums.length;
  return leading
    .flatMap((c, i) => {
      if (i === 0 && flag) {
        return [c];
      }
      return [following[i - +flag], c];
    })
    .join("");
}
// @lc code=end

test.Func(reformat).withCases(
  [["a"], "a"],
  [
    ["covid2019"],
    (s) => {
      let lastType = null;
      for (const char of s) {
        const currentType = "0" <= char && char <= "9";
        if (currentType === lastType) {
          return false;
        }
        lastType = currentType;
      }
      return true;
    },
  ]
);
export {};
