> 安装，mac 下：brew install sass/sass/sass
> sass --version 1.53.0
> 编译 scss 可以通过一些工具，也可以通过命令行
> mkdir css-sass && cd $\_ 创建并进入这个目录
> sass sass/style.scss:css/style.css // 编译
> 自动编译 scss，文件或者目录发生变化后自动帮我们编译
> sass --watch sass:css 可以修改输出的 css 格式
> nested 嵌套，compact 紧凑，expanded 扩展，compressed 压缩；默认输出格式是嵌套，最新 1.53.0 版本默认应该是 expanded 扩展格式，就是我们手工书写的格式
> sass --watch sass:css --style compact 每一块的样式都会在单独的同一行里面
> sass -i 进入 sass 的命令行交互模式

1. scss 是 sass 的升级版, sass 3.0 时改叫 sassy(粗略，时髦自信的) css, 扩展名由.sass 改为.scss。语法也由缩进改为嵌套形式

2. sass 和 scss 区别

- sass 是缩进式写法，多行注释不需要用\*/关闭， 单行注释// 其他行只需要跟第一行注释的缩进就行
- sass 导入，导入的文件不需要引号
- 定义 mixin, scss 中@mixin alert, 且主体放入花括号，内部每行代码结束的地方需要用分号， 引用时需要@include alert；sass 的缩进式的 mixin, 只需要=alert, 不需要使用花括号不需要使用分号只需要缩进就可以了, 引入时+alert
- scss 写嵌套时都需要花括号，sass 只需要缩进

3. 变量

- 定义完后，使用时可以使用变量作为属性的值
- 声明定义一个变量，`$`符号，`$primary-color: #666666`
- 变量里可以有多个值，而且里面可以引用其它变量 `border: 1px solid $primary-color`
- 定义和使用时中划线和下划线可以交替使用，比如定义的时候`$primary-color`，使用的时候可以`$primary_color`

4. 嵌套选择器
   嵌套的三种应用场景

- 相当于写选择器时抽离出重复的部分，编译后父类和子类选择器中间加空格
- 嵌套时调用父选择器，主要针对伪类选择器，编译后父类和子类中间不加空格
- 引用父选择器
  ```css
  a {
    display: block;
    &:hover {
      // &调用父选择器
      color: #fff;
    }
  }
  .nav {
    // &引用父选择器
    & &-text {
      font-size: 15px;
    }
    // .nav .nav-text
  }
  ```

5.  属性嵌套
    嵌套也可以用在属性里面叫属性嵌套, 编译后属性中间加中划线
    `css body { font: { family: Arial size: 14px } } .nav { border: 1px solid #000 { left: 0; right: 0; } } `

6.  mixin
    可以想象成一块用名字定义好的样式，在任何地方可以去重复的使用它
    定义的时候可以加参数， @mixin name (参数) { 这里面可以使用 scss 的其他特性比如嵌套、函数等 }
    参数和变量的定义方式一样，需要加$符

    ```css
    @mixin alert($text-color, $background) {
      color: $text-color;
      background-color: $background;
      a {
        color: darken($text-color, 10%); // darken 可以加深指定的颜色
      }
    }
    .alert-warning {
      @include alert(#666666, #555555) // 也可以使用命名参数，这样就不用在意顺序了（$background: #555555, $text-color: #666666）
    ;
    }
    ```

7.  @extend
    用扩展或者继承减少重复的动作，功能是让一个选择器去继承另一个选择器内所有的样式
    `css .alert { padding: 10px; } .alert-info { @extend .alert; background-color: #fff } // 编译后会使用群组选择器 .alert, .alert-info { padding: 10px; } // 另外 alert 相关的样式也会继承下来 .alert a { font-weight: bold } // 编译后 .alert a, .alert-info a { font-weight: bold } `

8.  @import
    每次使用都会发送一次新的 http 请求，去下载被导入的 css 文件， 而 scss 扩展了它的功能，可以在一个 scss 文件里将其他 scss 文件包含进来；这样就可以将小的部分 partials(文件的名字用下划线开头)，包含到一个 scss 文件，最终会一起编译；编译的时候就不会把 partials 编译成 css，而是在 import 后同一编译，让样式模块化也更有条理；引入时@import "base"不需要加下划线及文件名后缀

9.  注释
    单行、多行、强制注释
    多行注释会在编译输出后的 css 中保留，在压缩输出的 css 中会去掉
    单行注释不会在编译输出后的 css 中
    强制注释是第一行中使用!的多行注释，这样的注释会一直出现在 css 中
    /_! 强制输出注释 _/
    sass --watch sass:css --style expanded/compressed(压缩的方式输出 css)

