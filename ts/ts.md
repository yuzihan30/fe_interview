<!--
 * @Author: your name
 * @Date: 2022-04-15 13:46:56
 * @LastEditTime: 2022-06-10 10:51:05
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/ts/ts.md
-->
编译：tsc xx.ts -> xx.js
1. 对象类型限制
let a: {name: string, age?: number} 问号表示属性有也行，没有也行
let a: {name: string, [propName: string]: any} 表示后面可以有任意多的任意类型的其他属性
2. 函数类型限制
let d: (a: number, b: number) => number
3. 数组常用语限定数组元素类型，let e: string[] 字符串数组，或者 let e:Array<string>
限定类型不建议用any, 尽量明确
4. ts基于js扩展的类型，元组：长度固定的数组，存储效率要高些
let h: [string, string]
5. enum Gender {
    male, // 默认会设置成0, 可以手动设置其他值，但是没必要
    female // 默认会设置成1
}
6. 或，与
let i : string | number
let j : { name: string } & { age: number }
j = {
    name: 'jame',
    age: 18
}
7. 类型别名(简化类型使用): type myType = 1 | 2 | 3
8. 编译选项，tsc xx.ts -w 监控文件的变化，如果变化自动执行编译
tsconfig.json配置文件可以配置监控所有文件，即使里面没有内容比如{}，执行tsc -w 也能监控所有ts文件。通常的json文件是不能写注释的，但tsconfig.json可以写注释
{
    "include": [
        "./src/**/*" // 两星任意目录，一星任意文件
    ], // include置顶哪些ts文件需要被编译
    "exclude": [
        "./src/hello/**/*"
    ], // exclude指不需要被编译的文件目录，一般不用设置，默认值是["node_modules", "bower_components"]
    "extends": "./configs/base", // 继承的外部文件xx.json，类似于import的外部文件
    "files": [], 类似于include, 只是files直接设置哪些文件，include是哪些目录下的文件，files用着比较麻烦一般用在项目比较小，只有很少的ts文件
}

9. ts编辑只做一些简单的转换，promise等新语法的转换需要用到babel, @babel/preset-env兼容不同浏览器，core-js提供运行js的虚拟环境， loader加载器的执行顺序是从后往前执行（ts-loader放后面先把ts转为js，babel-loader把新js转为旧的js）,chrome新浏览器对ES6的兼容性比较好， IE11支持不太好比如不支持const、箭头函数等

10. 实例属性前加readonly会变成只读，属性前加static会变成静态属性，可以一起用，但顺序只能是static readonly
实例方法，sayHello() {}, 前面也可以加static, 静态方法用的不多
创建不同的实例需要name:string; age:number, constructor(name:string, age:number) { this.name = name; this.age = age }
需要重点记住一个区别，constructor中this指向实例，而实例方法中的this指向方法的调用者（这个调用者可能是实例，也可能是绑定时间的按钮）constructor(name:string, age:number) { this.name = name; this.age = age; this.btn.onclick = this.sing }

########## TS数据类型相关 ########
1. 类型断言：as string, 当你比程序更确定类型的时候使用，比如某个函数的入参有类型限制，但此时传的参数程序无法判断出类型，就会提示有问题，而此时你能确定实参的类型就可以给实参加上类型断言

2. 基础类型
支持js类型，同时提供枚举类型
- 布尔类型，let flag:boolean = true
- 数字number,和js一样都是浮点数；除了支持10和16进制，还支持ES6引入的2和8进制; let a2: number = 0b1010, let a3: number = 0o12, let a3: number = 0xa
- string,表示文本数据类型，let str1: string = 'xx';支持字符串和数字之间拼接
- 小结：ts一开始是什么类型，后面赋值也必须是什么类型
- undefined和null,各自有自己的类型，也是其他所有类型的子类型；let und: undefined = undefined, let nll: null = null； 可以赋值给其他类型，需要把ts配置的严格模式配置为false, "strict": false, 示例let num2: number = undefined
- 数组和元组，数组定义方式：let arr1: number[] = [10, 20, 30]或者let arr2: Array<number> = [10, 20 ,30](泛型写法)；注意问题：number类型数组里不能有其他类型；要想数组里有不同类型，就需要元组，let arr3: [string, number, boolean] = ['xx', 100, true],类型的位置和个数一开始就确定了
- 枚举，定义一些个数固定且常用的数据，比如性别，里面的数据叫元素，每个元素都有自己的编号，且编号依次递增加1；enum Color { red, green, blue }， 下面定义一个枚举变量接收枚举值，let color: Color = Color.red, console.log(Color.red, Color.green, Color.blue) // 0, 1, 2; 可以手动改值，enum Color { red=100 green, blue }， 但很少这样做；由枚举值可以拿到它的名字，console.log(Color[2]) // blue
- any类型，适用于当前不知道是什么数据类型，又想把它存储起来，let str: any = 100, str = 'xx'；let arr: any[] = [100, 'xx']当一个数组中存储的数据类型不确定，个数不确定时适用；有好也有坏，就是没有类型错误提示信息
- void, 没有任何类型，用在函数声明的时候function showMsg(): void {},代表的是该函数没有任何返回值;let vd: void = undefined, 这样没多大意义，定义一个void类型的变量，接收undefined类型数据
- object表示非原始类型，function getObj(obj: object): object {
    console.log(obj)
    return {
        name: 'xx',
        age: 18
    }
}
- 联合类型，表示取值可以为多种类型中的一种， function getStr(str: number | string): string {
    return str.toString()
}
- 类型断言, 可以告诉编译器，“相信我,我知道自己在做什么", 类似于其他语言的类型转换，但不进行特殊的类型检查和解构，它没有运行时的影响，只在编译阶段起作用；两种写法，一种尖括号，一种as；如果str本身是string类型，就没有必要调用toString方法， function getLen(str: number | string): number) {
    if (str.length) { // 有问题，空字符串没有考虑;这个时候还有提示信息，不知道此时是number还是string类型;类型断言，(<string>str).length或者(str as string).length;可以解决错误的提示信息
    // str.length存在说明是string类型
        return str.length // return (<string>str).length
    } else {
        str.toString().length
    }
}
- 类型推断, 没有明确指定类型的时候推测出一个类型，先let txt = 100,推断出number类型 再赋值txt = 'xx'就不行；定义一个变量没有赋值，推断为any类型，let a, a = 10, a = 'xx'

