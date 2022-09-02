/*
 * @lc app=leetcode.cn id=1361 lang=typescript
 *
 * [1361] 验证二叉树
 */

// @lc code=start
function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {
  const inDegree = Array.from({ length: n }, () => 0);
  for (let i = 0; i < n; i++) {
    const left = leftChild[i]!;
    const right = rightChild[i]!;
    if (~left) {
      inDegree[left]++;
    }
    if (~right) {
      inDegree[right]++;
    }
  }
  let has0 = false;
  let root = -1;
  for (const [i, deg] of inDegree.entries()) {
    if (deg === 0) {
      if (has0) {
        return false;
      }
      has0 = true;
      root = i;
    }
    if (deg > 1) {
      return false;
    }
  }
  if (!has0) {
    return false;
  }
  const queue = new Queue.Queue([root]);
  const visited = Array.from({ length: n }, () => false);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (visited[node]) {
      // Circular
      return false;
    }
    visited[node] = true;
    const left = leftChild[node]!;
    const right = rightChild[node]!;
    if (~left) {
      queue.enqueue(left);
    }
    if (~right) {
      queue.enqueue(right);
    }
  }
  return visited.every(Boolean);
}
// @lc code=end
test.Func(validateBinaryTreeNodes).tryParseCases(
  `
输入：n = 4, leftChild = [1,0,3,-1], rightChild = [-1, -1, -1, -1]
输出：false
`,
  `
输入：n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
输出：true
`,
  `
输入：n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
输出：false
`,
  `
输入：n = 2, leftChild = [1,0], rightChild = [-1,-1]
输出：false
`,
  `
输入：n = 6, leftChild = [1,-1,-1,4,-1,-1], rightChild = [2,-1,-1,5,-1,-1]
输出：false
`
);
export {};
