/*
 * @lc app=leetcode.cn id=904 lang=typescript
 *
 * [904] 水果成篮
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
  let boxA = fruits[0]!,
    boxB: number | null = null;
  let current = 0;
  let max = -1;
  let sum = 0;
  let currentGroup = boxA;
  let groupSum = 0;
  const calcGroup = (fruit: number) => {
    if (fruit === currentGroup) {
      groupSum++;
    } else {
      currentGroup = fruit;
      groupSum = 1;
    }
  };
  const moveNext = () => {
    sum++;
    current++;
    max = Math.max(max, sum);
  };
  while (current < fruits.length) {
    const fruit = fruits[current]!;
    if (fruit === boxA || fruit === boxB) {
      calcGroup(fruit);
      moveNext();
      continue;
    }
    if (boxB == null) {
      boxB = fruit;
      calcGroup(fruit);
      moveNext();
      continue;
    }
    sum = groupSum;
    boxA = currentGroup;
    calcGroup(fruit);
    boxB = fruit;
    moveNext();
  }
  return max;
}
// @lc code=end
test.Func(totalFruit)
.tryParseMultiCases(
`
示例 0：

输入：fruits = [1,0,1,4,1,4,1,2,3]
输出：5

示例 1：

输入：fruits = [1,2,1]
输出：3
解释：可以采摘全部 3 棵树。
示例 2：

输入：fruits = [0,1,2,2]
输出：3
解释：可以采摘 [1,2,2] 这三棵树。
如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
示例 3：

输入：fruits = [1,2,3,2,2]
输出：4
解释：可以采摘 [2,3,2,2] 这四棵树。
如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
示例 4：

输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
输出：5
解释：可以采摘 [1,2,1,1,2] 这五棵树。
`
)
export {}