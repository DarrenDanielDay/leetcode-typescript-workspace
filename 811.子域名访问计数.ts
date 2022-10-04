/*
 * @lc app=leetcode.cn id=811 lang=typescript
 *
 * [811] 子域名访问计数
 */

// @lc code=start
interface Trie {
  count: number;
  children: Record<string, Trie>;
}
function subdomainVisits(cpdomains: string[]): string[] {
  const createNode = (): Trie => {
    return {
      count: 0,
      children: {},
    };
  };
  const accessRecords = createNode();
  for (const access of cpdomains) {
    const [rawCount, domain] = access.split(" ");
    const count = +rawCount!;
    const fragments = domain!.split(".").reverse();
    let node = accessRecords;
    for (const fragment of fragments) {
      node = node.children[fragment] ??= createNode();
      node.count += count;
    }
  }
  return [
    ...(function* dfs(children: Trie["children"], path: string[]): Generator<string> {
      for (const [part, child] of Object.entries(children)) {
        const newPath = [part, ...path];
        yield `${child.count} ${newPath.join(".")}`;
        yield* dfs(child.children, newPath);
      }
    })(accessRecords.children, []),
  ];
}
// @lc code=end
const eq = (expect: string[]) => (actual: string[]) => _.isEqual(actual.sort(), expect.sort());
test
  .Func(subdomainVisits)
  .withCases(
    [[["9001 discuss.leetcode.com"]], eq(["9001 leetcode.com", "9001 discuss.leetcode.com", "9001 com"])],
    [
      [["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]],
      eq(["901 mail.com", "50 yahoo.com", "900 google.mail.com", "5 wiki.org", "5 org", "1 intel.mail.com", "951 com"]),
    ]
  );
export {};
