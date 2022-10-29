/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 */

// @lc code=start

function longestPalindrome(s: string): string {
  const expand = (left: number, right: number) => {
    while (left >= 0 && right < mixed.length && mixed[left] === mixed[right]) {
      left--;
      right++;
    }
    return Math.floor((right - left - 2) / 2);
  };
  let end = -1,
    start = 0;
  const mixed = `#${[...s].join("#")}#`;
  const lengths: number[] = [];
  let right = -1;
  let maxLengthCenter = -1;
  for (let i = 0; i < mixed.length; i++) {
    const mirrorIndex = 2 * maxLengthCenter - i;
    const leastLength = right >= i ? Math.min(lengths[mirrorIndex]!, right - i) : 0;
    const currentLength = expand(i - leastLength, i + leastLength);
    lengths.push(currentLength);
    if (i + currentLength > right) {
      maxLengthCenter = i;
      right = i + currentLength;
    }
    if (currentLength * 2 + 1 > end - start) {
      start = i - currentLength;
      end = i + currentLength;
    }
  }
  return [
    ...(function* () {
      for (let i = start; i <= end; ++i) {
        const char = mixed[i];
        if (char !== "#") {
          yield char;
        }
      }
    })(),
  ].join("");
}
// @lc code=end

test.Func(longestPalindrome).tryParseMultiCases(
  `
示例 1：

输入：s = "aacabdkacaa"
输出："aca"

示例 2：

输入：s = "cbbd"
输出："bb"
`
);

export {};
