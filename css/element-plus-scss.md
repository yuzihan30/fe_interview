## var.scss
内置变量就是系统内置模块中的变量

例如：数学模块

@use "sass:math";
内置变量禁止修改

0x02 内置模块别名
写法一：

@use "sass:math" as m;
@debug m.$pi;
写法二：

@use "sass:math" as *;
@debug $pi;
当别名起为*的时候，使用时就可以省略别名

我们可以在导入时添加as <name>来改变或删除默认的命名空间：

@use 'buttons' as *; // 星号会删除所有命名空间
@use 'forms' as 'f';
 
$btn-color: $color; // 不带命名空间的buttons.$color
$form-border: f.$input-border; // 带有自定义命名空间的forms.$input-border
使用as *将模块添加到根名称空间，因此不需要前缀，但这些成员仍然在当前文档的本地作用域内。

用@forward传递文件
我们并不总是需要使用一个文件，并访问它的成员。有时我们只是想把它传给未来的导入操作。假设我们有多个与表单相关的partials，我们希望将它们全部导入为一个命名空间。我们可以用 @forward来实现：

// forms/_index.scss
@forward 'input';
@forward 'textarea';
@forward 'select';
@forward 'buttons';
被转发的文件的成员在当前文档中不可访问，也没有创建命名空间，但是当另一个文件想要@use 或@forward 整个集合时，这些变量、函数和mixin 就是可访问的。如果转发的部分包含实际的CSS，那么在使用包之前，它也不会生成输出。在这一点上，它将被视为单个模块与单个命名空间:

// styles.scss
@use 'forms'; // 导入`forms` 命名空间下的所有被转发的成员
注：如果你要求Sass导入一个目录，它会寻找一个名为index或_index的文件)

默认情况下，所有公共成员将使用一个模块进行转发。但我们可以更有选择性地添加show 或hide语句，来包含或排除指定的成员：

// 只转发'input' 中的 border() mixin 和 $border-color 变量
@forward 'input' show border, $border-color;
 
// 转发'buttons' 里的所有成员， gradient() 函数除外
@forward 'buttons' hide gradient;
注意：当函数和mixin共享一个名称时，它们会一起显示和隐藏。

为了区分来源，或避免转发模块之间的命名冲突，我们可以在转发时对模块成员使用as 前缀：

// forms/_index.scss
// @forward "<url>" as <prefix>-*;
// 假设两个模块都有一个background() mixin
@forward 'input' as input-*;
@forward 'buttons' as btn-*;
 
// style.scss
@use 'forms';
@include forms.input-background();
@include forms.btn-background();
而且，如果需要，我们可以对同一模块同时使用 @use和@forward ：

@forward 'forms';

其实Inspect()函数用的比较少，主要是用来做校验类型的。Inspect(…)表达式中的内容如果是正常会返回对应的内容，如果发生错误则会弹出一个错误提示。
str-slice	从字符串中截取子字符串，允许设置始末位置，未指定结束索引值则默认截取到字符串末尾
str-index	返回 substring 子字符串第一次在 string 中出现的位置。

## @at-root
　　默认 @at-root 只会跳出选择器嵌套，而不能跳出 @media 或 @support，如果要跳出这两种，则需使用 @at-root(without: media)，@at-root(without: support)。这个语法的关键词有

四个：all（表示所有）, rule（表示常规）,  media（表示 media），support（表示 support ）。我们默认的 @at-root 其实就是 @at-root( without: rule )。

　　(1)、@at-root(without: rule)

　　rule 关键词只能跳出选择器嵌套，不能跳出 @media 和 @support

　　（2）、@at-root(without: media)

　　可以跳出 @media ，但是没有跳出父级选择器



chalk	英[tʃɔːk]
美[tʃɑːk]
n.	(白色或彩色的)粉笔; 白垩;


