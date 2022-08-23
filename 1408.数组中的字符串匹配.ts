/*
 * @lc app=leetcode.cn id=1408 lang=typescript
 *
 * [1408] 数组中的字符串匹配
 */

// @lc code=start
function stringMatching(words: string[]): string[] {
  return words.filter((word) => words.some((w) => w.length > word.length && w.includes(word)));
}
// @lc code=end
function compare(expected: string[]) {
  return function (actual: string[]) {
    const a = new Set(expected);
    const b = new Set(actual);
    return _.isEqual(a, b);
  };
}
test
  .Func(stringMatching)
  .withCases(
    [[["mass", "as", "hero", "superhero"]], compare(["as", "hero"])],
    [[["leetcode", "et", "code"]], compare(["et", "code"])],
    [[["blue", "green", "bu"]], compare([])]
  );
export {};
