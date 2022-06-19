编译：tsc xx.ts -> xx.js

1. 对象类型限制
   let a: {name: string, age?: number} 问号表示属性有也行，没有也行
   let a: {name: string, [propName: string]: any} 表示后面可以有任意多的任意类型的其他属性
2. 函数类型限制
   let d: (a: number, b: number) => number
3. 数组常用语限定数组元素类型，let e: string[] 字符串数组，或者 let e:Array<string>
   限定类型不建议用 any, 尽量明确
4. ts 基于 js 扩展的类型，元组：长度固定的数组，存储效率要高些
   let h: [string, string]
5. enum Gender {
   male, // 默认会设置成 0, 可以手动设置其他值，但是没必要
   female // 默认会设置成 1
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
   tsconfig.json 配置文件可以配置监控所有文件，即使里面没有内容比如{}，执行 tsc -w 也能监控所有 ts 文件。通常的 json 文件是不能写注释的，但 tsconfig.json 可以写注释
   {
   "include": [
   "./src/**/*" // 两星任意目录，一星任意文件
   ], // include 置顶哪些 ts 文件需要被编译
   "exclude": [
   "./src/hello/**/*"
   ], // exclude 指不需要被编译的文件目录，一般不用设置，默认值是["node_modules", "bower_components"]
   "extends": "./configs/base", // 继承的外部文件 xx.json，类似于 import 的外部文件
   "files": [], 类似于 include, 只是 files 直接设置哪些文件，include 是哪些目录下的文件，files 用着比较麻烦一般用在项目比较小，只有很少的 ts 文件
   }

9. ts 编辑只做一些简单的转换，promise 等新语法的转换需要用到 babel, @babel/preset-env 兼容不同浏览器，core-js 提供运行 js 的虚拟环境， loader 加载器的执行顺序是从后往前执行（ts-loader 放后面先把 ts 转为 js，babel-loader 把新 js 转为旧的 js）,chrome 新浏览器对 ES6 的兼容性比较好， IE11 支持不太好比如不支持 const、箭头函数等

10. 实例属性前加 readonly 会变成只读，属性前加 static 会变成静态属性，可以一起用，但顺序只能是 static readonly
    实例方法，sayHello() {}, 前面也可以加 static, 静态方法用的不多
    创建不同的实例需要 name:string; age:number, constructor(name:string, age:number) { this.name = name; this.age = age }
    需要重点记住一个区别，constructor 中 this 指向实例，而实例方法中的 this 指向方法的调用者（这个调用者可能是实例，也可能是绑定时间的按钮）constructor(name:string, age:number) { this.name = name; this.age = age; this.btn.onclick = this.sing }

########## TS 数据类型相关 ########

1. 类型断言：as string, 当你比程序更确定类型的时候使用，比如某个函数的入参有类型限制，但此时传的参数程序无法判断出类型，就会提示有问题，而此时你能确定实参的类型就可以给实参加上类型断言

2. 基础类型
   支持 js 类型，同时提供枚举类型

- 布尔类型，let flag:boolean = true
- 数字 number,和 js 一样都是浮点数；除了支持 10 和 16 进制，还支持 ES6 引入的 2 和 8 进制; let a2: number = 0b1010, let a3: number = 0o12, let a3: number = 0xa
- string,表示文本数据类型，let str1: string = 'xx';支持字符串和数字之间拼接
- 小结：ts 一开始是什么类型，后面赋值也必须是什么类型
- undefined 和 null,各自有自己的类型，也是其他所有类型的子类型；let und: undefined = undefined, let nll: null = null； 可以赋值给其他类型，需要把 ts 配置的严格模式配置为 false, "strict": false, 示例 let num2: number = undefined
- 数组和元组，数组定义方式：let arr1: number[] = [10, 20, 30]或者 let arr2: Array<number> = [10, 20 ,30]->泛型写法；注意问题：number 类型数组里不能有其他类型；要想数组里有不同类型，就需要元组，let arr3: [string, number, boolean] = ['xx', 100, true],类型的位置和个数一开始就确定了
- 枚举，定义一些个数固定且常用的数据，比如性别，里面的数据叫元素，每个元素都有自己的编号，且编号依次递增加 1；enum Color { red, green, blue }， 下面定义一个枚举变量接收枚举值，let color: Color = Color.red, console.log(Color.red, Color.green, Color.blue) // 0, 1, 2; 可以手动改值，enum Color { red=100, green, blue }， 但很少这样做；也可以这样，enum Color { red='red', green='green', blue='blue' }；由枚举值可以拿到它的名字，console.log(Color[2]) // blue
- any 类型，适用于当前不知道是什么数据类型，又想把它存储起来，let str: any = 100, str = 'xx'；let arr: any[] = [100, 'xx']当一个数组中存储的数据类型不确定，个数不确定时适用；有好也有坏，就是没有类型错误提示信息
- void, 没有任何类型，用在函数声明的时候 function showMsg(): void {},代表的是该函数没有任何返回值;let vd: void = undefined, 这样没多大意义，定义一个 void 类型的变量，接收 undefined 类型数据
- object 表示非原始类型，function getObj(obj: object): object {
  console.log(obj)
  return {
  name: 'xx',
  age: 18
  }
  }
- 联合类型，表示取值可以为多种类型中的一种， function getStr(str: number | string): string {
  return str.toString()
  }
- 类型断言, 可以告诉编译器，“相信我,我知道自己在做什么", 类似于其他语言的类型转换，但不进行特殊的类型检查和解构，它没有运行时的影响，只在编译阶段起作用；两种写法，一种尖括号，一种 as；如果 str 本身是 string 类型，就没有必要调用 toString 方法， function getLen(str: number | string): number) {
  if (str.length) { // 有问题，空字符串没有考虑;这个时候还有提示信息，不知道此时是 number 还是 string 类型;类型断言，(<string>str).length 或者(str as string).length;可以解决错误的提示信息
  // str.length 存在说明是 string 类型
  return str.length // return (<string>str).length
  } else {
  str.toString().length
  }
  }