- 常见问题
    * any、never和unknown的关系
any
any 是任意值类型，定义为 any 类型的变量允许被赋值为任意类型。
let myFavoriteNumber: any = 'seven'
myFavoriteNumber = 7
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型，也就是说声明为 any 类型和写 JS 没啥区别
never
never 类型表示的是那些永不存在的值的类型。例如一个抛出异常的函数，一个永远不会返回的函数的返回值类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
never 类型是任何类型的子类型，可以赋值给任意类型。但是没有类型是 never 类型的子类型，即使是 any 类型也不能赋值给 never 类型
unknown
unknown 类型是 ts 中所有基础类型的父类型，所有基础类型都能赋值为 unknown 类型。
但是当 unknown 类型赋值为其他任意类型时，就会进行类型检查。我们必须将这个 unknown 类型的变量断言为具体的类型，才可以继续使用。
所以 any 和 unknown 的区别就是：
二者都是可以赋值给任意类型的， any 会绕过类型检查，直接可用；而 unkonwn 则必须要在判断完它是什么类型之后才能继续使用

3. 接口
TS核心是对值所具有的结构进行类型检查， 接口可以定义对象的类型
定义一个接口，该接口作为person对象的类型使用，限定或者是约束该对象中的属性数据
interface IPerson {
    readonly id: number // readonly定义只读属性
    name: string
    age: number
    sex?: string // ?可有可无的
}
变量限制属性只读用const, 属性限制只读用readonly
- 函数类型，函数类型需要通过接口来实现，需要给接口定义一个调用签名
interface ISearchFunc {
    // 定义一个调用签名, 就像一个只有参数列表和返回值类型的函数定义
    (source: string, subString: string): boolean
}
// 示例：定义一个函数，它的类型就是ISearchFunc接口
const searchString: ISearchFunc = function (source: string, subString: string) {
    return source.search(subString) > -1
}: boolean
- 类类型，也是接口实现，类实现某个接口，把接口看成是类的类型
定义一个接口
interface IFly {
    // 该方法没有任何的实现
    fly()
}
定义一个类，类的类型就是上面接口
class Person implements IFly {
    fly() { // 必须实现接口中的方法
        console.log('fly')
    }
}
接口相当是一种能力，一个类可以实现多个接口class Person2 implements IFly, ISwim, 接口中的内容要真正的被实现；同时接口可以实现多个接口，interface IFlyAndSwim extends IFly, ISwim {里面可以是空}; 接口和接口之间叫继承，类和接口之间叫实现

4. 类，类可以理解为模板，通过模板可以实例化对象
- 类的定义
class Person {
    // 定义属性
    name: string
    age: number
    gender: string
    // 定义构造函数，实例化对象的时候用于对属性值初始化
    constructor(name: string='xx', age: number=16, gender: string='男') {
        // 更新对象中属性数据
        this.name = name
        this.age = age
        this.gender = gender
    }
    // 定义实例方法
    sayHi(str:string) {
        console.log(`${this.name}${this.age}`, str)
    }
}
- 类的继承
上面定义的类作基类（超类，父类）
class Student extends Person {
    // 也可以有自己的舒心g
    constructor(name: string='xx', age: number=16, gender: string='男') {
        // 调用父类别中的构造函数
        super(name, age, gender)
    }
    sayHi() {
        console.log('学生中的sayHi')
        super.sayHi('哈哈哈') // 子类可以调用父类的方法，但里面的this就指向子类了，很容易验证，比如父类没有实例化，而只有子类实例化了
    }    
}
- 多态
父类型的引用指向了子类型的实例，不同类型的对象针对相同的方法，产生了不同的行为
class Dog extends Animal {
    constructor(name: string) {
        // 调用父类的构造函数，实现子类中属性的初始化操作
        super(name)
    }
    // 实例方法，重写父类的实例方法
    run(distance: number = 5) {
        console.log(`跑了${distance}米`)
    }
}
实例化父类对象
const ani: Animal = new Animal('动物')
ani.run()
实例化子类对象
const dog: Dog = new Dog('大黄')
dog.run()
const pig:Pig = new Pig('佩奇')
pig.run()
const dog: Animal = new Dog('大黄') // 也没问题
dog.run()
const pig: Animal = new Pig('佩奇')
pig.run()
function showRun(ani: Animal) {
    ani.run()
}

