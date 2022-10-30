/*
 * @lc app=leetcode.cn id=784 lang=typescript
 *
 * [784] 字母大小写全排列
 */

// @lc code=start
function letterCasePermutation(s: string): string[] {
  const chars = [...s];
  const n = s.length;
  function* combination(index: number): Generator<string> {
    if (index === n) {
      yield chars.join("");
      return;
    }
    const char = chars[index]!;
    const enumerated = new Set([char.toLocaleLowerCase(), char.toUpperCase()]);
    for (const kind of enumerated) {
      chars[index] = kind;
      yield* combination(index + 1);
    }
  }
  return [...combination(0)];
}
// @lc code=end

test.Func(letterCasePermutation)
.tryParseMultiCases(
`
示例 1：

输入：s = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]
示例 2:

输入: s = "3z4"
输出: ["3z4","3Z4"]
`
)

export {}