/*
 * @lc app=leetcode.cn id=1656 lang=typescript
 *
 * [1656] 设计有序流
 */

// @lc code=start
class OrderedStream {
  ptr = 0;
  buf: (string | null)[];
  constructor(n: number) {
    this.buf = Array.from({ length: n }, () => null);
  }

  insert(idKey: number, value: string): string[] {
    this.buf[idKey - 1] = value;
    return [
      ...function* (this: OrderedStream) {
        for (let i = this.ptr; i < this.buf.length; i++) {
          const el = this.buf[i];
          if (el != null) {
            yield el;
          } else {
            this.ptr = i;
            break;
          }
        }
      }.call(this),
    ];
  }
}

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */
// @lc code=end
test
  .Class(OrderedStream)
  .invoke(["OrderedStream", "insert", "insert", "insert", "insert", "insert"])
  .withInputs([[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]])
  .expectResults([null, [], ["aaaaa"], ["bbbbb", "ccccc"], [], ["ddddd", "eeeee"]]);
export {};
