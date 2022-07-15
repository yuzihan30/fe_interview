
prettier	英[ˈprɪtɪə]
美[ˈprɪtiər]
adv.	颇; 相当; 十分; 非常; 极; 很;
adj.	漂亮的; 标致的; 妩媚的; 动人的; 赏心悦目的; 动听的; 美观的; 精致的;
[词典]	pretty的比较级;

## .prettierrc.js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'auto',
};

## .prettierignore
**/*.md
**/*.svg
**/*.ejs
**/*.html
package.json
.umi
.umi-production
.umi-test'

## vscode setting
/*  prettier的配置 */
    "prettier.printWidth": 100, // 超过最大值换行
    "prettier.tabWidth": 4, // 缩进字节数
    "prettier.useTabs": false, // 缩进不使用tab，使用空格
    "prettier.semi": true, // 句尾添加分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false,
    "terminal.integrated.allowMnemonics": true,
    "terminal.integrated.automationShell.linux": "" // 不让prettier使用tslint的代码格式进行校验
///报错的话，检查一下有没有用逗号与上一项设置分隔

## 和eslint关系
Linters的功能概述
ESLint、StyleLint、TSLint(已废弃)都属于Linters，它们通过对代码的AST进行分析，并按照一系列可配置的规则，为用户提供代码校验的功能。他们的规则主要分为两大类：Formatting Rules和Code-quality Rules。
通常，Linters的客户端还会提供修复功能(--fix)，我们常用的IDE借助这些客户端便可以实现代码自动修复的功能。那么，既然Linters已经可以自动修复了，为什么我们还要用Prettier。
Linters没有解决的问题
Linters的自动修复是基于上述两种规则：Formatting和Code-quality。在Code-quality上，Linters做的做够好了，像no-unused-vars、no-extra-bind、no-undef等。但是在Formatting上，Linters虽然能在一定程度上保证代码的格式，像max-len、no-mixed-spaces-and-tabs、keyword-spacing等, 但是在书写工业化代码的时候，我们会有更高的要求：保证团队的代码风格完全一致。举个例子：
在不超出max-len的条件下，如下两种写法Linters都是允许的：


// 小明写的
const {a, b, c} = obj
// 小李写的
const {
	a,
  b,
  c,
} = obj
复制代码


这就导致在仅使用Linters的进行格式化场景下，一个团队写出的代码可能千人千面，这其实不满足我们对于工业化代码的要求。但是如果使用Prettier，最终的格式化效果只会是这两种其中的一种。
Prettier的功能概述
Prettier是一个多语言支持的代码格式化工具，它也是通过AST解析代码，然后以一个特定的格式输出格式化后的代码。相比Linters，Prettier没有那么多针语言语法的规则，而是一个纯粹的代码格式化工具，在Prettier看来，任何东西都是可以格式化的。
因此，Prettier和Linter在代码格式化的思路上是不一样的：


Linters的格式化思路是：给我一个规则，如果不符合这个规则，我才会去格式化。


Prettier的格式化思路是：给我一个规则，如果不符合这个规则，我按照A格式格式化，如果符合这个规则，我按照B格式格式化。


按照上述思路，举个例子，相比于上面的max-len，Prettier的printWidth逻辑会有所不同：


max-len：如果不超过这个长度，Linters就不会格式化；如果超过了这个长度，会格式化。


printWidth：如果不超过这个长度，按照A格式格式化；如果超过了这个长度，按照B格式格式化。


所以在这个过程中，代码的风格差异性被抹除了，不管你怎么写，Prettier格式化后的代码格式总是一样的。
Linters和Prettier之间是否会有冲突？
是的，在Formatting Rules上会有冲突。举个例子，如果max-len设为100，而printWidth设为120，而你写的代码长度为110，这个时候这两个规则就会冲突。因此我们需要一些措施来解决这个问题。
配合使用Linters和Prettier
有两种思路：


先用Prettier格式化，再用Linters格式化


使用Linters按照Prettier的规则格式化（最佳实践）


对于第1种思路，一般是使用prettier-eslint这个库，按照code -> prettier -> eslint --fix的流程格式化代码，因此它不得不格式化两次才能完成操作，会有性能问题，所以目前已经不推荐这个方案了。
接下来主要讨论第2种思路：使用Linters按照Prettier的规则格式化
代码格式化的最佳实践
Prettier将会作为Linters中Formatting Rules的完全替代品参与到代码格式化的过程中。为了达成这个目标，我们有两件事需要做：


禁用掉Linters中所有与Prettier冲突的Formatting Rules


针对Prettier自身的规则，使用Prettier进行格式化


这两件事需要分别借助两个库来实现，为了方便分析，我们以JS代码格式化为例：


使用eslint-config-prettier禁用掉ESLint中与Prettier冲突的规则


使用eslint-plugin-prettier添加ESLint的Prettier功能的实现




在这里需要理解eslint-config-xxx和eslint-plugin-xxx的区别：


eslint-config-xxx: 表示一系列可以被继承的eslint规则
eslint-plugin-xxx: 表示一个功能的具体实现代码



有了这两个库，在稍微修改一下eslint配置即可：



module.exports = {
  plugins: ['prettier'], // eslint-plugin-prettier的缩写
  extends: [
    'prettier', // eslint-config-prettier的缩写
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}
“prettier/prettier”: “error”，表示被prettier标记的地方抛出错误信息。
因此，使用Linters+Prettier进行代码格式化的最佳实践套路即是：-plugin-prettier + -config-prettier，不同语言之间大同小异。

