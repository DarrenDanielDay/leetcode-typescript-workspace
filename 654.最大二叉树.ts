/*
 * @lc app=leetcode.cn id=654 lang=typescript
 *
 * [654] 最大二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const mapping = nums
    .map((num, i) => ({
      num,
      i,
    }))
    .sort((a, b) => b.num - a.num)
    .map((v, order) => ({ ...v, order }));
  const first = mapping[0];
  if (!first) {
    return null;
  }
  const root = new TreeNode(first.num);
  const map = new Map([[root, first]]);
  for (let mappingIndex = 1; mappingIndex < mapping.length; mappingIndex++) {
    const info = mapping[mappingIndex]!;
    const newNode = new TreeNode(info.num);
    map.set(newNode, info);
    let node: TreeNode | null = root;
    let parent: TreeNode = root;
    const index = info.i;
    while (node) {
      parent = node;
      const { i } = map.get(node)!;
      if (index < i) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    const parentIndex = map.get(parent)!.i;
    if (parentIndex < index) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
  }
  return root;
}
// @lc code=end
test
  .Func(constructMaximumBinaryTree)
  .withCases(
    [[[3, 2, 1, 6, 0, 5]], test.tree.compare([6, 3, 5, null, 2, 0, null, null, 1])],
    [[[3, 2, 1]], test.tree.compare([3, null, 2, null, 1])]
  );

export {};
