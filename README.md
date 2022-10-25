# leetcode-typescript-workspace

English | [简体中文](./README.zh-CN.md)

A `vscode` workspace template with test case runner script for JavaScript/TypeScript programmers using extension `LeetCode.vscode-leetcode`.

- [Features](#features)
- [Why not...](#why-not)
- [Usage](#usage)
  - [0. Requirements](#0-requirements)
  - [1. Clone this repository](#1-clone-this-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Write solution code](#3-write-solution-code)
  - [4. Write test cases](#4-write-test-cases)
  - [5. Run/Debug](#5-rundebug)
- [TODO](#todo)
- [License](#license)

## Features

- `TypeScript` definitions for `leetcode` OJ's built-in data structures (maybe not all of them) 💡
- `TypeScript` definitions for `leetcode` OJ's built-in libraries ⚒
- `JavaScript`/`TypeScript` test runner & debugger configuration 🐞

## Why not...

A `vscode` extension? ⚙

First it's a little bit difficult to contribute type definitions to TypeScript Language Service. It's easier to create a TypeScript project and add global declarations for TypeScript support instead. Second, it's complicated to debug TypeScript without JavaScript code and source map, so we do need code generation. Also, setting debug configuration takes a lot of time for users who are more concerned about solutions. A configured workspace is easier to use, out of the box.

An NPM package? 📦

It's a possible solution to publish an NPM package with executable test runner script and global TypeScript declarations. But users still need to configure the debugger if they want to debug the program by `vscode`'s debug tool. Another reason is the library version may change at time. With a configured workspace, users can configure the current library versions by simply modifying the versions in `package.json`.

So it's a better choice to make a workspace template for better UX 🎉.

## Usage

### 0. Requirements

- `vscode` latest
- `Node.JS` >= 14.0.0

### 1. Clone this repository

```sh
# via HTTPS
git clone https://github.com/DarrenDanielDay/leetcode-typescript-workspace.git
# via SSH
git clone git@github.com:DarrenDanielDay/leetcode-typescript-workspace.git
# via GitHub CLI
gh repo clone DarrenDanielDay/leetcode-typescript-workspace
```

And then open this repository with `vscode`. If you see extension recommendation, please install it 👈.

Don't forget to set your local repository as the workspace folder of [`LeetCode.vscode-leetcode`](https://github.com/LeetCode-OpenSource/vscode-leetcode).

![settings.png](assets/screenshots/settings-en.png)

### 2. Install dependencies

You can install dependencies via `npm`, `yarn`, `pnpm` or any other `Node.JS` package manager you like.

```sh
# via npm
npm install
# via yarn
yarn install
# via pnpm
pnpm install
```

### 3. Write solution code

Supported built-in library:

- lodash@latest
- @datastructures-js/priority-queue@5.3.0 (same to `leetcode` OJ's version)
- @datastructures-js/queue@4.2.1 (same to `leetcode` OJ's version)

Known global library variables:

```ts
var _; // lodash
var Queue; // @datastructures-js/priority-queue
class MaxPriorityQueue {} // @datastructures-js/priority-queue
class MinPriorityQueue {} // @datastructures-js/priority-queue
class PriorityQueue {} // @datastructures-js/priority-queue
```

Check the dependency versions in [`package.json`](./package.json). See [global-libs.ts](./global-libs.ts) for injection details.

Supported `leetcode`'s built-in data structure declaration & implementation:

- ListNode
- TreeNode
- NestedInteger (nested list)

See [global-builtins.ts](./global-builtins.ts) for implementation details.

For how to create, write and submit your solution to `leetcode` with `LeetCode.vscode-leetcode`, see [user guide](https://github.com/LeetCode-OpenSource/vscode-leetcode).

### 4. Write test cases

`LeetCode.vscode-leetcode` will not submit code below comment `// @lc code=end` to `leetcode`, so you can write test code there.

You can write test code with the following global test utility API:

- `test.Func`: test `function`
- `test.Class`: test `class`
- `test.list`: utilities for `ListNode`
- `test.tree`: utilities for `TreeNode`
- `test.nested`: utilities for `NestedInteger`

But **REMEMBER NOT TO USE THESE API IN YOUR SOLUTION CODE**! They will not work correctly on `leetcode` OJ!

See following demo solution files for more API usage details.

- [2235.add-two-integers.ts](./2235.add-two-integers.ts)
- [206.reverse-list.ts](./206.reverse-list.ts)
- [226.invert-binary-tree.ts](./226.invert-binary-tree.ts)
- [232.implement-queue-using-stacks.ts](./232.implement-queue-using-stacks.ts)
- [341.flatten-nested-list-iterator.ts](./341.flatten-nested-list-iterator.ts)

### 5. Run/Debug

Run directly:

```sh
# via npm
npm run lc:run ./<solution-file.js>
# via yarn
yarn lc:run ./<solution-file.js>
# via pnpm
pnpm lc:run ./<solution-file.js>
```

where `<solution-file.js>` is your solution file created by `LeetCode.vscode-leetcode`.

Debug with `vscode`:

You can add breakpoints in your solution files. Just press `F5` when you cursor is currently focusing on a solution file to start a debug session.

## TODO

Personally, this is just my solution for solving `leetcode` problems with `JavaScript/TypeScript` in `vscode`. If it's useful for you, please recommend it to your friends!

I will also submit my solutions for some of `leetcode` problems in this repository, not on the `main` branch, but on my personal branch.

Also, contributions are welcome. If you have any ideas, just tell me in [`issues`](https://github.com/DarrenDanielDay/leetcode-typescript-workspace/issues)!

## License

```txt
 _____________________________________
< The GNU General Public License v3.0 >
 -------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

A `vscode` workspace template with test case runner script for JavaScript/TypeScript programmers using extension `LeetCode.vscode-leetcode`.

Copyright (C) 2022 DarrenDanielDay <Darren_Daniel_Day@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

See [LICENSE](./LICENSE) for full contents.
