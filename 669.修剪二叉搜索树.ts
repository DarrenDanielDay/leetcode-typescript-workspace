/*
 * @lc app=leetcode.cn id=669 lang=typescript
 *
 * [669] 修剪二叉搜索树
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

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) {
    return null;
  }
  const { left, right, val } = root;
  const trimmedLeft = trimBST(left, low, high);
  const trimmedRight = trimBST(right, low, high);
  if (val < low) {
    return trimmedRight;
  }
  if (val > high) {
    return trimmedLeft;
  }
  root.left = trimmedLeft;
  root.right = trimmedRight;
  return root;
}
// @lc code=end
// test
//   .Func(trimBST)
//   .withCases(
//     [[test.tree.create([1, 0, 2]), 1, 2], test.tree.compare([1, null, 2])],
//     [[test.tree.create([3, 0, 4, null, 2, null, null, 1]), 1, 3], test.tree.compare([3, 2, null, 1])]
//   );

test.Func(trimBST).tryParseCases(
  `
输入：root = [1,0,2], low = 1, high = 2
输出：[1,null,2]
`,
  `
输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3
输出：[3,2,null,1]
`
);
export {};
