/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * @lc app=leetcode.cn id=232 lang=typescript
 *
 */

// @lc code=start
class MyQueue {
  // Here is an example of using built-in data structure libraries.
  // Don't mind the tricky solution.
  // This example intends to let know that these libraries are both available in this workspace and on `leetcode` OJ.
  // @ts-ignore Leetcode does not have generic type definitions for libs, so it will cause compile error without the `// @ts-ignore` directive.
  queue = new Queue.Queue<number>();
  constructor() {}

  push(x: number): void {
    this.queue.push(x);
  }

  pop(): number {
    return this.queue.dequeue();
  }

  peek(): number {
    return this.queue.front();
  }

  empty(): boolean {
    return this.queue.isEmpty();
  }
}
// @lc code=end

// Class test code.
// You can copy most of leetcode test cases and use them like this:
test
  .Class(MyQueue)
  .invoke(["MyQueue", "push", "push", "peek", "pop", "empty"])
  // The first input is parameters of constructor.
  // Other inputs are parameters of each method.
  .withInputs([[], [1], [2], [], [], []])
  .expectResults([null, null, null, 1, 1, false])
  // You can use chain calls to perform multiple tests.
  .invoke(["MyQueue", "push", "push", "peek", "pop", "empty"])
  .withInputs([[], [1], [2], [], [], []])
  // You can also write test functions here.
  .expectResults([null, null, (x) => x == null, 1, (value) => value === 1, false]);

export {};
