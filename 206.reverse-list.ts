/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 */

// @lc code=start
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }
  let node: ListNode | null = head;
  let prev: ListNode | null = null;
  while (true) {
    const next: ListNode | null = node.next;
    node.next = prev;
    prev = node;
    if (!next) {
      return node;
    }
    node = next;
  }
}
// @lc code=end

// Test code with ListNode utilities.
// The utlitity APIs for TreeNode and NestedInteger are almost the same.
test
  .Func(reverseList)
  .withCases(
    [[test.list.create([1, 2, 3, 4, 5])], test.list.compare([5, 4, 3, 2, 1])],
    [[test.list.create([1, 4, 3, 4, 5])], test.list.compare([5, 4, 3, 4, 1])]
  );

export {};
