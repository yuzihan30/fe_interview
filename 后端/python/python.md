1. 字符串转数字， int('x', n), n 为 2-32， n 不写时就是转为 10 进制
2. reversed(seq) seq 是要转换的序列，可以是 tuple, string, list 或 range， 返回一个反转的迭代器
3. python 删除列表中值，pop()删除末尾值，del(arr[i])删除对应索引元素值，remove(11)删除列表中具体值，都会改变原列表
4. python 中空值 None 首字母要大写, True\Flase 也是首字母大写
5. python 中列表转字符串 ''.join(迭代器), 注意与其他语言的不同， 前提是迭代器中元素需要是 str 类型
   ############## 空值 #################
6. not [""] == False, not [] == True
   ############## 字符串 #################
7. python 中没有直接的方法对字符串进行排序,原因是字符串类型是不允许直接修改元素的。 因此字符串排序的主要方法是将字符串转换成字符数组, 然后借用 sorted 函数进行排序, 最后用 join 方法重新拼装字符串。
8. 'abc'.split()得到['abc']， 但不能'abc'.split(''), 不传参的话默认以空格区分
   注意和 js 区分:
   'abc'.split()
   ['abc']
   'abc'.split('')
   (3) ['a', 'b', 'c']
9. Python3 字典 values() 方法返回一个视图对象。
   dict.keys()、dict.values() 和 dict.items() 返回的都是视图对象（ view objects），提供了字典实体的动态视图，这就意味着字典改变，视图也会跟着变化。
   视图对象不是列表，不支持索引，可以使用 list() 来转换为列表。
   我们不能对视图对象进行任何的修改，因为字典的视图对象都是只读的。

## 类型声明
Typing.Optional类
可选类型，作用几乎和带默认值的参数等价，不同的是使用Optional会告诉你的IDE或者框架：这个参数除了给定的默认值外还可以是None，而且使用有些静态检查工具如mypy时，对 a: int =None这样类似的声明可能会提示报错，但使用a :Optional[int] = None不会。
Optional[X]等价于Union[X, None]

############## 字典 #################

1. 键必须是唯一的，但值则不必。
   值可以取任何数据类型，但键必须是不可变的，如字符串，数字或元组

2. 字典有一些内置函数和内置方法
   内置函数是将字典作为参数，比如 len(dict)、str(dict)、type(dict), 内置方法是将字典作为调用者,比如 dict.clear()、dict.copy()、in 操作符判断键是否存在字典中（not in 就是不在）

3. \*\*解包字典数据，可用于关键字参数

############## 数据类型 bytes #################

1. 在 python 中，数据转成 2 进制后不是直接以 010101 的形式表示的，而是用一种叫 bytes(字节)的类型来表示的。 例如 b'\xe8\x87\xaa\xe5
   bytes 类型是指一堆字节的集合，在 python 中以 b 开头的字符串都是 bytes 类型。
   b'\xe5\xb0\x8f\xe7\x8c\xbf\xe5\x9c\x88'
   b 开头的都代表是 bytes 类型，是以 16 进制来显示的，2 个 16 进制代表一个字节。
   utf-8 是 3 个字节代表一个中文，所以以上正好是 9 个字节
   ############## 列表 #################
1. python 中删除列表元素的方法
   1）remove: 删除单个元素，删除首个符合条件的元素，按值删除
   举例说明:
   > > > str=[1,2,3,4,5,2,6]
   > > > str.remove(2)
   > > > str
   > > > [1, 3, 4, 5, 2, 6]

2) pop: 删除单个或多个元素，按位删除(根据索引删除)
   > > > str=[0,1,2,3,4,5,6]
   > > > str.pop(1) #pop 删除时会返回被删除的元素
   > > > str
   > > > [0, 2, 3, 4, 5, 6]
   > > > str2=['abc','bcd','dce']
   > > > str2.pop(2)
   > > > 'dce'
   > > > str2
   > > > ['abc', 'bcd']
   > > > 3)del：它是根据索引(元素所在位置)来删除
   > > > 举例说明:
   > > > str=[1,2,3,4,5,2,6]
   > > > del str[1]
   > > > str
   > > > [1, 3, 4, 5, 2, 6]
   > > > str2=['abc','bcd','dce']
   > > > del str2[1]
   > > > str2
   > > > ['abc', 'dce']
   > > > 除此之外，del 还可以删除指定范围内的值。
   > > > str=[0,1,2,3,4,5,6]
   > > > del str[2:4] #删除从第 2 个元素开始，到第 4 个为止的元素(但是不包括尾部元素)
   > > > str
   > > > [0, 1, 4, 5, 6]
   > > > del 也可以删除整个数据对象(列表、集合等)
   > > > str=[0,1,2,3,4,5,6]
   > > > del str
   > > > str #删除后，找不到对象
   > > > Traceback (most recent call last):
   > > > File "<pyshell#27>", line 1, in <module>
   > > > str
   > > > NameError: name 'str' is not defined

