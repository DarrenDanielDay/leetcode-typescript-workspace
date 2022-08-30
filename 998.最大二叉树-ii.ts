/*
 * @lc app=leetcode.cn id=998 lang=typescript
 *
 * [998] 最大二叉树 II
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

function insertIntoMaxTree(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    return new TreeNode(val);
  }
  if (root.val < val) {
    return new TreeNode(val, root);
  }
  let parent = root;
  for (let current = parent.right; current; parent = current, current = parent.right) {
    if (current.val < val) {
      break;
    }
  }
  parent.right = new TreeNode(val, parent.right);
  return root;
}
// @lc code=end
test
  .Func(insertIntoMaxTree)
  .withCases(
    [[test.tree.create([4, 1, 3, null, null, 2]), 5], test.tree.compare([5, 4, null, 1, 3, null, null, 2])],
    [[test.tree.create([5, 2, 4, null, 1]), 3], test.tree.compare([5, 2, 4, null, 1, null, 3])],
    [[test.tree.create([5, 2, 3, null, 1]), 4], test.tree.compare([5, 2, 4, null, 1, 3])]
  );
export {};
