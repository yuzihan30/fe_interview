https://blog.typicode.com/husky-git-hooks-javascript-config/
为什么 husky 哈士奇放弃了传统的 JS 配置

> 关于我最喜欢的哈士奇新功能以及导致它的原因的简短说明。

## 背景

我在 husky 上工作了 7 年，解决了 600 个与 JavaScript 项目中的 Git hooks 相关的问题。 1 月份，大约 100 个问题与新版本一起关闭。

从 v0 开始，husky 使用 JavaScript 配置 Git 挂钩，可以使用 `.huskyrc.js` 文件或 `package.json` 中的字段。

现在 Git 钩子是使用 `.husky/ `目录中的钩子的单个文件配置的。

## 为什么突然改变？

一切都在变化和发展。 JS 生态系统已经发生了变化（yarn 已经被引入，monorepos 成为一种趋势，新工具和最佳实践出现了，甚至 npm 的工作方式也略有不同……）并且 Git 引入了一个令人兴奋的新功能。

但在谈论新配置及其好处之前，让我们先看看 husky 到目前为止所采取的方法。

## 哈士奇是如何工作的

以一种非常 Linux 的方式，要配置 Git 挂钩，您只需将可执行文本文件放在 `.git/hooks/ `中。

为了能够运行用户在 `.huskyrc.js` 中创建的任何 Git 钩子，husky 将所有可能的钩子安装在`.git/hooks/`中。

例如，当提交时，每个 Git 钩子都会检查` .huskyrc.js` 中是否有相应的钩子定义：

```
$ git commit

pre-commit (native) → husky/runner.js (node)
  → is a pre-commit defined in `.huskyrc.js`? → YES, run it

prepare-commit-msg (native) → husky/runner.js (node)
  → is a prepare-commit-msg defined in `.huskyrc.js`? → NO, do nothing

commit-msg (native) → husky/runner.js (node)
  → is a commit-msg defined in `.huskyrc.js`? → NO, do nothing

post-commit (native) → husky/runner.js (node)
  → is a post-commit defined in `.huskyrc.js`? → NO, do nothing
```

它的好处：用户可以从 `.huskyrc.js `添加、更新和删除钩子，并且会自动选择更改。

不利的一面是，即使没有任何东西可以运行，node 也会启动。

但是你可能会问，我们不能只安装所需的钩子吗？这是三年前设想的（#260），但哈士奇不再“自动工作”了。

例如，让我们考虑以下配置：

```
// .huskyrc.js
// .huskyrc.js
module.exports = {
  hooks: {
    'pre-commit': 'cmd'
  }
}
```

```
.git/hooks/pre-commit ← 以某种方式创建
```

然后你修改它：

```
// .huskyrc.js
// .huskyrc.js
module.exports = {
  hooks: {
    // 'pre-commit': 'cmd', ← removed
    'commit-msg': 'cmd'     ← added
  }
}
```

您的 .git/hooks 目录现在不一致：

```
.git/hooks/pre-commit ← 仍然存在
.git/hooks/commit-msg ← 不存在
```

由于你的钩子定义不再在一个地方，而是在两个地方（.huskyrc.js 和 .git/hooks/），突然你需要样板来保持 JS 世界与 Git 世界同步。

每次 .huskyrc.js 发生变化时，您（和您的合作者）都需要重新生成钩子。重新生成可能与某些事件绑定，但没有可靠的方法来涵盖所有可能的情况，并且会出现意外行为。这就是为什么这种方法被驳回的原因。

## 哈士奇新方法

**当你的抽象有缺陷时，通常是退步的信号。**

### 到目前为止，我们知道什么？

1. 按照设计，Git 挂钩配置是通过可执行脚本完成的。
2. 哈士奇最初的方法是一种间接的方法和一点魔法。
3. 从 JS 配置生成 Git 钩子可能会不同步。

### 我们可以用 Git 做得更好吗？

2016 年，Git 2.9 引入了 `core.hooksPath`。它让你告诉 Git 不要使用 `.git/hooks/ `而是另一个目录。

这就是新哈士奇的基础：

`husky install` 命令告诉 Git 使用 `.husky/ `作为 Git hooks 目录。
`husky add` 创建一个带有小包装器的独立 shell 脚本来支持一些附加功能。
它解决了第一个问题（不必要的 Git 挂钩）和第二个问题（将挂钩定义放在单独一个地方）。

换句话说，当你用新的 husky 创建一个 hook 时，它是纯 shell 并且可以直接访问。 Git 和你之间再也没有什么了 ❤️。我觉得很漂亮。

## 但…

> “有目录并不常见。”

这取决于，其他工具使用目录来存储配置。例如，一个 repo 可以有以下目录 `.vscode/`, `.github/`, `.storybook/`, ...

从技术上讲，它只是树层次结构中的另一个条目。 `.husky/ `目录不会比 `.huskyrc.js `文件增加更多的视觉混乱。

这也是 Git 钩子的设计方式，也是 husky 遵循这种方法的原因。

