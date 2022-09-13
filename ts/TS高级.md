## TS 类型保护

类型保护是指缩小类型的范围，在一定的块级作用域内由编译器推导其类型，提示并规避不合法的操作，提高代码质量。
类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。
我们可以通过 typeof、instanceof、in、is 和字面量类型将代码分割成范围更小的代码块，在这一块中，变量的类型是确定的。
https://blog.csdn.net/zxl1990_ok/article/details/125187314
https://www.jianshu.com/p/37dfe01779df
https://www.jianshu.com/p/57df3cb66d3d

## js 重构为 TS

> https://blog.csdn.net/HaoDaWang/article/details/81119840

`@ts-check`是一种平滑方案
如果我们现在已经有了一个项目，项目已经很大了， 意识到 js 的动态类型带来许多类型上的错误，实在使得开发过程，debug 过程都很不愉快，于是想着用 ts 来重构，这将是一件极为痛苦的事情，要把那么多的代码按照 ts 的标准重构，不仅花费大量的时间，甚至还需要大量的精力。

有没有一种不改变现有的代码结构的方法，来使得我们避开动态类型的坑呢？答案是能行的，不妨试试@ts-check，在文档的开头打上单行注释//@ts-check，是不是很简单。再搭配上 vscode，在违反一些类型上的错误的时候，vscode 会帮助你勘测到错误在哪儿，虽然运行还是能运行，但是实际上开发的逻辑层面已经被类型给规范了

通过@extends 可以说明子类继承的父类，比如还可以通过@param 说明参数的类型，@return 说明返回值，@abstract 说明抽象的方法或者类…你可能发现了，这不就是 JSDOC 吗？？是的，语法就是 JSDOC，因此，我们还能通过 JSDOC 来生成一些文档，来说明自己的代码，尤其是你开发了一堆的 API 来供别人使用的时候，那将是一份很好的说明文档

## ?和！
一、？（问号）操作符
　　在TypeScript里面，有4个地方会出现问号操作符，他们分别是：

1、三元运算符
// 当 isNumber(input) 为 True 是返回 ? : 之间的部分； isNumber(input) 为 False 时，返回 : ; 之间的部分
const a = isNumber(input) ? input : String(input);
2、参数
// 这里的 ？表示这个参数 field 是一个可选参数
function getUser(user: string, field?: string) { }
3、成员
复制代码
// 这里的？表示这个name属性有可能不存在
class A {
  name?: string
}

interface B {
  name?: string
}
复制代码
4、安全链式调用
复制代码
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
return new Error().stack.split('\n');

// 我们可以添加?操作符，当stack属性存在时，调用 stack.split。若stack不存在，则返回空
return new Error().stack?.split('\n');

// 以上代码等同以下代码
const err = new Error();
return err.stack && err.stack.split('\n');
复制代码
二、！（感叹号）操作符
　　在TypeScript里面有3个地方会出现感叹号操作符，他们分别是：

1、一元运算符
// ! 就是将之后的结果取反，比如：
// 当 isNumber(input) 为 True 时返回 False； isNumber(input) 为 False 时返回True
const a = !isNumber(input);
2、成员
复制代码
// 因为接口B里面name被定义为可空的值，但是实际情况是不为空的，那么我们就可以
// 通过在class里面使用！，重新强调了name这个不为空值
class A implemented B {
  name!: string
}

interface B {
  name?: string
}
复制代码
3、强制链式调用
复制代码
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
new Error().stack.split('\n');

// 我们确信这个字段100%出现，那么就可以添加！，强调这个字段一定存在
new Error().stack!.split('\n');
