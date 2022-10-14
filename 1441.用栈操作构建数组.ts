/*
 * @lc app=leetcode.cn id=1441 lang=typescript
 *
 * [1441] 用栈操作构建数组
 */

// @lc code=start
function buildArray(target: number[], n: number): string[] {
  const pushDirective = "Push";
  const popDirective = "Pop"
  return [...(function *() {
    let current = 0;
    for (const num of target) {
      if (num > n) {
        return;
      }
      current++;
      while (current !== num) {
        yield pushDirective;
        yield popDirective;
        current++;
      }
      yield pushDirective;
    }
  })()]
};
// @lc code=end

test.Func(buildArray)
.tryParseMultiCases(
`
示例 1：

输入：target = [1,3], n = 3
输出：["Push","Push","Pop","Push"]
解释： 
读取 1 并自动推入数组 -> [1]
读取 2 并自动推入数组，然后删除它 -> [1]
读取 3 并自动推入数组 -> [1,3]
示例 2：

输入：target = [1,2,3], n = 3
输出：["Push","Push","Push"]
示例 3：

输入：target = [1,2], n = 4
输出：["Push","Push"]
解释：只需要读取前 2 个数字就可以停止。
`
)

export {}

