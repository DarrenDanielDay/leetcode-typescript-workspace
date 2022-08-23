/*
 * @lc app=leetcode.cn id=641 lang=typescript
 *
 * [641] 设计循环双端队列
 */

// @lc code=start
interface DLinkNode {
  value: number;
  prev: DLinkNode | null;
  next: DLinkNode | null;
}
class MyCircularDeque {
  private head: DLinkNode | null = null;
  private tail: DLinkNode | null = null;
  private size = 0;
  constructor(private readonly capacity: number) {}

  insertFront(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    const newNode: DLinkNode = {
      next: this.head,
      prev: null,
      value,
    };
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.head!.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    const newNode: DLinkNode = {
      next: null,
      prev: this.tail,
      value,
    };
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return true;
  }

  deleteFront(): boolean {
    if (this.isEmpty()) {
      return false;
    }
    const { next } = this.head!;
    if (next) {
      next.prev = null;
    }
    this.head = next;
    this.size--;
    if (this.isEmpty()) {
      this.head = this.tail = null;
    }
    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) {
      return false;
    }
    const { prev } = this.tail!;
    if (prev) {
      prev.next = null;
    }
    this.tail = prev;
    this.size--;
    if (this.isEmpty()) {
      this.head = this.tail = null;
    }
    return true;
  }

  getFront(): number {
    return this.head?.value ?? -1;
  }

  getRear(): number {
    return this.tail?.value ?? -1;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size >= this.capacity;
  }
}

// @lc code=end

[[3], [1], [2], [3], [4], [], [], [], [4], []];

test
  .Class(MyCircularDeque)
  .invoke([
    "MyCircularDeque",
    "insertLast",
    "insertLast",
    "insertFront",
    "insertFront",
    "getRear",
    "isFull",
    "deleteLast",
    "insertFront",
    "getFront",
  ])
  .withInputs([[3], [1], [2], [3], [4], [], [], [], [4], []])
  .expectResults([null, true, true, true, false, 2, true, true, true, 4]);

export {};
