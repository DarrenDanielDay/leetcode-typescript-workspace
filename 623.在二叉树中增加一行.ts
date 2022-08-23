/*
 * @lc app=leetcode.cn id=623 lang=typescript
 *
 * [623] 在二叉树中增加一行
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

function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
  if (!root) {
    throw new Error();
  }
  if (depth === 1) {
    return new TreeNode(val, root, null);
  }
  (function dfs(node: TreeNode, level: number) {
    const { left, right } = node;
    if (level < depth - 1) {
      if (left) {
        dfs(left, level + 1);
      }
      if (right) {
        dfs(right, level + 1);
      }
    } else {
      node.left = new TreeNode(val, left, null);
      node.right = new TreeNode(val, null, right);
    }
  })(root, 1);
  return root;
}
// @lc code=end
test
  .Func(addOneRow)
  .withCases(
    [[test.tree.create([4, 2, 6, 3, 1, 5]), 1, 2], test.tree.compare([4, 1, 1, 2, null, null, 6, 3, 1, 5])],
    [[test.tree.create([4, 2, null, 3, 1]), 1, 3], test.tree.compare([4, 2, null, 1, 1, 3, null, null, 1])]
  );
export {};