2. 列表中添加元素
   Python 添加元素有三种方法：append、extend、insert
   append：向列表添加元素，添加到尾部
   实例：
   list=[“my”,“name”,“is”,“mark”,“age”,18]
   print(“添加前：”,list)
   list.append(“test”)
   print(“添加后：”,list)
   打印结果：
   添加前： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18]
   添加后： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18, ‘test’]
   extend：将另外一个列表的元素逐一添加到指定列表中
   实例：
   list=[“my”,“name”,“is”,“mark”,“age”,18]
   print(“extend 前：”,list)
   list2=[“A”,“B”]
   list.extend(list2)
   print(“extend 后：”,list)
   打印结果：
   extend 前： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18]
   extend 后： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18, ‘A’, ‘B’]
   inset(index,objectA)：在指定位置 index 前面插入对象 objectA
   实例：
   list=[“my”,“name”,“is”,“mark”,“age”,18]
   print(“insert 前：”,list)
   list.insert(3,“test”)
   print(“insert 后：”,list)
   打印结果：
   insert 前： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18]
   insert 后： [‘my’, ‘name’, ‘is’, ‘test’, ‘mark’, ‘age’, 18]

3. 简单列表深拷贝的方法
   1）copy()
   original_list=[1,2,3]
   #Copying list using copy function
   copied_list=original_list.copy()
   print(copied_list)
   #Output:[1, 2, 3]
   print(original_list)
   #Output:[1, 2, 3]
   #checking the id of both original and copied list
   print(id(original_list))
   #Output:27800264
   print(id(copied_list))
   #Output:27799880
   由于二者指向内存不同，所以此时在原始列表中所做的修改不会反映在复制的列表中，反之亦然
   2)list()构造方法
   original_list=[1,2,3]
   #Copying list using list() constructor
   copied_list=list(original_list)
   print(copied_list)
   #Output:[1, 2, 3]
   print(original_list)
   #Output:[1, 2, 3]
   #checking the id of both original and copied list
   print(id(original_list))
   #Output:27800264
   print(id(copied_list))
   #Output:27799880
   由于二者指向内存不同，所以此时在原始列表中所做的修改不会反映在复制的列表中，反之亦然 3)切片[:], 和以上两种方法效果相同 4)列表生成式
   copied_list=[i for i in original_list]，效果同上

4. 列表排序
   1）列表对象提供了 sort()方法用于对原列表中的元素进行排序。排序以后，原列表中的元素顺序将发生改变。列表对象的 sort()方法的语法格式如下：
   listname.sort(key=None,reverse=False)
   key：表示指定一个从每个列表元素中提取一个比较键。（列如，设置“key=str.lower”表示在排序时不区分字母的大小写）。reverse：可选参数，如果将其值指定为 True，则表示降序排序；如果将其指定为 False，则表示升序排列。默认为升序排列。使用 sort()方法除了可以对数值进行排序，还可以多字符串进行排序。对字符串进行排序默认区分大小写，如果想不区分大小写，则需要指定其 key 参数。不能直接使用 sort()方法对中文列表排序
   s.sort(reverse=True)
   s.sort(key=str.lower)
   2）在 Python 中，提供了一个内置的 sorted()函数，用于对列表进行排序。使用该函数进行排序后，原列表的元素顺序不变。sorted()函数的语法格式如下：
   sorted(iterable,key=None,reverse=False)
   相关的参数说明如下：
   iterable：表示要进行排序的列表。
   列表对象的 sort()方法和 sorted()函数的作用基本相同。不同的地方有以下两点：
   a、sort()方法只能处理列表类型数据的排序；sorted()函数则可以处理多种类型数据的排序。
   b、sort()方法会修改原来的列表的元素的排序；sorted()函数不会修改原来的数据，会建立一个原列表的副本，只是返回一个排序后的列表。
   3）使用列表的 reverse()方法进行反向排序
   会改变原列表，相当于列表反转

## 类型联合运算符

1. 以前需要用 Union 关键字，取并集的意思，Union[str, int], python3.10 可以直接 str | int 代替；和 union()功能类似，括号里可以是 list，tuple，其他，甚至是 dict
   ############## 变量 #################