但是，您可以选择放置 `.husky/` 的位置。例如，它可以在 config/ 中与其他配置文件分组，供那些愿意的人使用。

> “像 Jest、ESLint、Prettier 等 JS 工具都是用 JS config 配置的，husky 是一个 JS 工具。”

你可以拥有 .jestrc.js、.eslintrc.js、.prettierrc.js，这是有道理的，因为它们完全是用 JS 编写的。

但是 husky 是个特例，它不是纯 JS，它是“混合”的。它与已经可以配置的非 JS 工具交互。

> “设置起来更难。”

Husky 带有一个`init`命令（推荐），你可以在几秒钟内完成。

```
$ npx @husky/init # 完成！
```

也就是说，手动设置 husky 只需要完成一次。您必须更改 `package.json` 中的一行并运行一个命令来添加一个钩子（仅此而已）。

这与` jest`、`eslint`的步骤数相同……将命令添加到 `package.json` 并创建一个文件 `.jestrc.js`、`.eslintrc.js`、……

（不过只有一个例外，如果您要发布一个包并同时使用 Yarn v2，则需要三行）

> “如果有 `core.hooksPath`，为什么还要使用 husky？”

Husky 提供了一些基于以前版本反馈的安全防护、用户友好的错误消息和一些附加功能。这是完全原生和一点用户友好性之间的平衡。

> “迁移会很复杂。”

有 husky-4-to-6 CLI 会自动为您完成。

## …但我仍然想在 package.json 中定义钩子

好消息！没有什么能阻止你这样做 :) 实际上，这很简单，运行以下命令：

```
$ npx husky add .husky/pre-commit "npm run pre-commit"
```

在你的`package.json`中创建一个预提交脚本：

```
// package.json
{
  "scripts": {
    "pre-commit": "npm test && eslint"
  }
}
```

你完成了。

## 结论

我希望它能让事情更清楚。几个月来，整个版本都经过仔细考虑，为 Git 钩子提供最佳方法，在保持 husky 4 主要功能的同时提供最大的灵活性。

总的来说，它更好地遵循了 Git 哲学和包管理器的建议。

使用 JS 格式配置来配置纯 JS 工具是有意义的。毕竟是同一种语言。

然而，当有原生的东西时，使用 JS 作为中间体来定义或运行 Git 钩子现在对我来说感觉很奇怪。就像用钳子 🛠️ 拿着锤子打钉子一样……你只需要锤子 🔨。

谢谢阅读。我知道这很新，如果您仍然不确定，请考虑给它 5 分钟。

我已经辞掉了工作，以便能够从事开源工作。非常感谢赞助这个版本的人和公司以及已经开始使用它的很棒的项目！

---

the downside 不利的一面
envisioned 设想
boilerplate 样板
dismissed 驳回
flaws 缺陷
plier 钳子
awesome 很棒的

explicitly 显式的
unplugged 被拔掉
consequences 影响
gist 要点

woof 哇

---

https://blog.typicode.com/husky-git-hooks-autoinstall/
为什么哈士奇不再自动安装

新 husky 的另一个变化是它不再自动安装 Git 挂钩。

相反，推荐的新方法是在 package.json 中有一个 `prepare`[^1] 脚本：

```
{
  "prepare": "husky install"
}
```

让我们看看为什么。

[^1] Yarn 2 有一个例外。

## 包管理器最佳实践

**多年来，包管理器不鼓励将后安装用于编译以外的任何事情。**

通过删除自动安装，新的 husky 是一个更好的公民，也是第一个支持 Yarn 2 零安装的版本（之前，它需要被拔掉）。

> 来自 npm 文档：最佳实践
>
> “您几乎不必显式设置预安装或安装脚本。如果您这样做，请考虑是否有其他选择。安装或预安装脚本的唯一有效用途是编译”

> 来自 Yarn 2 文档：关于后安装的说明
>
> “后安装脚本会对您的用户产生非常实际的影响...要点是我们认为后安装脚本不是一个可行的解决方案”

## 自动安装的最新问题

随着最近包管理器的改进（npm 7、Yarn 2），用户开始对 husky 4 自动安装问题进行复杂的调试。

它变得不那么可靠了：为了提供更快的安装，包管理器使用缓存（这非常好）。

因此，husky 4 后安装脚本现在并不总是运行。

例如，如果由于某些原因 husky 4 第一次安装失败，由于缓存，重新运行 npm install 将无法正常工作。

不再有输出：包管理器现在隐藏后安装输出。

没有更多确认已安装挂钩或信息消息来帮助用户调试问题。

这可能看起来不多，但在开源项目中，具有不同经验的用户可能会克隆一个项目。因此，拥有某种信息消息很重要。尤其是对于像 husky 这样具有很大副作用（更改 Git 钩子）的工具。

如果您认为后安装应该只用于编译，那么这些行为（一次性后安装，没有输出）是有意义的。

## 结论

husky 将自动安装降至：

- 遵循包管理器的最佳实践和演变
- 更加可靠和可预测
- 为具有不同经验的人保留用户友好的消息