- 类型推断, 没有明确指定类型的时候推测出一个类型，先 let txt = 100,推断出 number 类型 再赋值 txt = 'xx'就不行；定义一个变量没有赋值，推断为 any 类型，let a, a = 10, a = 'xx'

- 类型保护 is
  在使用类型保护时，TS 会进一步缩小变量的类型。例子中，将类型从 any 缩小至了 string；
  类型保护的作用域仅仅在 if 后的块级作用域中生效
  // 判断参数是否为 string 类型, 返回布尔值
  function isString(s:unknown):s is string{
  return typeof s === 'string'
  }

// 判断参数是否为字符串,是在调用转大写方法
function ifUpperCase(str:unknown){

if(isString(str)){
str.toUpperCase()
// (parameter) str: string
}
}
s is string 不仅返回 boolean 类型判断参数 s 是不是 string 类型, 同时明确的 string 类型返回到条件为 true 的代码块中.
因此当我们判断条件为 true, 即 str 为 string 类型时, 代码块中 str 类型也转为更明确的 string 类型
类型谓词的主要特点是：
返回类型谓词，如 s is string；
包含可以准确确定给定变量类型的逻辑语句，如 typeof s === 'string'。

- never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。

- 常见问题 \* any、never 和 unknown 的关系
  any
  any 是任意值类型，定义为 any 类型的变量允许被赋值为任意类型。
  let myFavoriteNumber: any = 'seven'
  myFavoriteNumber = 7
  变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型，也就是说声明为 any 类型和写 JS 没啥区别
  never
  never 类型表示的是那些永不存在的值的类型。例如一个抛出异常的函数，一个永远不会返回的函数的返回值类型
  // 返回 never 的函数必须存在无法达到的终点
  function error(message: string): never {
  throw new Error(message)
  }
  // 推断的返回值类型为 never
  function fail() {
  return error('Something failed')
  }
  // 返回 never 的函数必须存在无法达到的终点
  function infiniteLoop(): never {
  while (true) {}
  }
  never 类型是任何类型的子类型，可以赋值给任意类型。但是没有类型是 never 类型的子类型，即使是 any 类型也不能赋值给 never 类型
  unknown
  unknown 类型是 ts 中所有基础类型的父类型，所有基础类型都能赋值为 unknown 类型。
  但是当 unknown 类型赋值为其他任意类型时，就会进行类型检查。我们必须将这个 unknown 类型的变量断言为具体的类型，才可以继续使用。
  所以 any 和 unknown 的区别就是：
  二者都是可以赋值给任意类型的， any 会绕过类型检查，直接可用；而 unknown 则必须要在判断完它是什么类型之后才能继续使用