- 修饰符
类内成员默认修饰符就是public
默认或者public修饰，在类中可以通过this访问属性，在类外可以通过实例访问属性
private修饰，类外部实例是无法访问的，子类的内部无法访问
protected修饰，只能被类和子类内部访问，

########## 类、对象 ########
1. 子类和父类的方法相同是重写
子类方法中的super代表的是父类或者父类的实例
子类写了构造函数相当于把父类构造函数给覆盖了，那父类构造函数不执行，父类属性赋值的操作就没了，这时就需要super(父类构造器有什么参数传什么参数)一下相当于执行一下父类的构造函数

2. 抽象类：有时父类主要用于继承而非创建实例的，这时加abstract可以静止创建父类实例
abstract class Animal {}
抽象方法：抽象方法为了避免写成具体方法被子类意外调用（比如子类忘了重写了），abstract sayHello():void 抽象方法没有方法体，必须定义在抽象类中，必须由子类重写

3. 接口,用来定义一个类中应该包含哪些属性和方法，接口也可以当做类型声明去使用
之前描述一个对象的类型， 不能重复声明
type myType = {
    name: string,
    age: number,
    // [propname: string]: any
}
const obj: myType = {
    name: 'sss',
    age: 111
}
现在可以用接口来定义一个类结构， 可以重复声明(会合并一起)
interface myInterface = {
    name: string,
    age: number,
}
//interface myInterface = {
//    gender: string
//}
const obj: myInterface = {
    name: 'sss',
    age: 111
}
所以，可以用别名的形式声明类型，也可以接口的形式声明
接口可以在定义类的时候限制类的结构（不考虑实际值），类似于抽象类（但可以有实质方法和实质属性），但不考虑实际值；接口中所有的方法都是抽象方法
类实现接口就是让类满足接口的要求，接口其实就是定义了一个规范，你只要实现了我这个接口，就是满足了规范，也可以说是对类的限制

4. 属性的封装, 常用于避免属性被修改错的场景，主要使属性的访问更安全，简单的情况可以不使用
上面的属性的定义方式可以任意修改，存在安全隐患
可以再属性前加属性修饰符来解决
public修饰的属性可以在任意位置访问或者修改，是默认的
private是私有属性，设置了就等于关闭了这个属性的访问方式，只能在类内部访问（修改），一般名称前面加下划线标识， 此时如果用对象访问，编辑器会提示有问题，但编译能通过（要想编译不让其通过，需要配置tsconfig.json中"noEmitOnError": true, 确保有错误时不去编译）
可以类内部添加方法的方式使得私有属性可以被外部访问
private _name: string;
// 如果不设置getName，也不能访问了
getName() {
    return this._name
}
// 如果不设置setName的话，name就变成只读的了
setName(value: string) {
    this._name = value
}
有了set、get属性控制权就完全掌握自己手里，比如设置值超出范围就不让设置了
setAge(value)
setter\getter方法又叫属性的存取器
TS中新的形式：
get name() {}
console.log(per.name) // 这样实际上调用get name()方法
set name(value: string) { this._name = value }
per.name = '' // 这样实际上调用set name()方法

5. protected属性，受保护的属性，只能在当前类和子类中使用，也不能在实例中直接访问

6. 可以将属性直接写在构造函数的入参里, 这样属性声明还有属性初始化（this.name = name）都不用写了
constructor(public name: number, public age: string) {}

7. 泛型，用any的弊端是会关闭类型检查
function fn(a: any): any { // 此时用any也不能体现入参和返回值类型是相同的
    return a 
}
定义函数或者类时遇到类型不明确的时候就可以使用泛型
根据调用的情况具体确定类型
function fn<T>(a: <T>): T { return a } // 叫K也行，是什么类型现在还不知道，具体调用的时候才能确定; 参数后面能用T是因为前面定义了T
fn(10)  // 可以直接调用具有泛型的函数，传值的时候相当于给T进行了赋值number，利用了TS中的类型推断，有时候推断不出来可以手动指定fn<string>('hello')
泛型可以指定多个，function fn2<T, K>(a: T, b: K):T {
    console.log(b)
    return a
}
fn2<number, string>(123, 'hello') // 最好手动指定上，降低出错的可能性
有时想限定一下泛型的范围，比如是实现了某个接口的类
Interface Inter {
    length: number;
}
function fn3<T extends Inter>(a: T): number { // extends包含实现和继承的情况
    return a.length
}
也就是传参必须有length属性
fn3('123'), fn3({length: 10})
类里使用泛型
class MyClass<T> {
    name: T;
    constructor(name: T) {
        this.name = name
    }
}
const mc = new MyClass<string>('sss')