10. 数值类型
    数字、字符串、颜色、列表等， +号可以连接两个字符串类型的数据， 数字可以运算
    scss 中自带的一些函数可以处理这些不同类型的数据
    sass 交互功能，sass -i
    type-of(5 或者 5px), 输出“number”,说明是数字或者带单位的数字
    type-of(hello 或者“hello”) 输出"string"，说明是字符串或者加引号的字符串
    type-of(1px solid #000 或者 5px 6px) 输出“list”, 列表数据就是中间用空格或者逗号分开
    type-of(rgb(255, 255, 0)或者#fff 或者 red 或者 hsl(0, 100%, 50%))输出"color"
    加减乘除都能用：
    font: 14px/1.5 serif // 14px 是字号，1.8\*14px 是行间距；运算时可以保留单位，5px + 2
    数字函数
    abs();round()四舍五入；进一位 ceil();退一位 floor();将一个数变成百分比 percentage(65px / 100px);最小数 min(1,2,3),最大数 max(1,2,3)

11. 字符串 string
    带引号和不带引号区别,带引号的里面可以包含空格，还有一些特殊的符号；常用在字符串的操作符就是加号"hello" + sass 得到"hellosass",真实情况下的输出是，带引号连接不带引号会输出带引号字符串，反过来则输出不带引号；”hello“ + 8080 输出”hello8080“, hello - css 输出"hello-css"; hello / css 输出”hellp/css“;hello \* css 会报错
12. 字符串函数
    $greeting: "Hello sass" 这个变量可以作为函数的参数
    to-upper-case($greeting)可以把变量里的字符全变大写
    to-lower-case($greeting)
    str-length($greeting)
    str-index($greeting, 'Hello') // 1, 索引值从1开始
    str-insert($greeting, '.net', 14) // 最后是指定要插入的位置
13. 颜色
    Hex 16 进制数字 #ff0000
    RGB(255, 0, 0), RGB 表示红绿蓝分别占了多少
    String: red, green
    浏览器中样式 computed 面板，点一下 color:red 会切换不同的方式表示颜色，16 进制简写、16 进制完整方式表示，再点会切换成 rgb 的方式，再点会变成 hsl（0， 100%， 50%）表示的，h 就是 hue 色相，s 表示 saturate 饱和度，l 表示 lightness 明度；scss 支持所有这种颜色的写法，还可以用操作符操作这些颜色的值，另外还提供了一些处理这些颜色的函数

- rgb 和 rgba
  rgb()红绿蓝的数量 255 内或者百分比表示; alpha 表示 0-1 之间的数字, 0 表示完全透明，1 表示完全不透明
- hsl 和 hsla
  HSL 色相 0-360 度， 饱和度 0-100%， 明度 0-100%; a 同 rgba 中的 apha
- adjust-hue 可以调整颜色色相的值 hue,
  第一个参数要调整的颜色，第二个参数是要调整的色相的度数
  adjust-hue($base-color-hsl, 137deg)，deg 也可以不加，加更清楚一些，角度的意思
- lighten 和 darken
  该变颜色明度
  $base-color: hsl(222, 100%, 50%);
$light-color: lighten($base-color, 30%); // 第二个参数要给颜色增加的明度，将明度增加到 80%
$dark-color: darken($base-color, 20%); // 第二个参数将明度降低 20%

- saturate 和 desaturate
  saturate 可以增加颜色的纯度，也就是饱和度
  也可以 16 进制颜色交给这两个函数处理
  `$saturate-color: saturate($base-color, 50%)`;增加 50%就是 100%
  background-color: $desaturate-color;
- transparentize 和 opacify
  transparentize 让颜色变得更透明, opacify 增加不透明度
  修改颜色的 alpha 值
  `$fade-in-color: opacify($base-color, 0.3)` // 第二个值是增加的不透明度的值
  `$fade-out-color: transparentize($base-color, 0.2)` // 第二个是增加的透明度或者减小的不透明度

14. list 列表
    列表里的值可以使用空格分开或者逗号分开
    border: 1px solid #000 // border 值就是一个列表
    font-family: Courier, "Lucida Consol", monospace // font-family 值就是一个列表
    padding: 5px 10px, 5px 0 // 列表的值是个列表
    padding: (5px 10px) (5px 0) // 也可以，编译成 css 的时候，会去掉括号

- 列表函数
  列表像其他语言的数组，sass -i 交互可以测试 list 的函数
  length(5px 10px)// 计算列表的长度， 列表里每个元素都对应一个序号或者索引号，从 1 开始
  nth(5px 10px, 1) // 得到对应序号列表里的项，第一个参数是列表，第二个参数是列表项索引
  index(1px solid red, solid) // 得到列表里项的序号
  append(5px 10px, 5px) // 插入新的列表值
  append(5px 10px, 5px, ) // 第三个参数指定返回列表的分割符，space\common\auto
  join(5px 10px, 5px 0) // 将两个列表组合成一个列表
  join(5px 10px, 5px 0, comma) // 也可以传第三个参数，传分割符，逗号

15. map 及相关函数
    项目名值对的列表
    `$map: (key1: value1, key2: value2)`
    `$colors: (light: #ffffff, dark: #000000)`
    用到列表上的函数同样可以处理 map 上的数据， `length($colors)`结果为 2；另外还有专门处理 map 类型数据的函数,map-get 根据项目名字得到对应值, `map-get($colors, dark)`, map-keys(colors)得到项目里所有的 keys 列表, `map-value（$colors）`找出项目中所有值,判断 map 数据里是否有指定的 key 项`map-has-key($colors, light)`, `map-has-key($colors, gray)`,`map-merge($colors, (light-gray: #e5e5e5))`将两个 map 合并到一块，`map-remove($colors, gray,light)`从 map 里移除一个或者多个项目
16. Boolean 布尔值
    5px > 3px true 还有 ==、<
    另外支持 and、or、not
    (5px > 3px) and (5px > 10px)
    not(5px > 3px)
17. Interpolation
    可以让我们把一个值插入到另一个值里面，把变量后者表达式放到#{}里面
    可以将一个值插入另一个值里，在样式选择器或者属性上使用变量或者表达式 #{}

    ```sass
    $version: "0.0.1";
    // 注释里用到版本号
    /* 当前的版本：$version */
    $name: "info";
    $attr: "border";

    .alert-#{$name} {
      #{$attr}-color: #ccc;
    }

    ```

18. 控制指令 Control Directives

    ```css
    // @if、@for
    $columns: 4;
    @for $i from 1 through $columns {
      .col-#{$i} {
        width: 100% / $columns * $i;
      }
    }
    $icons: success error warning;

    // 根据列表每一项输出一些样式
    @each $icon in $icons {
      .icon-#{$icon} {
        background-image: url(../images/icons/#{$icon}.png);
      }
    }

    $i: 6;

    @while $i > 0 {
      .item-#{$i} {
        width: 5px * $i;
      }
      $i: $i - 2;
    }
    ```

- @if

  ```css
  $use-prefixes: true;
  $theme: "dark";
  body {
    @if $theme == dark {
      background-color: black;
    } @else if $theme == light {
      background-color: white;
    } @else {
      background-color: gray;
    }
  }
  .rounded {
    @if $use-prefixes {
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
    }
    border-radius: 50%;
  }
  ```

- @for
  重复一定次数输出一些样式
  @for $var from <开始值> through/to <结束值> {}
through/to 停止循环的位置不同， to 不包含结束值的循环
	```css
	// 根据使用网格的数量设置不同网格的宽度
	$columns: 4;
	@for $i from 1 through $columns {
	  .col-#{$i} {
  width: 100% / $columns \* $i;
  }
  }
  ```

- @each
  根据列表中每一项生成特定的样式
  @each $var in $list {}

      ```css
      $icons: success error warning;

      // 根据列表每一项输出一些样式
      @each $icon in $icons {
        .icon-#{$icon} {
          background-image: url(../images/icons/#{$icon}.png);
        }
      }
      ```

- @while
  @while 条件 {}
  // 比 for 更灵活的处理循环
  `css $i: 6; @while $i > 0 { .item-#{$i} { width: 5px * $i; } $i: $i - 2; } `

19. 函数
    @funtion 名称（参数 1，参数 2） {}

    ```css
    $color: (
      light: #ffffff,
      dark: #000000,
    );

    @function color($key) {
      @return map-get($color, $key);
    }
    body {
      background-color: color(light);
    }
    ```

20. 错误与警告信息
    @warn、@error

    ```css
    $color: (
      light: #ffffff,
      dark: #000000,
    );

    @function color($key) {
      @if not map-has-key($color, $key) {
        // @warn "在 $color 里没有#{$key}这个key";
        @error "在 $color 里没有#{$key}这个key";
      }
      @return map-get($color, $key);
    }
    body {
      // background-color: color(light);
      background-color: color(gray);
    }
    ```
