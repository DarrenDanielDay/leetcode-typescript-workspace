/*
 * @lc app=leetcode.cn id=817 lang=typescript
 *
 * [817] 链表组件
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function numComponents(head: ListNode | null, nums: number[]): number {
  const numSet = new Set(nums);
  let inComponent = false;
  let count = 0;
  for (let node = head; node; node = node.next) {
    const { val } = node;
    if (numSet.has(val)) {
      if (!inComponent) {
        inComponent = true;
        count++;
      } else {
      }
    } else {
      inComponent = false;
    }
  }
  return count;
}
// @lc code=end
test.Func(numComponents).tryParseMultiCases(
  `
示例 1：



输入: head = [0,1,2,3], nums = [0,1,3]
输出: 2
解释: 链表中,0 和 1 是相连接的，且 nums 中不包含 2，所以 [0, 1] 是 nums 的一个组件，同理 [3] 也是一个组件，故返回 2。
示例 2：

 

输入: head = [0,1,2,3,4], nums = [0,3,1,4]
输出: 2
解释: 链表中，0 和 1 是相连接的，3 和 4 是相连接的，所以 [0, 1] 和 [3, 4] 是两个组件，故返回 2。
`
);

export {};
