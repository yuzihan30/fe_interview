<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-07 16:45:16
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-07 17:55:30
 * @FilePath: /fe_interview/后端/rust.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. Rust 2010年mozila推出
Rust的优点
相对其他编程语言，Rust的整体速度要快许多。这恐怕也是它如此流行的原因之一。
大幅减少了崩溃、测试和调试的时间和频率。
具有零成本抽象(Zero-cost abstraction)和运行时(runtime)的可预测行为。
阻止那些不受保护的内存访问。
Rust拥有广泛的支持社区。
Rust可与C、FFI(译者注：Foreign Function Interface)和许多其他语言进行互操作

2. Go的优点
Go的最大优点是简便。
它是一种以高效、简洁和顺磁性(paramagnetic)而著称的语言。
开发人员将受益于该语言极大的灵活性。
就代码的编译效率而言，它比任何其他编程语言都要迅速。
它与C#语言之间具有极强的互操作性。

3. Rust和Go比较
在性能方面，Go比Rust要慢很多
并发，各类应用程序的基本原则应该是：能够保障在平稳运行的同时，避免出现各类数据遭受损坏的风险。因此，我们往往需要通过任务之间的状态共享，来控制此类风险。那么就并发而言，Go的语法中会带有内置的并发性，而Rust并没有
开发速度：Go语言在开发和编译上的速度更加占优
内存管理：Rust使用编译策略进行内存管理。如果Rust程序中存在任何安全问题，它将在编译阶段无法被执行。Go语言虽然有着与Rust一样的内存安全性。但是由于Go的内存管理是在运行时自动处理的，因此有时可能会引起某些不可预见的问题。可见，Rust在内存管理方面比Go要更为可靠