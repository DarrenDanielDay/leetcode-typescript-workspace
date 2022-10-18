/*
 * @lc app=leetcode.cn id=1700 lang=typescript
 *
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start
function countStudents(students: number[], sandwiches: number[]): number {
  let squares = _.sum(students);
  let rounds = students.length - squares;
  loop: for (const sandwitch of sandwiches) {
    switch (sandwitch) {
      case 1 /** square */:
        if (squares) {
          squares--;
        } else {
          break loop;
        }
        break;
      case 0 /** round */:
        if (rounds) {
          rounds--;
        } else {
          break loop;
        }
        break;
    }
  }
  return squares + rounds;
}
// @lc code=end

test.Func(countStudents)
.tryParseMultiCases(
`
示例 1：

输入：students = [1,1,0,0], sandwiches = [0,1,0,1]
输出：0 
解释：
- 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [1,0,0,1]。
- 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [0,0,1,1]。
- 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [0,1,1]，三明治栈为 sandwiches = [1,0,1]。
- 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [1,1,0]。
- 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [1,0]，三明治栈为 sandwiches = [0,1]。
- 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [0,1]。
- 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [1]，三明治栈为 sandwiches = [1]。
- 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = []，三明治栈为 sandwiches = []。
所以所有学生都有三明治吃。
示例 2：

输入：students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
输出：3
`
)

export {}