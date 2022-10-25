/*
 * @lc app=leetcode.cn id=862 lang=typescript
 *
 * [862] 和至少为 K 的最短子数组
 */

// @lc code=start
interface DLinkNode {
  value: number;
  prev: DLinkNode | null;
  next: DLinkNode | null;
}
class Deque {
  private head: DLinkNode | null = null;
  private tail: DLinkNode | null = null;
  private size = 0;
  constructor() {}
  #die(message: string): never {
    throw new Error(message);
  }
  insertFront(value: number) {
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
  }

  insertLast(value: number) {
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
  }

  deleteFront(): void {
    if (this.isEmpty()) {
      return this.#die("Empty deque.");
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
  }

  deleteLast(): void {
    if (this.isEmpty()) {
      return this.#die("Empty deeue.");
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
  }

  getFront(): number {
    return this.head?.value ?? this.#die("Empty deque.");
  }

  getRear(): number {
    return this.tail?.value ?? this.#die("Empty deque.");
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

function shortestSubarray(nums: number[], k: number): number {
  const sums = nums.reduce<number[]>(
    (acc, cur, i) => {
      acc.push(acc[i]! + cur);
      return acc;
    },
    [0]
  );
  const n = nums.length;
  let result = Infinity;
  const queue = new Deque();
  for (let start = 0; start <= n; start++) {
    while (!queue.isEmpty()) {
      const first = queue.getFront();
      if (sums[start]! - sums[first]! >= k) {
        result = Math.min(result, start - first);
        queue.deleteFront();
      } else {
        break;
      }
    }
    while (!queue.isEmpty()) {
      const last = queue.getRear();
      if (sums[last]! >= sums[start]!) {
        queue.deleteLast();
      } else {
        break;
      }
    }
    queue.insertLast(start);
  }
  return isFinite(result) ? result : -1;
}
// @lc code=end
test.Func(shortestSubarray).tryParseMultiCases(
  `
示例 0：

输入：nums =[84,-37,32,40,95], k = 167
输出：3

示例 1：

输入：nums = [1], k = 1
输出：1
示例 2：

输入：nums = [1,2], k = 4
输出：-1
示例 3：

输入：nums = [2,-1,2], k = 3
输出：3
`
);
export {};
