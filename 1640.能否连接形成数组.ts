/*
 * @lc app=leetcode.cn id=1640 lang=typescript
 *
 * [1640] 能否连接形成数组
 */

// @lc code=start
function canFormArray(arr: number[], pieces: number[][]): boolean {
  const mapToIndex = arr.reduce((acc, num, i) => acc.set(num, i), new Map<number, number>());
  const visited = arr.map(() => false);
  for (const piece of pieces) {
    const start = mapToIndex.get(piece[0]!);
    if (start == null) {
      return false;
    }
    for (let i = 0; i < piece.length; i++) {
      const arrIndex = start + i;
      if (piece[i] !== arr[arrIndex]) {
        return false;
      }
      visited[arrIndex] = true;
    }
  }
  return visited.every(Boolean);
}
// @lc code=end
test.Func(canFormArray)
.tryParseMultiCases(
`
示例 1：

输入：arr = [15,88], pieces = [[88],[15]]
输出：true
解释：依次连接 [15] 和 [88]
示例 2：

输入：arr = [49,18,16], pieces = [[16,18,49]]
输出：false
解释：即便数字相符，也不能重新排列 pieces[0]
示例 3：

输入：arr = [91,4,64,78], pieces = [[78],[4,64],[91]]
输出：true
解释：依次连接 [91]、[4,64] 和 [78]
`
)

export {}
