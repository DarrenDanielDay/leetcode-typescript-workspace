# leetcode-typescript-workspace

[English](./README.md) | 简体中文

带有测试用例运行脚本的“vscode”工作区模板，适用于使用扩展`LeetCode.vscode-leetcode`的 JavaScript/TypeScript 程序员。

- [功能](#功能)
- [为什么不是……](#为什么不是)
- [用法](#用法)
  - [0. 环境需求](#0-环境需求)
  - [1. 克隆这个仓库](#1-克隆这个仓库)
  - [2. 安装依赖](#2-安装依赖)
  - [3. 编写题解代码](#3-编写题解代码)
  - [4. 编写测试用例](#4-编写测试用例)
  - [5. 运行/调试](#5-运行调试)
- [TODO](#todo)
- [许可证](#许可证)

## 功能

- `力扣` OJ 的内置数据结构的`TypeScript`类型定义（或许不是全部） 💡
- `力扣` OJ 的内置库的`TypeScript`类型定义 ⚒
- `JavaScript`/`TypeScript`的测试用例运行工具和调试配置 🐞

## 为什么不是……

一个 `vscode` 扩展？ ⚙

首先，将类型定义贡献给 TypeScript 语言服务有点困难。 创建 TypeScript 项目并添加全局声明以支持 TypeScript 会更容易。 其次，在没有 JavaScript 代码和源映射的情况下调试 TypeScript 很复杂，所以我们确实需要代码生成。 此外，对于更关心解决题目的用户来说，设置调试配置需要花费大量时间。 已配置的工作区更易于使用，开箱即用。

一个 NPM 包？ 📦

发布带有可执行的运行测试的脚本和全局 TypeScript 声明的 NPM 包是一种可能的解决方案。 但是如果用户想通过`vscode`的调试工具调试程序，还是需要配置调试器。 另一个原因是库版本可能会随时更改。 使用已配置的工作区，用户可以通过简单地修改 `package.json` 中的版本来配置当前的库版本。

因此，制作工作区模板以获得更好的用户体验是一个更好的选择 🎉。

## 用法

### 0. 环境需求

- `vscode` 最新版
- `Node.JS` 至少 14.0.0

### 1. 克隆这个仓库

```sh
# 通过 HTTPS
git clone https://github.com/DarrenDanielDay/leetcode-typescript-workspace.git
# 通过 SSH
git clone git@github.com:DarrenDanielDay/leetcode-typescript-workspace.git
# 通过 GitHub CLI
gh repo clone DarrenDanielDay/leetcode-typescript-workspace
```

然后用 `vscode` 打开这个仓库。 如果您看到扩展推荐，请安装它 👈。

### 2. 安装依赖

您可以通过 `npm`、`yarn`、`pnpm` 或任何其他您喜欢的 `Node.JS` 包管理器安装依赖项。

```sh
# 通过 npm
npm install
# 通过 yarn
yarn install
# 通过 pnpm
pnpm install
```

### 3. 编写题解代码

支持的内置库：

- lodash@latest
- @datastructures-js/priority-queue@5.3.0 (和 `力扣`的 OJ 版本一致)
- @datastructures-js/queue@4.2.1 (和 `力扣`的 OJ 版本一致)

已知的全局库变量：

```ts
var _; // lodash
var Queue; // @datastructures-js/priority-queue
class MaxPriorityQueue {} // @datastructures-js/priority-queue
class MinPriorityQueue {} // @datastructures-js/priority-queue
class PriorityQueue {} // @datastructures-js/priority-queue
```

检查[`package.json`](./package.json)中的依赖版本。有关注入的详细信息，请参阅[global-libs.ts](./global-libs.ts)。

支持 `力扣` 的内置数据结构声明和实现：

- ListNode
- TreeNode
- NestedInteger (嵌套列表)

有关实现的详细信息，请参阅 [global-builtins.ts](./global-builtins.ts)。

关于如何使用 `LeetCode.vscode-leetcode` 创建、编写和提交你的题解代码到 `力扣`，请参阅[用户指引](https://github.com/LeetCode-OpenSource/vscode-leetcode)。

### 4. 编写测试用例

`LeetCode.vscode-leetcode` 不会将注释 `// @lc code=end` 下面的代码提交给 `力扣`，所以你可以在那里写测试代码。

您可以使用以下全局测试实用程序 API 编写测试代码：

- `test.Func`：测试`函数`
- `test.Class`：测试`class`
- `test.list`：`ListNode` 的工具函数
- `test.tree`：`TreeNode` 的工具函数
- `test.nested`：`NestedInteger` 的工具函数

但是**请记住不要在您的题解代码中使用这些 API**！ 他们不会在 `力扣` OJ 上正常工作！

有关更多 API 使用详细信息，请参阅以下演示题解代码文件。

- [2235.add-two-integers.ts](./2235.add-two-integers.ts)
- [206.reverse-list.ts](./206.reverse-list.ts)
- [232.implement-queue-using-stacks.ts](./232.implement-queue-using-stacks.ts)
- [226.invert-binary-tree.ts](./226.invert-binary-tree.ts)
- [341.flatten-nested-list-iterator.ts](./341.flatten-nested-list-iterator.ts)

### 5. 运行/调试

直接运行：

```sh
# 通过 npm
npm run lc:run ./<solution-file.js>
# 通过 yarn
yarn lc:run ./<solution-file.js>
# 通过 pnpm
pnpm lc:run ./<solution-file.js>
```

其中 `<solution-file.js>` 是由 `LeetCode.vscode-leetcode` 创建的题解文件。

使用 `vscode` 进行调试：

您可以在题解代码文件中添加断点。 当您的光标当前专注于题解代码文件时，只需按`F5`即可启动调试会话。

## TODO

就个人而言，这只是我在 `vscode` 中使用 `JavaScript/TypeScript` 解决 `力扣` 问题的解决方案。 如果对你有用，请推荐给你的朋友！

我还将在这个存储库中提交一些 `力扣` 问题的题解代码，但不是在 `main` 分支上，而是在我的个人分支上。

此外，欢迎贡献代码。 如果您有任何想法，请在 [`issues`](https://github.com/DarrenDanielDay/leetcode-typescript-workspace/issues) 中告诉我！

## 许可证

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

带有测试用例运行脚本的`vscode`工作区模板，适用于使用扩展`LeetCode.vscode-leetcode`的 JavaScript/TypeScript 程序员。

版权所有 (C) 2022 DarrenDanielDay <Darren_Daniel_Day@hotmail.com>

本程序是免费软件：您可以根据自由软件基金会发布的 GNU 通用公共许可条款（许可的第 3 版或（由您选择）任何更高版本）重新分发和/或修改它。

分发此程序的目的是希望它有用，但不提供任何保证； 甚至没有对适销性或特定用途适用性的默示保证。 有关详细信息，请参阅 GNU 通用公共许可证。

您应该已经收到了一份 GNU 通用公共许可证的副本以及该程序。 如果没有，请参阅 <https://www.gnu.org/licenses/>。

有关完整内容，请参阅 [LICENSE](./LICENSE)。
