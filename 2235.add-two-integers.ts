/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * @lc app=leetcode.cn id=2235 lang=typescript
 *
 */

// @lc code=start

// In this problem, you can use `lodash.add` directly.
const sum = _.add;

// @lc code=end

// Function test code.
// Each test case is a tuple with 2 elements: function arguments and expected result
// The expected result can be a predicate function.
test.Func(sum).withCases(
  // With expected value
  [[12, 5], 17],
  // With predicate function
  [
    [1, 1],
    (n) => {
      // If the judging logic is very complicated, you might need to write a huge function.
      if (n === 1 + 1) {
        return true;
      } else {
        return false;
      }
    },
  ]
);

// If you do not want the function name `sum` to be mixed into global namespace,
// you can add an empty export to tell TypeScript that this file is a module, not global script.
export {};
