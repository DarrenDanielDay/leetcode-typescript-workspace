/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * @lc app=leetcode.cn id=341 lang=typescript
 *
 */

// @lc code=start

class NestedIterator {
  private generator: Generator<number>;
  private memo: number | null = null;
  constructor(nestedList: NestedInteger[]) {
    this.generator = (function* dfs(list: NestedInteger[]): Generator<number> {
      for (const item of list) {
        const integer = item.getInteger();
        if (integer != null) {
          yield integer;
        } else {
          yield* dfs(item.getList());
        }
      }
    })(nestedList);
  }

  hasNext(): boolean {
    if (this.memo != null) {
      return true;
    }
    return this.moveNext();
  }

  next(): number {
    if (this.memo != null) {
      const result = this.memo;
      this.memo = null;
      return result;
    }
    this.moveNext();
    if (this.memo == null) {
      throw new Error("Iteration endend");
    }
    return this.memo;
  }

  private moveNext(): boolean {
    const iteration = this.generator.next();
    if (iteration.done) {
      return false;
    }
    this.memo = iteration.value;
    return true;
  }
}

// @lc code=end

// Test code with NestedInteger utilities.
// The utlitity APIs for ListNode and TreeNode are almost the same.
test
  .Class(NestedIterator)
  .invoke(["NestedIterator", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"])
  // Use `test.nested.create` to create NestedIterator[].
  .withInputs([[test.nested.create([1, [4, [6]]])], [], [], [], [], [], [], []])
  .expectResults([null, true, 1, true, 4, true, 6, false]);

export {};
