/*
 * @lc app=leetcode.cn id=856 lang=typescript
 *
 * [856] 括号的分数
 */

// @lc code=start
function scoreOfParentheses(s: string): number {
  let previous = ")";
  type Operate = (val: number) => number;
  const evalStack: Operate[] = [];
  let value = 0;
  const double: Operate = (n) => n * 2;
  const add =
    (current: number): Operate =>
    (n) =>
      current + n;
  const one: Operate = () => 1;
  const doubleAdd =
    (current: number): Operate =>
    (n) =>
      add(double(n))(current);
  const addOne =
    (current: number): Operate =>
    () =>
      add(current)(1);
  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;
    const next = s[i + 1];
    switch (`${previous}${char}`) {
      case "((":
        switch (next) {
          case "(":
            evalStack.push(double);
            break;
          default:
            evalStack.push(one);
        }
        break;
      case "))":
      case "()":
        value = evalStack.pop()!(value);
        break;
      case ")(":
        switch (next) {
          case "(":
            evalStack.push(doubleAdd(value));
            break;
          default:
            evalStack.push(addOne(value));
            break;
        }
        break;
    }
    previous = char;
  }
  return value;
}
// @lc code=end
test.Func(scoreOfParentheses).tryParseMultiCases(
  `
示例 1：
输入： s = "()"
输出： 1
  
示例 2：
输入： s = "(())"
输出： 2

示例 3：
输入： s = "()()"
输出： 2

示例 4：
输入： s = "(()(()))"
输出： 6
`
);

export {};
