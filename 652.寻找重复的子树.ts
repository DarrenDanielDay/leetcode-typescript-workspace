/*
 * @lc app=leetcode.cn id=652 lang=typescript
 *
 * [652] 寻找重复的子树
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

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  if (!root) {
    return [];
  }
  const hash: Record<string, [TreeNode, number]> = {};
  let i = 0;
  const res = new Set<TreeNode>();
  (function dfs(node: TreeNode): number {
    const { left, right, val } = node;
    const tuple = [val, left ? dfs(left) : -1, right ? dfs(right) : -1];
    const nodeKey = tuple.toString();
    const p = hash[nodeKey];
    if (p) {
      const [node, id] = p;
      res.add(node);
      return id;
    } else {
      i++;
      hash[nodeKey] = [node, i];
      return i;
    }
  })(root);
  return [...res];
}
// @lc code=end

test.Func(findDuplicateSubtrees).withCases([
  [test.tree.create([1, 2, 3, 4, null, 2, 4, null, null, 4])],
  (res) => {
    const [a, b] = res;
    if (!a || !b || res.length !== 2) {
      return false;
    }
    const match1 = test.tree.compare([2, 4]);
    const match2 = test.tree.compare([2]);
    return (match1(a) && match2(b)) || (match1(b) && match2(a));
  },
]);

export {};
