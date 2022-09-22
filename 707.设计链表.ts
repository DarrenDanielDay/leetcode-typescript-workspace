/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */

// @lc code=start
class MyLinkedList {
  list: number[] = [];
  constructor() {}

  get(index: number): number {
    return this.list[index] ?? -1;
  }

  addAtHead(val: number): void {
    this.list.unshift(val);
  }

  addAtTail(val: number): void {
    this.list.push(val);
  }

  addAtIndex(index: number, val: number): void {
    if (index < this.list.length) {
      this.list = [...this.list.slice(0, index), val, ...this.list.slice(index)];
    }
    if (index === this.list.length) {
      this.addAtTail(val);
    }
  }

  deleteAtIndex(index: number): void {
    if (0 <= index && index < this.list.length) {
      this.list.splice(index, 1);
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end
test
  .Class(MyLinkedList)
  .invoke(["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"])
  .withInputs([[], [1], [3], [1, 2], [1], [1], [1]])
  .expectResults([null, null, null, null, 2, null, 3]);
export {};
