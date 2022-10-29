/*
 * @lc app=leetcode.cn id=1773 lang=typescript
 *
 * [1773] 统计匹配检索规则的物品数量
 */

// @lc code=start
function countMatches(
  items: [type: string, color: string, name: string][],
  ruleKey: string,
  ruleValue: string
): number {
  const ruleKeyIndex = ["type", "color", "name"].indexOf(ruleKey) as 0 | 1 | 2;
  return items.reduce((sum, item) => sum + +(item[ruleKeyIndex] === ruleValue), 0);
}
// @lc code=end
test.Func(countMatches)
.tryParseMultiCases(
`
示例 1：

输入：items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], ruleKey = "color", ruleValue = "silver"
输出：1
解释：只有一件物品匹配检索规则，这件物品是 ["computer","silver","lenovo"] 。
示例 2：

输入：items = [["phone","blue","pixel"],["computer","silver","phone"],["phone","gold","iphone"]], ruleKey = "type", ruleValue = "phone"
输出：2
解释：只有两件物品匹配检索规则，这两件物品分别是 ["phone","blue","pixel"] 和 ["phone","gold","iphone"] 。注意，["computer","silver","phone"] 未匹配检索规则。
`
)
export {}