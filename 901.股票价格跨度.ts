/*
 * @lc app=leetcode.cn id=901 lang=typescript
 *
 * [901] 股票价格跨度
 */

// @lc code=start
class StockSpanner {
  index = -1;
  stack: [number, number][] = [[-1, Infinity]];
  constructor() {}

  next(price: number): number {
    this.index++;
    while (price >= this.stack.at(-1)![1]) this.stack.pop();
    let result = this.index - this.stack.at(-1)![0];
    this.stack.push([this.index, price]);
    return result;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
// @lc code=end

test
  .Class(StockSpanner)
  .invoke(["StockSpanner", "next", "next", "next", "next", "next", "next", "next"])
  .withInputs([[], [100], [80], [60], [70], [60], [75], [85]])
  .expectResults([null, 1, 1, 1, 2, 1, 4, 6]);

export {};
