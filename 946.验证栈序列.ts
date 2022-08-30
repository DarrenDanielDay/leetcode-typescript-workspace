/*
 * @lc app=leetcode.cn id=946 lang=typescript
 *
 * [946] 验证栈序列
 */

// @lc code=start
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];
  let pushedPtr = 0,
    popedPtr = 0;
  while (pushedPtr < pushed.length || popedPtr < popped.length) {
    const popedItem = popped[popedPtr]!;
    if (stack.at(-1) === popedItem) {
      stack.pop();
      popedPtr++;
      continue;
    }
    while (pushedPtr < popped.length && pushed[pushedPtr]! !== popedItem) {
      stack.push(pushed[pushedPtr]!);
      pushedPtr++;
    }
    const matched = pushed[pushedPtr];
    if (matched != null) {
      stack.push(matched);
      pushedPtr++;
    }
    const onlyChoice = stack.pop();
    popedPtr++;
    if (onlyChoice !== popedItem) {
      return false;
    }
  }
  return pushedPtr === pushed.length && popedPtr === popped.length;
}
// @lc code=end
test.Func(validateStackSequences).withCases(
  [
    [
      [1, 2, 3, 4, 5],
      [4, 5, 3, 2, 1],
    ],
    true,
  ],
  [
    [
      [1, 2, 3, 4, 5],
      [4, 3, 5, 1, 2],
    ],
    false,
  ]
);
export {};
