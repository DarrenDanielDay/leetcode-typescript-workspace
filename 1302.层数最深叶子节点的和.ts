/*
 * @lc app=leetcode.cn id=1302 lang=typescript
 *
 * [1302] 层数最深叶子节点的和
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

function deepestLeavesSum(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  let sum = 0;
  let level = 0;
  const queue = new Queue.Queue([[root, level] as const]);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    const [{ left, right, val }, currentLevel] = node;
    if (currentLevel === level) {
      sum += val;
    }
    if (left) {
      const nextLevel = currentLevel + 1;
      if (nextLevel > level) {
        sum = 0;
        level = nextLevel;
      }
      queue.enqueue([left, nextLevel]);
    }
    if (right) {
      const nextLevel = currentLevel + 1;
      if (nextLevel > level) {
        sum = 0;
        level = nextLevel;
      }
      queue.enqueue([right, nextLevel]);
    }
  }
  return sum;
}
// @lc code=end
test
  .Func(deepestLeavesSum)
  .withCases(
    [[test.tree.create([1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8])], 15],
    [[test.tree.create([6, 7, 8, 2, 7, 1, 3, 9, null, 1, 4, null, null, null, 5])], 19],
    [[test.tree.create([38, 43, 70, 16, null, 78, 91, null, 71, 27, null, 71, null, null, null, 71])], 71]
  );
export {};