3. 接口
   TS 核心是对值所具有的结构进行类型检查， 接口可以定义对象的类型

- 对象类型
  定义一个接口，该接口作为 person 对象的类型使用，限定或者是约束该对象中的属性数据
  interface IPerson {
  readonly id: number // readonly 定义只读属性
  name: string
  age: number
  sex?: string // ?可有可无的
  }
  变量限制属性只读用 const, 属性限制只读用 readonly
- 函数类型，函数类型需要通过接口来实现，需要给接口定义一个调用签名
  interface ISearchFunc {
  // 定义一个调用签名, 就像一个只有参数列表和返回值类型的函数定义
  (source: string, subString: string): boolean
  }
  // 示例：定义一个函数，它的类型就是 ISearchFunc 接口
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
  接口相当是一种能力，一个类可以实现多个接口 class Person2 implements IFly, ISwim, 接口中的内容要真正的被实现；同时接口可以实现多个接口，interface IFlyAndSwim extends IFly, ISwim {里面可以是空}; 接口和接口之间叫继承，类和接口之间叫实现

- interface 和 type 的区别 \* 相同点 - 都可以描述一个对象或者函数
  type User = {
  name: string
  age: number
  };
  type SetUser = (name: string, age: number)=> void;

          - 都允许扩展

  interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。
  interface extends interface
  interface Name {
  name: string;
  }
  interface User extends Name {
  age: number;
  }
  复制代码 type extends type
  type Name = {
  name: string;
  }
  type User = Name & { age: number };
  复制代码 interface extends type
  type Name = {
  name: string;
  }
  interface User extends Name {
  age: number;
  }
  复制代码 type extends interface
  interface Name {
  name: string;
  }
  type User = Name & {
  age: number;
  } \* 区别 - type 可以而 interface 不行
  type 可以声明基本类型别名，联合类型，元组等类型
  // 基本类型别名
  type Name = string
  // 联合类型
  interface Dog {
  wong();
  }
  interface Cat {
  miao();
  }
  type Pet = Dog | Cat
  // 具体定义数组每个位置的类型
  type PetList = [Dog, Pet]
  type 语句中还可以使用 typeof 获取实例的 类型进行赋值
  // 当你想获取一个变量的类型时，使用 typeof
  let div = document.createElement('div');
  type B = typeof div
  其他
  type StringOrNumber = string | number;  
  type Text = string | { text: string };  
  type NameLookup = Dictionary<string, Person>;  
  type Callback<T> = (data: T) => void;  
  type Pair<T> = [T, T];  
  type Coordinates = Pair<number>;  
  type Tree<T> = T | { left: Tree<T>, right: Tree<T> }; - interface 可以而 type 不行
  表现上来说 2 者可以实现的功能都可以互相实现，唯一的声明合并方面，type 不行即 type 类型不能二次编辑，而 interface 可以随时扩展
  interface Person {
  age: number;
  }
  interface Person {
  name: string;
  }
  type Person {
  age: number;
  }
  type Person {
  name: string;
  }
  //TS2300: Duplicate identifier 'Person'.

