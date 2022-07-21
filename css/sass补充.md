Heads up 小心
& 用在嵌套的scss代码里，来引用父元素

.dashboard {
&-container {
margin: 30px;
}
&-text {
font-size: 30px;
line-height: 46px;
}
}

## @use、@forward
@use和@import区别，@use带命名空间
SCSS SYNTAX
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
// style.scss
@use 'foundation/code';
@use 'foundation/lists';
@forward引入的需要@use引入一下才能使用
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
// bootstrap.scss
@forward "src/list";
// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}