/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * @lc app=leetcode.cn id=226 lang=typescript
 *
 */

// @lc code=start
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }
  const { left, right } = root;
  root.left = invertTree(right);
  root.right = invertTree(left);
  return root;
}
// @lc code=end

// Test code with TreeNode utilities.
// The utlitity APIs for ListNode and NestedInteger are almost the same.
test
  .Func(invertTree)
  .withCases(
    [[test.tree.create([4, 2, 7, 1, 3, 6, 9])], test.tree.compare([4, 7, 2, 9, 6, 3, 1])],
    [[test.tree.create([2, 1, 3])], test.tree.compare([2, 3, 1])]
  );

export {};
