/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
interface NFANode {
  id: number;
  epsilonMapping: NFANode[];
  transitionMapping: Record<string, NFANode>;
}
function nfaNode(id: number): NFANode {
  return {
    id,
    epsilonMapping: [],
    transitionMapping: {},
  };
}
class SpecialNFA {
  begin: NFANode;
  end: NFANode;
  private currentId = 0;
  constructor() {
    this.begin = nfaNode(this.currentId++);
    this.end = this.begin;
  }
  concat(char: string) {
    const originalEnd = this.end;
    const newEnd = nfaNode(this.currentId++);
    originalEnd.transitionMapping[char] = newEnd;
    this.end = newEnd;
  }
  concatCharKleeneClosure(char: string) {
    const originalEnd = this.end;
    const moved = nfaNode(this.currentId++);
    const newEnd = nfaNode(this.currentId++);
    originalEnd.epsilonMapping.push(newEnd);
    moved.epsilonMapping.push(originalEnd);
    originalEnd.transitionMapping[char] = moved;
    this.end = newEnd;
  }
  private createDotNodes(begin: NFANode) {
    const end = nfaNode(this.currentId++);
    for (const char of charset) {
      begin.transitionMapping[char] = end;
    }
    return end;
  }
  concatDot() {
    const begin = this.end;
    const end = this.createDotNodes(begin);
    this.end = end;
  }
  concatDotKleeneClosure() {
    const originalEnd = this.end;
    const moved = this.createDotNodes(originalEnd);
    const newEnd = nfaNode(this.currentId++);
    moved.epsilonMapping.push(originalEnd);
    originalEnd.epsilonMapping.push(newEnd);
    this.end = newEnd;
  }
}
const charset = Array.from({ length: 26 }, (_, i) => String.fromCharCode("a".charCodeAt(0) + i));

function compilePatternToNFA(pattern: string) {
  const nfa = new SpecialNFA();
  let cursor = 0;
  while (cursor < pattern.length) {
    const char = pattern[cursor]!;
    const next = pattern[cursor + 1];
    if (next === "*") {
      if (char === ".") {
        nfa.concatDotKleeneClosure();
      } else {
        nfa.concatCharKleeneClosure(char);
      }
      cursor += 2;
    } else {
      if (char === ".") {
        nfa.concatDot();
      } else {
        nfa.concat(char);
      }
      cursor++;
    }
  }
  return nfa;
}
type NFAClosure = Map<number, NFANode>;

interface DFANode {
  cacheKey: string;
  nfaNodeClosure: NFAClosure;
  isAccept: boolean;
  mapping: Record<string, DFANode>;
}
function compileNFAToDFA(nfa: SpecialNFA): DFANode {
  function epsilonClosure(nodes: NFAClosure) {
    const resultSet: NFAClosure = new Map();
    function dfs(node: NFANode) {
      const id = node.id;
      if (resultSet.has(id)) {
        return;
      }
      resultSet.set(id, node);
      for (const neighbor of node.epsilonMapping) {
        dfs(neighbor);
      }
    }
    for (const [, node] of nodes) {
      dfs(node);
    }
    return resultSet;
  }
  function* visitMapping(nodes: NFAClosure) {
    const emittedCharset = new Set<string>();
    for (const [, node] of nodes) {
      for (const char in node.transitionMapping) {
        if (emittedCharset.has(char)) {
          continue;
        }
        emittedCharset.add(char);
        const neighbors: NFAClosure = new Map();
        for (const [, eachNode] of nodes) {
          const neighbor = eachNode.transitionMapping[char];
          if (neighbor) {
            neighbors.set(neighbor.id, neighbor);
          }
        }
        yield {
          char,
          neighbors,
        };
      }
    }
  }
  const cache = new Map<string, DFANode>();
  const acceptId = nfa.end.id;
  function createOrGetDFANode(nodes: NFAClosure): [DFANode, boolean] {
    const cacheKey = [...nodes.keys()].sort((a, b) => a - b).join(",");
    const cached = cache.get(cacheKey);
    if (cached) {
      return [cached, true];
    }
    const newDFANode: DFANode = {
      cacheKey,
      nfaNodeClosure: nodes,
      isAccept: nodes.has(acceptId),
      mapping: {},
    };
    cache.set(cacheKey, newDFANode);
    return [newDFANode, false];
  }
  const dfaRootNode = createOrGetDFANode(epsilonClosure(new Map([[nfa.begin.id, nfa.begin]])))[0];
  const queue = new Queue.Queue([dfaRootNode]);
  while (!queue.isEmpty()) {
    const dfaNode = queue.dequeue();
    const { nfaNodeClosure, mapping } = dfaNode;
    for (const { char, neighbors } of visitMapping(nfaNodeClosure)) {
      const [nextNode, created] = createOrGetDFANode(epsilonClosure(neighbors));
      if (!created) {
        queue.enqueue(nextNode);
      }
      mapping[char] = nextNode;
    }
  }
  return dfaRootNode;
}

function matchByWalk(dfa: DFANode, input: string): boolean {
  let node = dfa;
  for (const char of input) {
    const next = node.mapping[char];
    if (!next) {
      return false;
    }
    node = next;
  }
  return node.isAccept;
}

function isMatch(s: string, p: string): boolean {
  // Hello mother fucker solution:
  // return new RegExp(`^${p}$`).test(s);
  const nfa = compilePatternToNFA(p);
  const dfa = compileNFAToDFA(nfa);
  return matchByWalk(dfa, s);
}
// @lc code=end

test.Func(isMatch).tryParseMultiCases(
  `
示例 0：

输入：s = "aaba", p = "ab*a*c*a"
输出：false

示例 1：

输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
示例 2:

输入：s = "aa", p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3：

输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
`
);

export {};
