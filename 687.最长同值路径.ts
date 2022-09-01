/*
 * @lc app=leetcode.cn id=687 lang=typescript
 *
 * [687] 最长同值路径
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

function longestUnivaluePath(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  interface SearchResult {
    lor: number;
    lnr: number;
    far: number;
  }
  const empty: SearchResult = {
    lnr: 0,
    lor: 0,
    far: 0,
  };
  const res = (function dfs(node: TreeNode): SearchResult {
    const { left, right, val } = node;

    const l: SearchResult = left ? dfs(left) : empty;
    const r: SearchResult = right ? dfs(right) : empty;

    return {
      lnr: left && right && left.val === val && right.val === val ? l.lor + r.lor + 2 : 0,
      lor: Math.max(left && left.val === val ? l.lor + 1 : 0, right && right.val === val ? r.lor + 1 : 0),
      far: Math.max(l.far, r.far, l.lor, r.lor, l.lnr, r.lnr),
    };
  })(root);
  return Math.max(res.far, res.lnr, res.lor);
}
// @lc code=end
test.Func(longestUnivaluePath).tryParseCases(
  `
输入：root = [5,4,5,1,1,5]
输出：2
`,
  `
输入：root = [1,4,5,4,4,5]
输出：2
`
);
export {};