4. 类，类可以理解为模板，通过模板可以实例化对象
   可以指定对象的类型, 当类没有被显示定义时，限定对象的类型还可以这样：val: typeof user

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
  // 也可以有自己的属性
  constructor(name: string='xx', age: number=16, gender: string='男') {
  // 调用父类别中的构造函数
  super(name, age, gender)
  }
  sayHi() {
  console.log('学生中的 sayHi')
  super.sayHi('哈哈哈') // 子类可以调用父类的方法，但里面的 this 就指向子类了，很容易验证，比如父类没有实例化，而只有子类实例化了
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
  类内成员默认修饰符就是 public
  默认或者 public 修饰，在类中可以通过 this 访问属性，在类外可以通过实例访问属性
  private 修饰，类外部实例是无法访问的，子类的内部无法访问
  protected 修饰，只能被类和子类内部访问，

- readonly
  对属性成员修饰后，就不能在外部随意修改了；但在构造函数内部可以被修改，比如实例化的时候；但在普通方法中不能修改；构造函数中的 name 参数，一旦使用 readonly 修饰，该 name 参数可以叫参数属性，同时 Person 中就有了一个 name 的属性成员，此时外部也是无法修改类中的 name 属性成员；**如果构造函数的 name 参数，一旦使用的 public、private 或者 protected，该类中自动添加该类型的属性**

- 存取器
  为了控制对属性成员的访问，可以通过 getters/setters 来截取对对象成员的访问
  示例：
  firstName: string
  lastName: string
  constructor() {}
  // 读取器---负责读取数据
  get fullName() { // 不必像 firstName 那样显示定义 fullName,如果只有 get 就是只读属性
  return this.firstName + '\_' + this.lastName
  }
  // 设置器---负责设置数据的（修改）
  set fullName() {}

- 静态属性
  静态成员包含静态属性和静态方法
  static 修饰；类名.的方式调用，静态属性可以读取和设置; 类中默认有一个 name 属性，所以定义 static 属性时不能定义为 name；构造方法不能用 static 修饰

- 抽象类
  包含抽象方法（抽象方法没有具体实现），也可以有实例方法；抽象类不能被实例化；没有必要在抽象类中定义抽象属性去让子类去实现；抽象类是为了子类而存在的

5. 函数

- js 里面的函数->TS 同样可以这样写
  函数声明，命名函数
  function add(x, y) {
  return x + y
  }
  函数表达式，匿名函数
  function add2 = function (x, y) {
  return x + y
  }
- ts 中的书写方式
  函数声明，命名函数
  function add(string: x, string: y) : string {
  return x + y
  }
  函数表达式，匿名函数
  const add2 = function (number: x, number: y): number {
  return x + y
  }
- ts 中函数类型的完整写法
  // (number: x, number: y) => number 当前函数类型
  // function (number: x, number: y): number { return x + y}符合上面函数类型的值
  const add3: (number: x, number: y) => number = function (number: x, number: y): number {
  return x + y
  }
- 可选参数和默认参数  
  函数在声明的时候，内部参数有自己的默认值，此时这个参数就叫默认参数；声明时，内部参数使用了?进行修饰，则该参数可传入也可不传入，叫可选参数
- 剩余参数
  ...args: string[]剩余参数放在一个字符串数组 args 中；剩余参数要放到所有的参数最后
- 函数重载
  函数名字相同，函数参数及个数不同
  函数重载声明, 下面这样声明后，add 非法传参就会提示报错 add(10, "aa")
  function add(x : string, y: string): string
  function add(x : number, y: number): number

function add(x: string | number, y: string | number):string | number {
if (typeof x === "string" && typeof y === "string") {
return x + y  
 } else if (typeof x === "number" && typeof y === "number") {
return x + y
}
}

6. 泛型
   定义函数、接口、类的时候不能预先确定要使用的数据类型，在使用的时候才能确定数据的类型
   比如有个需求，定义一个函数，可以传入任意类型的数据，返回来的是存储这个任意类型数据的数组
   function getArr3(value: any, count: number): any[] {
   const arr: any[] = []
   for (let i = 0; i < count; i++) {
   arr.push(value)
   }
   return arr
   }
   any 会出现没有智能提示的问题
   // 写 T 或者其他字母都行，T 可以代表类型的意思
   function getArr4<T>(value: T, count: number): T[] {
   // const arr: T[] = [] 或者
   const arr:Array<T> = [] // 初始化一下，不然会警告 // 也可以 ref<T|null>(null)的格式
   for (let i = 0; i < count; i++) {
   arr.push(value)
   }
   return arr
   }
   const arr1 = getArr4<number>(200.12345, 5)
   const arr1 = getArr4<string>('abc', 5)

- 多个泛型参数的函数
  一个函数可以定义多个泛型参数
  function getMsg<K, V>(value1: K, value2: V): [K, V] {
  return [value1, value2]
  }
  const arr1 = getMsg<string, number>('jim', 10)
- 泛型接口
  通过一个接口去约束一个函数或者一个类的时候
  在定义接口的时候，为接口中的属性或者方法定义泛型类型，在使用接口时，再指定具体的泛型类型
  class User {
  id?: number
  name: string
  age: number
  }
  // CURD->create、Read、Update、Delete
  class UserCURD {
  data: Array<User> = [] // 如果以后是动物等类型怎么办，所以需要让类中属性或者方法中的类型更灵活一些，这个时候可以使用泛型接口
  add(user: User) // 用来存储用户信息对象
  getUserId(id: number) // 根据 id 查询指定的用户信息对象
  constructor
  }
  定义一个泛型接口类型
  interface IBaseCRUD<T> {
  data: Array<T>
  add: (t: T) => T
  getUserId: (id: number) => T
  }
  怎么用
  class UserCURD implements IBaseCRUD<User> {
  data: Array<User> = []
  add(user: User): User {
  user.id = Data.now() + Math.random() // Math.random()防止瞬间执行完导致 user.id 相同
  this.data.push(user)
  return user
  } // 用来存储用户信息对象
  getUserId(id: number) : User {
  return this.data.find(user=>user.id === id)
  } // 根据 id 查询指定的用户信息对象
  }
  const userCRUD: UserCRUD = new USerCRUD()
- 泛型类
  类中的属性和方法，属性的类型或者方法的参数及返回值的类型是不确定的
  class GenericNumber<T> {
  defaultValue: T
  add: (x: T, y: T) => T
  }
  const g1 : GenericNumber<number> = new GenericNumber<number>()
  g1.defaultValue = 100
  g1.add = function (x, y) {
  return x + y
  }
  const g2 : GenericNumber<string> = new GenericNumber<string>()
- 泛型约束
  如果我们直接对一个泛型参数取 length 属性，会报错，因为这个泛型根本就不知道它有这个属性，我们可以通过一个接口来约束
  function getLength<T>(x: T): number {
  return x.length  
  }
  interface ILength{
  // 接口中有一个属性 length
  length: number
  }
  function getLength<T extends ILength>(x: T): number {
  return x.length  
  }
  console.log(getLength<string>('what r u do'))
  console.log(getLength<number>(100) // 会报错，number 没有实现 length

- Promise 的泛型 T 代表 promise 变成成功态之后 resolve 的值，resolve(value)

7. 其他

- 声明文件：当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
  jQuery.d.ts
  declare var jQuery: (selector: string) => any // 这种定义操作比较多, 一般安装库的方法会提示安装声明文件比如：npm install @types/jquery --save-dev, 安装完之后会放到 node_modules 中的@types 目录中
  main.ts // d 文件会自动扫描 main.ts 的内容, 所以这里不用导入 d 文件及 jQuery
  安装声明文件后
  import jQuery from 'jquery'
  再使用 jQuery 时就会有提示信息及代码补全
- 内置对象
  js 中定义好的数据类型都能在 TS 中使用

* ES 中的内置对象 Boolean、Number、String、Date、RegExp、Error
  let b: Boolean = new Boolean(1)
  b = true // 可以这样修改
  let bb: boolean = new Boolean(2) //这样就是错的，一个是基本类型，一个是包装器对象，不是互通的
* BOM 和 DOM 的内置对象
  Window Document HTMLElement DocumentFragment Event NodeList 这些在 TS 中都可以正常使用
  document.addEventListener('click', (event: MouseEvent) => {

})
const fragment: DocumentFragment = document.createDocumentFragment()

8. 运算符

- !.非空断言操作符
  这是 TypeScript 的语法，叫非空断言操作符（non-null assertion operator），和?.相反，这个符号表示对象后面的属性一定不是 null 或 undefined。
  Non-null Assertion Operator (Postfix
  !
  )
  TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking. Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:

function liveDangerously(x?: number | null) {
// No error
console.log(x!.toFixed());
}
Try
Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.

########## 类、对象 ########

1. 子类和父类的方法相同是重写
   子类方法中的 super 代表的是父类或者父类的实例
   子类写了构造函数相当于把父类构造函数给覆盖了，那父类构造函数不执行，父类属性赋值的操作就没了，这时就需要 super(父类构造器有什么参数传什么参数)一下相当于执行一下父类的构造函数

2. 抽象类：有时父类主要用于继承而非创建实例的，这时加 abstract 可以静止创建父类实例
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
   // gender: string
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
   public 修饰的属性可以在任意位置访问或者修改，是默认的
   private 是私有属性，设置了就等于关闭了这个属性的访问方式，只能在类内部访问（修改），一般名称前面加下划线标识， 此时如果用对象访问，编辑器会提示有问题，但编译能通过（要想编译不让其通过，需要配置 tsconfig.json 中"noEmitOnError": true, 确保有错误时不去编译）
   可以类内部添加方法的方式使得私有属性可以被外部访问
   private \_name: string;
   // 如果不设置 getName，也不能访问了
   getName() {
   return this.\_name
   }
   // 如果不设置 setName 的话，name 就变成只读的了
   setName(value: string) {
   this.\_name = value
   }
   有了 set、get 属性控制权就完全掌握自己手里，比如设置值超出范围就不让设置了
   setAge(value)
   setter\getter 方法又叫属性的存取器
   TS 中新的形式：
   get name() {}
   console.log(per.name) // 这样实际上调用 get name()方法
   set name(value: string) { this.\_name = value }
   per.name = '' // 这样实际上调用 set name()方法

5. protected 属性，受保护的属性，只能在当前类和子类中使用，也不能在实例中直接访问

6. 可以将属性直接写在构造函数的入参里, 这样属性声明还有属性初始化（this.name = name）都不用写了
   constructor(public name: number, public age: string) {}

7. 泛型，用 any 的弊端是会关闭类型检查
   function fn(a: any): any { // 此时用 any 也不能体现入参和返回值类型是相同的
   return a
   }
   定义函数或者类时遇到类型不明确的时候就可以使用泛型
   根据调用的情况具体确定类型
   function fn<T>(a: <T>): T { return a } // 叫 K 也行，是什么类型现在还不知道，具体调用的时候才能确定; 参数后面能用 T 是因为前面定义了 T
   fn(10) // 可以直接调用具有泛型的函数，传值的时候相当于给 T 进行了赋值 number，利用了 TS 中的类型推断，有时候推断不出来可以手动指定 fn<string>('hello')
   泛型可以指定多个，function fn2<T, K>(a: T, b: K):T {
   console.log(b)
   return a
   }
   fn2<number, string>(123, 'hello') // 最好手动指定上，降低出错的可能性
   有时想限定一下泛型的范围，比如是实现了某个接口的类
   Interface Inter {
   length: number;
   }
   function fn3<T extends Inter>(a: T): number { // extends 包含实现和继承的情况
   return a.length
   }
   也就是传参必须有 length 属性
   fn3('123'), fn3({length: 10})
   类里使用泛型
   class MyClass<T> {
   name: T;
   constructor(name: T) {
   this.name = name
   }
   }
   const mc = new MyClass<string>('sss')
