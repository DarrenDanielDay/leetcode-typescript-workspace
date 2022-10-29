/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const toBigInt = (node: ListNode | null) => {
    const buf: string[] = [];
    while (node) {
      buf.push(node.val.toString());
      node = node.next;
    }
    return BigInt(buf.reverse().join(""));
  };
  const toList = (n: bigint) => {
    const str = n.toString();
    let node: ListNode | null = null;
    for (let i = 0; i < str.length; i++) {
      const newNode = new ListNode(+str[i]!);
      newNode.next = node;
      node = newNode;
    }
    return node ?? new ListNode(0);
  };
  return toList(toBigInt(l1) + toBigInt(l2));
}
// @lc code=end

test.Func(addTwoNumbers).tryParseMultiCases(
  `
示例 1：

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
示例 2：

输入：l1 = [0], l2 = [0]
输出：[0]
示例 3：

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
`
);

export {};
