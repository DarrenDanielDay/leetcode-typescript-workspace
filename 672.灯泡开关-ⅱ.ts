/*
 * @lc app=leetcode.cn id=672 lang=typescript
 *
 * [672] 灯泡开关 Ⅱ
 */

// @lc code=start
function flipLights(n: number, presses: number): number {
  const state1 = 0b0000;
  const state2 = 0b0110;
  const state3 = 0b1010;
  const state4 = 0b0101;
  const state5 = 0b1001;
  const state6 = 0b0011;
  const state7 = 0b1100;
  const state8 = 0b1111;
  const zeroStep = [state1];
  const oneStep = [state3, state4, state5, state8];
  const twoStep = [state1, state2, state3, state4, state6, state7, state8];
  const threeStep = [state1, state2, state6, state7];
  const allStates =
    presses >= 3 ? [...threeStep, ...oneStep] : presses === 2 ? twoStep : presses === 1 ? oneStep : zeroStep;
  const mask = (1 << n) - 1;
  return new Set(allStates.map((s) => s & mask)).size;
}
// @lc code=end
test.Func(flipLights).tryParseMultiCases(
  `
示例 1：

输入：n = 1, presses = 1
输出：2
解释：状态可以是：
- 按压开关 1 ，[关]
- 按压开关 2 ，[开]
示例 2：

输入：n = 2, presses = 1
输出：3
解释：状态可以是：
- 按压开关 1 ，[关, 关]
- 按压开关 2 ，[开, 关]
- 按压开关 3 ，[关, 开]
示例 3：

输入：n = 3, presses = 1
输出：4
解释：状态可以是：
- 按压开关 1 ，[关, 关, 关]
- 按压开关 2 ，[关, 开, 关]
- 按压开关 3 ，[开, 关, 开]
- 按压开关 4 ，[关, 开, 开]

示例 4：

输入：n = 2, presses = 2
输出：4
`
);
export {};
