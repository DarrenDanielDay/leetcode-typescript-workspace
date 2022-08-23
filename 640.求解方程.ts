/*
 * @lc app=leetcode.cn id=640 lang=typescript
 *
 * [640] 求解方程
 */

// @lc code=start
function solveEquation(equation: string): string {
  const constants = (exp: string) => eval(exp.replace(/[+-]?\d*x/g, "") || "0");
  const coe = (exp: string) =>
    eval(exp.replace(/([+-]?)(\d*)x?/g, (s, sign, c) => (s.includes("x") ? (sign || "+") + (c || "1") : "+0")) || "0");
  const [left, right] = equation.split("=");
  const b = constants(right!) - constants(left!);
  const k = coe(left!) - coe(right!);
  if (k === 0) {
    if (b === 0) {
      return "Infinite solutions";
    } else {
      return "No solution";
    }
  }
  return `x=${b / k}`;
}
// @lc code=end
test
  .Func(solveEquation)
  .withCases([["x+5-3+x=6+x-2"], "x=2"], [["x=x"], "Infinite solutions"], [["0=1"], "No solution"]);
export {};
