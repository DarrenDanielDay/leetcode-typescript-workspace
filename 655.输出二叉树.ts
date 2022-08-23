/*
 * @lc app=leetcode.cn id=655 lang=typescript
 *
 * [655] 输出二叉树
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

function printTree(root: TreeNode | null): string[][] {
  let height = 0;
  (function dfs(level: number, node: TreeNode | null) {
    if (!node) {
      return;
    }
    height = Math.max(height, level);
    dfs(level + 1, node.left);
    dfs(level + 1, node.right);
  })(0, root);
  const n = 2 ** (height + 1) - 1;
  const result = Array.from({ length: height + 1 }, () => Array.from({ length: n }, () => ""));
  (function dfs(node: TreeNode | null, r: number, c: number) {
    if (!node) {
      return;
    }
    result[r]![c] = node.val.toString();
    dfs(node.left, r + 1, c - 2 ** (height - r - 1));
    dfs(node.right, r + 1, c + 2 ** (height - r - 1));
  })(root, 0, (n - 1) / 2);
  return result;
}
// @lc code=end

test.Func(printTree).withCases(
  [
    [test.tree.create([1, 2])],
    [
      ["", "1", ""],
      ["2", "", ""],
    ],
  ],
  [
    [test.tree.create([1, 2, 3, null, 4])],
    [
      ["", "", "", "1", "", "", ""],
      ["", "2", "", "", "", "3", ""],
      ["", "", "4", "", "", "", ""],
    ],
  ]
);
export {};
