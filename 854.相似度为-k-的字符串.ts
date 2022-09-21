/*
 * @lc app=leetcode.cn id=854 lang=typescript
 *
 * [854] 相似度为 K 的字符串
 */

// @lc code=start
function kSimilarity(s1: string, s2: string): number {
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      str1 += s1[i];
      str2 += s2[i];
    }
  }
  if (str1.length === 0) {
    return 0;
  }
  let ans = str1.length - 1;

  const dfs = (pos: number, cost: number, len: number, str1: string, str2: string) => {
    if (cost > ans) {
      return;
    }
    while (pos < str1.length && str1[pos] === str2[pos]) {
      pos++;
    }
    if (pos === str1.length) {
      ans = Math.min(ans, cost);
      return;
    }
    /* 当前状态的交换次数下限大于等于当前的最小交换次数 */
    if (cost + minSwap(str1, str2, pos) >= ans) {
      return;
    }
    for (let i = pos + 1; i < str1.length; i++) {
      if (str1[i] === str2[pos]) {
        const str1Next = swap(str1, i, pos);
        dfs(pos + 1, cost + 1, len, str1Next, str2);
      }
    }
  };

  const minSwap = (s1: string, s2: string, pos: number) => {
    let tot = 0;
    for (let i = pos; i < s1.length; i++) {
      tot += s1[i] !== s2[i] ? 1 : 0;
    }
    return Math.floor((tot + 1) / 2);
  };

  const swap = (cur: string, i: number, j: number) => {
    const arr = [...cur];
    const c = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = c;
    return arr.join("");
  };

  dfs(0, 0, str1.length, str1, str2);
  return ans;
}
// @lc code=end
test.Func(kSimilarity)
.tryParseMultiCases(
`
示例 1：

输入：s1 = "ab", s2 = "ba"
输出：1
示例 2：

输入：s1 = "abc", s2 = "bca"
输出：2
`
)

export {}