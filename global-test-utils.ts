/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from "assert";

const testObject = (() => {
  type AnyFunc = (...args: any[]) => any;
  type AnyConstructor = new (...args: any[]) => any;
  type ExpectedOrTester<T> = T | ((actual: T) => boolean);
  const list = (() => {
    /**
     * Create a linked list with given values.
     * @param nums linked list node values
     * @returns linked list head node, null if given empty values
     */
    const create = (nums: number[]): ListNode | null => {
      const headValue = nums[0];
      if (headValue == null) {
        return null;
      }
      const head = new ListNode(headValue);
      for (let i = 1, current = head; i < nums.length; i++, current = current.next) {
        const num = nums[i];
        current.next = new ListNode(num);
      }
      return head;
    };

    /**
     * Compare your linked list with node value array.
     * @param nums linked list node values
     * @returns a compare function which accepts a head node and returns boolean
     */
    const compare =
      (nums: number[]) =>
      (head: ListNode | null): boolean => {
        for (let i = 0, current = head; i < nums.length; i++, current = current.next) {
          if (!current) {
            return false;
          }
          const num = nums[i];
          if (current.val !== num) {
            return false;
          }
        }
        return true;
      };

    /**
     * Iterate the given linked list and return iterated values.
     * @param head linked list head node, null for empty linked list
     * @returns an array with iterated values
     */
    const toArray = (head: ListNode | null) => [
      ...(function* () {
        for (let current = head; current != null; current = current.next) {
          yield current.val;
        }
      })(),
    ];
    return {
      create,
      compare,
      toArray,
    };
  })();

  const tree = (() => {
    /**
     * Create a tree with node values in BFS order.
     * @param nums node values in BFS order, null for empty child
     * @returns the root of a new tree, null if first value is nullish
     */
    const create = (nums: (number | null)[]): TreeNode | null => {
      const rootValue = nums[0];
      if (rootValue == null) {
        return null;
      }
      const root = new TreeNode(rootValue);
      let i = 0;
      const queue = new Queue.Queue([root]);
      while (!queue.isEmpty()) {
        const parent = queue.dequeue();
        i++;
        const leftV = nums[i];
        i++;
        const rightV = nums[i];
        if (leftV != null) {
          const newNode = new TreeNode(leftV);
          parent.left = newNode;
          queue.enqueue(newNode);
        }
        if (rightV != null) {
          const newNode = new TreeNode(rightV);
          parent.right = newNode;
          queue.enqueue(newNode);
        }
      }
      return root;
    };
    /**
     * Compare your tree with node values in BFS order.
     * @param nums node values in BFS order, null for empty child
     * @returns a compare function which accepts a root node and returns boolean
     */
    const compare =
      (nums: (number | null)[]) =>
      (root: TreeNode | null): boolean => {
        const rootValue = nums[0];
        if (root === null) {
          return rootValue == null;
        }
        let i = 0;
        const queue = new Queue.Queue([root]);
        while (!queue.isEmpty()) {
          const parent = queue.dequeue();
          i++;
          const leftV = nums[i];
          i++;
          const rightV = nums[i];
          const { left, right } = parent;
          if (leftV != null) {
            if (!left) {
              return false;
            }
            if (left.val !== leftV) {
              return false;
            }
            queue.enqueue(left);
          } else {
            if (parent.left) {
              return false;
            }
          }
          if (rightV != null) {
            if (!right) {
              return false;
            }
            if (right.val !== rightV) {
              return false;
            }
            queue.enqueue(right);
          } else {
            if (right) {
              return false;
            }
          }
        }
        return true;
      };
    /**
     * Iterate the tree with BFS algorithm and return the iterated values.
     * @param root tree root node, null for empty tree
     * @returns iterated values of the tree
     */
    const toArray = (root: TreeNode | null) => [
      ...(function* () {
        if (!root) {
          return;
        }
        const queue = new Queue.Queue<TreeNode | null>([root]);
        while (!queue.isEmpty()) {
          const node = queue.dequeue();
          if (!node) {
            yield null;
            continue;
          }
          const { left, right, val } = node;
          yield val;
          queue.enqueue(left);
          queue.enqueue(right);
        }
      })(),
    ];
    return {
      create,
      compare,
      toArray,
    };
  })();

  const nested = (() => {
    type NestedNode = number | Array<NestedNode>;

    /**
     * Convert a nested number list node to leetcode's built-in NestedInteger
     * @param node a nested number array node
     * @returns leetcode NestedInteger
     */
    const build = (node: NestedNode): NestedInteger => {
      if (typeof node === "number") {
        return new NestedInteger(node);
      }
      const root = new NestedInteger();
      const queue = new Queue.Queue<[NestedInteger, NestedNode[]]>([[root, node]]);
      while (!queue.isEmpty()) {
        const [nestedInteger, elements] = queue.dequeue();
        for (const element of elements) {
          if (typeof element === "number") {
            nestedInteger.add(new NestedInteger(element));
          } else {
            const childNestedInteger = new NestedInteger();
            nestedInteger.add(childNestedInteger);
            queue.enqueue([childNestedInteger, element]);
          }
        }
      }
      return root;
    };

    /**
     * Convert a nested number list to leetcode's built-in NestedInteger array
     * @param arr nested number array
     * @returns leetcode NestedInteger array
     */
    const create = (arr: NestedNode[]): NestedInteger[] => arr.map(build);
    /**
     * Compare your nested integer with a nested number array node.
     * @param node a nested number array node
     * @returns a compare function which accepts a NestedInteger and returns boolean
     */
    const compareOne =
      (node: NestedNode) =>
      (root: NestedInteger): boolean => {
        if (typeof node === "number") {
          return node === root.getInteger();
        }
        const queue = new Queue.Queue<[NestedInteger, NestedNode[]]>([[root, node]]);
        while (!queue.isEmpty()) {
          const [nestedInteger, elements] = queue.dequeue();
          const list = nestedInteger.getList();
          if (elements.length !== list.length) {
            return false;
          }
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i]!;
            const childNestedInteger = list[i]!;
            if (typeof element === "number") {
              if (element !== childNestedInteger.getInteger()) {
                return false;
              }
              continue;
            }
            queue.enqueue([childNestedInteger, element]);
          }
        }
        return true;
      };

    /**
     * Compare your nested integers with a nested number array.
     * @param arr a nested number array
     * @returns a compare function which accepts an array of NestedInteger and returns boolean
     */
    const compareList =
      (arr: NestedNode[]) =>
      (roots: NestedInteger[]): boolean =>
        arr.length === roots.length && arr.every((node, i) => compareOne(node)(roots[i]!));

    return {
      build,
      create,
      compareOne,
      compareList,
    };
  })();

  /**
   * You can add your custom logic here.
   * @internal
   */
  const runTestAndCompare = (
    input: unknown,
    expectedOrTester: ExpectedOrTester<ReturnType<AnyFunc>>,
    getActual: () => unknown,
    tag: string,
    desc: string | number
  ) => {
    const output = (message: string) => `[${tag} ${desc} ${message}]`;
    try {
      console.log(output("inputs"), input);
      const run = output("timing");
      console.time(run);
      const actual = getActual();
      console.timeEnd(run);
      console.log(output("actual"), actual);
      const expected =
        typeof expectedOrTester === "function"
          ? `<predicate function ${expectedOrTester.name || "anonymous"}>`
          : expectedOrTester;
      console.log(output("expect"), expected);
      if (typeof expectedOrTester === "function") {
        assert.strictEqual(expectedOrTester(actual), true);
      } else {
        assert.deepStrictEqual(actual, expectedOrTester);
      }
      console.log(output("result"), `[✅]`);
    } catch (error) {
      if (!(error instanceof assert.AssertionError)) {
        console.error(output("result"), "[❌] Runtime Error");
        throw error;
      } else {
        console.log(output("result"), `[❌]`);
      }
    }
  };
  /**
   * Test your function logic.
   * @param solution solution function
   * @returns an object for chaining
   */
  const Func = <Func extends AnyFunc>(solution: Func) => ({
    /**
     * Run test cases with solution function.
     * @param cases test cases, expected value can be a compare function.
     */
    withCases: (...cases: [Parameters<Func>, ExpectedOrTester<ReturnType<Func>>][]) => {
      for (const [i, [input, expectedOrTester]] of cases.entries()) {
        try {
          runTestAndCompare(input, expectedOrTester, () => Reflect.apply(solution, void 0, input), "case", i);
        } catch (error) {
          // Continue for other test cases if RE occurred.
          console.error(error);
        }
      }
    },
  });

  const Class = <Constructor extends AnyConstructor>(ctor: Constructor) => {
    type Instance = InstanceType<Constructor>;
    type MethodKey = {
      [K in string & keyof Instance]: Instance[K] extends AnyFunc ? K : never;
    }[string & keyof Instance];
    type Inputs<Methods extends MethodKey[]> = {
      // @ts-expect-error Do not work with TypeScript 4.5.4
      [I in keyof Methods]: Parameters<Instance[Methods[I]]>;
    };
    type Results<Methods extends MethodKey[]> = {
      [I in keyof Methods]: ExpectedOrTester<
        // @ts-expect-error Do not work with TypeScript 4.5.4
        ReturnType<Instance[Methods[I]]> extends void ? null | undefined | void : ReturnType<Instance[Methods[I]]>
      >;
    };
    let instanceId = 0;
    const invoke = <Methods extends MethodKey[]>([, ...methods]: [string, ...Methods]) => {
      const withInputs = ([params, ...inputs]: [ConstructorParameters<Constructor>, ...Inputs<Methods>]) => {
        const expectResults = ([, ...results]: [unknown, ...Results<Methods>]) => {
          if (methods.length !== inputs.length || methods.length !== results.length) {
            throw new Error("Invalid usage. Lengths of `invoke`, `withInputs`, `expectResults` must be the same.");
          }
          const instance = Reflect.construct(ctor, params, ctor);
          const id = instanceId;
          instanceId++;
          for (let i = 0; i < methods.length; i++) {
            const input = inputs[i];
            const method = methods[i];
            const expected = results[i];
            try {
              runTestAndCompare(
                input,
                expected,
                () => Reflect.apply(instance[method], instance, input),
                `instance ${id}:`,
                method
              );
            } catch (error) {
              console.log(
                `Fatal error occurred in method \`${method}\`. It's meaningless to run rest cases with the same instance.`
              );
              console.error(error);
              return {
                invoke,
              };
            }
          }
          return {
            invoke,
          };
        };
        return {
          expectResults,
        };
      };
      return {
        withInputs,
      };
    };
    return {
      invoke,
    };
  };
  return {
    Func,
    Class,
    list,
    tree,
    nested,
  };
})();

declare global {
  var test: typeof testObject;
}

// Inject into global context.
Object.assign(globalThis, {
  test: testObject,
});
