/*
 * @lc app=leetcode.cn id=1282 lang=typescript
 *
 * [1282] 用户分组
 */

// @lc code=start
function groupThePeople(groupSizes: number[]): number[][] {
  return [
    ...(function* () {
      const sizedGroups = new Map<number, number[]>();
      for (const [i, size] of groupSizes.entries()) {
        const group = sizedGroups.get(size) ?? [];
        group.push(i);
        sizedGroups.set(size, group);
        if (group.length === size) {
          yield group;
          sizedGroups.delete(size);
        }
      }
    })(),
  ];
}
// @lc code=end

function judge(groupSizes: number[], groups: number[][]) {
  return groups.every((group) => group.every((num) => groupSizes[num] === group.length));
}

function makeCase(groupSizes: number[]) {
  return [[groupSizes], (groups: number[][]) => judge(groupSizes, groups)] as const;
}

test.Func(groupThePeople).withCases(makeCase([3, 3, 3, 3, 3, 1, 3]), makeCase([2, 1, 3, 3, 3, 2]));
export {};
