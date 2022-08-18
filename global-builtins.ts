/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TypeScript treats this file as a global script. Do not add any import or export statement.

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

class NestedInteger {
  private integer: number | null;
  private list: NestedInteger[] = [];
  constructor(value?: number) {
    this.integer = value ?? null;
  }

  isInteger(): boolean {
    return this.integer !== null;
  }

  getInteger(): number | null {
    return this.integer;
  }

  setInteger(value: number) {
    this.integer = value;
  }

  add(elem: NestedInteger) {
    this.list.push(elem);
    this.integer = null;
  }

  getList(): NestedInteger[] {
    return this.list;
  }
}

// Inject into global context.
Object.assign(globalThis, {
  TreeNode,
  ListNode,
  NestedInteger,
});
