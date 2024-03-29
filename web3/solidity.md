# solidity教程
## 实现第一个智能合约
在线remix编辑器： https://remix.ethereum.org
```solidity
// 第一行指定solidity版本号，尖角号代表只兼容0.4.0以后的版本，避免比0.4.0更老的编译器编译
// 但是不能被0.5.0及以上的编译器编译
pragma solidity ^0.4.0; // 严格加分号，代表一个语句的分割 

// 创建合约对象
contract HelloWorld {
    // 描述一个对象需要属性和行为
    // 添加属性或者状态，以太坊中喜欢用状态标识各种各种的东西
    string myName = "xxx"; // 其他语言的string类型存在内存，这里存在区块链上

    // 定义get方法获取名字, public代表可访问性，所有人可以访问; 
    // view指定这个方法不会修改, 是为了解决燃料而设计的
    function getName() public view returns(string) { // returns是个关键字
        return myName;
    }

    // 定义change方法改变名字，没有返回值不需要returns关键词
    function changeName(string _newName) public {
        myName = _newName;
    } 
}

// 编译成功之后，只是变成了一个可执行文件，可以部署到vm虚拟机上被识别执行，勾选auto后代码修改可自动编译
// 运行时，先选择JavaScript VM, 其他选默认，点击部署即可完成合约的部署
// 现在相当于将合约部署到了虚拟的以太坊区块链之上
// 如果想调用合约进行交互，点击面板生成的getName按钮，即可打印出0:string:xxx，0表示第一个值的序号
// 部署需要花费一定燃料，可以看到燃料减少了，因为view的限定，持续点击getName按钮并不消耗燃料
// 代码增多，部署时消耗gas会变多
// 添加changeName方法后重新编译部署后，填写修改值并点击面板changeName，会发现gas会一直减少
// 修改状态，所有节点都会同步，所以会消耗一定的燃料
```
## pure和view节约gas
view指定这个方法不会修改状态
function pureTest(string _name) public pure returns(string) { // pure永久的意思，传什么返回什么，连状态都不会去读取
    return _name;
}
changeName修改状态，需要全网同步，需要消耗很多资源
测试
## 真假bool值
Boolean.sol
```
pragma solidity ^0.4.0;

contract BooleanTest {
    bool _a; // 1. bool数据类型未初始化时默认返回false
    int num1 = 100;
    int num2 = 200;

    function getBool() returns(bool) {
        return _a;
    }
    function getBool2() returns(bool) {
        return !_a; // 2. 前面加！布尔值取反
    }
    function judge() returns(bool) {
        return num1 == num2; // 3. 用于判断
    }
    function judge2() returns(bool) {
        return num1 != num2; 
    }
    // 4. 与或非，&& || !
    function and() returns(bool) {
        return (num1 == num2) && true; // false
    }
    // || 
    function or() returns(bool) {
        return (num1 == num2) || true; // true
    }
}
```
## 整型特性与运算
Math.sol
```
pragma solidity ^0.4.0;

contract MathTest {
    // 1. 定义整型两种方式：int、uint
    int num1 = 100; // int可正可负，实际上是int256
    uint num2 = 200; // uint非负整型, 实际上是uint256
    uint8 num3 = 2; // uint8最大存储8位二进制, 最大值是255
    // 2. 加、减、乘、除、取余、幂运算
    function add(uint x, uint y) pure public returns(uint) {
        return x + y;
    }
    function sub(uint x, uint y) pure public returns(uint) {
        return x - y;
    }
    function multiply(uint x, uint y) pure public returns(uint) {
        return x * y;
    }
    function divide(uint x, uint y) pure public returns(uint) {
        return x / y;
    }
    function mod(uint x, uint y) pure public returns(uint) {
        return x % y;
    }
    // 幂运算
    function power(uint x, uint y) pure public returns(uint) {
        return x ** y;
    }
}
```
## 底层位运算
位运算在solidity中比其他语言更重要，是操作内存的最小单位，叫做位
`&、|、~、^、<<、>>`
```
pragma solidity ^0.4.0;

contract MathTest {
    // 1. 定义整型两种方式：int、uint
    int num1 = 100; // int可正可负，实际上是int256
    uint num2 = 200; // uint非负整型, 实际上是uint256
    uint8 num3 = 2; // uint8最大存储8位二进制, 最大值是255
    // 2. 加、减、乘、除、取余、幂运算
    function add(uint x, uint y) pure public returns(uint) {
        return x + y;
    }
    function sub(uint x, uint y) pure public returns(uint) {
        return x - y;
    }
    function multiply(uint x, uint y) pure public returns(uint) {
        return x * y;
    }
    function divide(uint x, uint y) pure public returns(uint) {
        return x / y;
    }
    function mod(uint x, uint y) pure public returns(uint) {
        return x % y;
    }
    // 幂运算
    function power(uint x, uint y) pure public returns(uint) {
        return x ** y;
    }

    uint8 a = 4;
    uint8 b = 3;
    // 按位与 &
    function bitAnd() view public returns(uint) {
        return a & b;
    }
    // 按位或 |
    function bitOr() view public returns(uint) {
        return a | b;
    }
    // 按位取反
    function bitNot() view public returns(uint) {
        return ~a;
    }
    // 异或
    function bitXor() view public returns(uint) {
        return a ^ b;
    }
    // 左移
    function leftMove() view public returns(uint) {
        return a << 1;
    }
    // 右移
    function rightMove() view public returns(uint) {
        return a >> 1;
    }
}
```
## 危险的整数溢出及常数处理
合适的时候使用合适类型，向上溢出向下溢出都会发生比较严重问题
```
// 向上溢出
function flow() view public returns(uint) {
    uint8 mm = 255;
    mm++;
    return mm;
}
// 向下溢出
function flow2() view public returns(uint) {
    uint8 mm = 0;
    mm--;
    return mm;
}
function errorTest() returns(int) {
    int a = 2;
    int b = 0;
    return a / b;
}
function errorTest2() {
    int a = 2;
    int b = -1;
    a << b;
}
function integerTest() returns(uint) {
    // solidity会先计算出右值再赋值
    uint num = (2**800+1) - 2**800;
    return num;
}
function integerTest2() returns(uint) {
    // solidity会先计算出右值再赋值
    uint num = 2/4*1000;
    return num;
}
function integerTest3() returns(uint) {
    // solidity会先计算出右值再赋值
    uint num = 11111111111111111111111111112 - 11111111111111111111111111111;
    return num;
}
```
红色按钮说明会耗费一些资源
retrieve	英[rɪˈtriːv]
美[rɪˈtriːv]
vt.	检索; 取回; 找回; 挽回; 索回; 检索数据; 扭转颓势;
n.	恢复;

ballot	英[ˈbælət]
美[ˈbælət]
n.	投票; 选票; (无记名)投票选举; (选举中的)投票总数;
v.	要求某人(对某事)无记名投票; 进行无记名投票;

delegation
英[ˌdelɪˈɡeɪʃn]
美[ˌdelɪˈɡeɪʃn]
n.	代表团; 委托; 委派;

denoted	英[dɪˈnəʊtɪd]
美[dɪˈnoʊtɪd]
v.	标志; 预示; 象征; 表示; 意指;
[词典]	denote的过去分词和过去式;

artifacts
英[ˈɑːtɪˌfækts]
美[ˈɑrtəˌfækts]
n.	史前古器物;工件、工具