1. 局部变量和全局变量
   1）局部变量
   在一个函数中定义的变量就是局部变量（包括形参），其作用域是从定义局部变量的位置至函数结束的位置。
   def foo(x):
   print('Foo 中的 x:', x)
   x = 100
   print('Foo 中修改后的 x:', x)
   def bar():
   x = 10
   print('Bar 中的 x:', x)
   foo(1000)
   print('调用 Foo 后的 x:', x)
   bar()
   输出结果：
   Bar 中的 x: 10
   Foo 中的 x: 1000
   Foo 中修改后的 x: 100
   调用 Foo 后的 x: 10
   解析：
   首先运行 bar() 函数，创建了 bar() 中的局部变量 x，并赋值为 10。
   然后调用 foo()函数，形参为 1000，即此时 foo 中的局部变量 x 为 1000。
   打印此时 foo 中的 x，数值为 1000。
   将 foo 中的局部变量 x 重新赋值为 100，并打印。
   foo 函数运行结束，foo 中的 x 作用结束，所以回到 bar 函数中，打印 bar 中的局部变量 x 为 10。
   2）全局变量
   在所有函数外定义的变量就是全局变量，其在所有的函数中都能使用。
   def foo():
   print('Foo 中的 x:', x) // 这里的 x 值跟 foo 定义的位置有关系，跟调用的地方无关，类似 js
   def bar():
   x = 100
   foo()
   print('Bar 中的 x:', x)
   x = 20
   foo()
   bar()
   foo()
   输出结果：
   Foo 中的 x: 20
   Foo 中的 x: 20
   Bar 中的 x: 100
   Foo 中的 x: 20
   第 5 行代码实际上是在 bar 函数中定义了一个局部变量 x 并将其赋值为 100，而不是修改全局变量 x 的值。所以无论是在 bar 函数内部再调用 foo 函数，还是之后调用 foo 函数，其打印的 x 值都为 20。
   3）global 关键字
   如果我们想要在一个函数中对全局变量进行修改，怎么办呢？这个时候就可以使用 global 关键字了。在函数体内定义，并且使用 global 关键字修饰后，该变量也就变为全局变量。在函数体外也可以访问到该变量，并且在函数体内还可以对其进行修改。
   def foo():
   print('Foo 中的 x:', x)
   def bar():
   global x
   x = 100
   foo()
   print('Bar 中的 x:', x)
   x = 20
   foo()
   bar()
   foo()
   输出结果：
   Foo 中的 x: 20
   Foo 中的 x: 100
   Bar 中的 x: 100
   Foo 中的 x: 100
   tip: 尽管 Python 允许全局变量和局部变量重名，但是在实际开发时，不建议这么做，因为这样容易让代码混乱，很难分清哪些是全局变量，哪些是局部变量。
   3）global 关键字
   如果我们想要在一个函数中对全局变量进行修改，怎么办呢？这个时候就可以使用 global 关键字了。在函数体内定义，并且使用 global 关键字修饰后，该变量也就变为全局变量。在函数体外也可以访问到该变量，并且在函数体内还可以对其进行修改。
   def foo():
   print('Foo 中的 x:', x)
   def bar():
   global x
   x = 100
   foo()
   print('Bar 中的 x:', x)
   x = 20
   foo()
   bar()
   foo()
   输出结果：
   Foo 中的 x: 20
   Foo 中的 x: 100
   Bar 中的 x: 100
   Foo 中的 x: 100
   tip: 尽管 Python 允许全局变量和局部变量重名，但是在实际开发时，不建议这么做，因为这样容易让代码混乱，很难分清哪些是全局变量，哪些是局部变量。
   4）nonlocal 关键字
   在 Python 中，函数的定义可以嵌套，即在一个函数中包含另一个函数的定义。通过 nonlocal 关键字，可以使内层的函数直接使用外层函数中定义的变量。
   不使用 nonlocal 的例子：
   def outer():
   x = 10
   def inner():
   x = 20
   print('inner 函数中 x 的值为', x)
   inner()
   print('outer 函数中 x 的值为', x)
   outer()
   输出结果：
   inner 函数中 x 的值为 20
   outer 函数中 x 的值为 10
   使用 nonlocal 的例子：
   def outer():
   x = 10
   def inner():
   nonlocal x
   x = 20
   print('inner 函数中 x 的值为', x)
   inner()
   print('outer 函数中 x 的值为', x)
   outer()
   输出结果：
   inner 函数中 x 的值为 20
   outer 函数中 x 的值为 20
   ############## 函数 #################
1. 函数在调用之前需要先定义
   函数内调用另一个函数不受此条规则限制，但函数外调用扔要在这俩函数之后调用;类内方法不受此限制

############## 类 #################

1. 私有方法，方法名前下划线标识

2. 类内定义方法，第一个参数为 self，类内方法相互调用或者自己调动自己需要 self.方法

############## 常用方法 #################

1. python 交换两个变量的值方法
   1）大部分语言，例如 c 语言，交换两个变量的值需要使用中间变量。
   例如交换 a,b
   伪代码：
   tmp = a
   a = b
   b = tmp
   python 里面可以实现无临时变量的交换
   (a,b) = (b,a)
   对于它的交换原理我深感好奇，因为这意味着 python 解释器很有可能做了件更多的工作。
   如果说变量可以直接交换，那么列表的元素呢？
   lists[i], lists[j] =lists[j], lists[i]
   是否可以实现列表 i,j 元素的互换，如果可以实现，原理是什么？
   可以实现交换，至于原理，可以用 id 查看变量或元素的地址。因为 python 中的变量名类似于指针指向了某个地址，其交换也就是指向改变了。
   2）相加
   a = a + b
   b = a - b
   a = a - b 3)异或法
   a = a ^ b
   b = a ^ b
   a = a ^ b
2. divmod
python divmod() 函数把除数和余数运算结果结合起来，返回一个包含商和余数的元组(a // b, a % b)。
