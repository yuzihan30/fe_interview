<!--
 * @Author: your name
 * @Date: 2022-04-25 13:56:36
 * @LastEditTime: 2022-05-17 09:56:23
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/后端/python.md
-->
1. 字符串转数字， int('x', n), n为2-32， n不写时就是转为10进制
2. reversed(seq) seq是要转换的序列，可以是 tuple, string, list 或 range， 返回一个反转的迭代器
3. python删除列表中值，pop()删除末尾值，del(arr[i])删除对应索引元素值，remove(11)删除列表中具体值，都会改变原列表
4. python中空值None首字母要大写, True\Flase也是首字母大写
5. python中列表转字符串 ''.join(迭代器), 注意与其他语言的不同， 前提是迭代器中元素需要是str类型
############## 数据类型bytes #################
1. 在python中，数据转成2进制后不是直接以010101的形式表示的，而是用一种叫bytes(字节)的类型来表示的。 例如 b'\xe8\x87\xaa\xe5
bytes类型是指一堆字节的集合，在python中以b开头的字符串都是bytes类型。
b'\xe5\xb0\x8f\xe7\x8c\xbf\xe5\x9c\x88'
b开头的都代表是bytes类型，是以16进制来显示的，2个16进制代表一个字节。
utf-8是3个字节代表一个中文，所以以上正好是9个字节
############## 列表 #################
1. python中删除列表元素的方法
1）remove: 删除单个元素，删除首个符合条件的元素，按值删除
举例说明:
>>> str=[1,2,3,4,5,2,6]
>>> str.remove(2)
>>> str
[1, 3, 4, 5, 2, 6]
2) pop: 删除单个或多个元素，按位删除(根据索引删除)
>>> str=[0,1,2,3,4,5,6]
>>> str.pop(1) #pop删除时会返回被删除的元素
>>> str
[0, 2, 3, 4, 5, 6]
>>> str2=['abc','bcd','dce']
>>> str2.pop(2)
'dce'
>>> str2
['abc', 'bcd']
3)del：它是根据索引(元素所在位置)来删除
举例说明:
>>> str=[1,2,3,4,5,2,6]
>>> del str[1]
>>> str
[1, 3, 4, 5, 2, 6]
>>> str2=['abc','bcd','dce']
>>> del str2[1]
>>> str2
['abc', 'dce']
除此之外，del还可以删除指定范围内的值。
>>> str=[0,1,2,3,4,5,6]
>>> del str[2:4] #删除从第2个元素开始，到第4个为止的元素(但是不包括尾部元素)
>>> str
[0, 1, 4, 5, 6]
del 也可以删除整个数据对象(列表、集合等)
>>> str=[0,1,2,3,4,5,6]
>>> del str
>>> str #删除后，找不到对象
Traceback (most recent call last):
File "<pyshell#27>", line 1, in <module>
str
NameError: name 'str' is not defined

2. 列表中添加元素
Python添加元素有三种方法：append、extend、insert
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
print(“extend前：”,list)
list2=[“A”,“B”]
list.extend(list2)
print(“extend后：”,list)
打印结果：
extend前： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18]
extend后： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18, ‘A’, ‘B’]
inset(index,objectA)：在指定位置index前面插入对象objectA
实例：
list=[“my”,“name”,“is”,“mark”,“age”,18]
print(“insert前：”,list)
list.insert(3,“test”)
print(“insert后：”,list)
打印结果：
insert前： [‘my’, ‘name’, ‘is’, ‘mark’, ‘age’, 18]
insert后： [‘my’, ‘name’, ‘is’, ‘test’, ‘mark’, ‘age’, 18]

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
由于二者指向内存不同，所以此时在原始列表中所做的修改不会反映在复制的列表中，反之亦然
3)切片[:], 和以上两种方法效果相同
4)列表生成式
copied_list=[i for i in original_list]，效果同上

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
首先运行 bar() 函数，创建了 bar() 中的局部变量 x，并赋值为10。
然后调用 foo()函数，形参为1000，即此时 foo 中的局部变量 x 为1000。
打印此时 foo 中的 x，数值为1000。
将 foo 中的局部变量 x 重新赋值为100，并打印。
foo 函数运行结束，foo 中的 x 作用结束，所以回到 bar 函数中，打印 bar 中的局部变量 x 为10。
2）全局变量
在所有函数外定义的变量就是全局变量，其在所有的函数中都能使用。
def foo():
    print('Foo 中的 x:', x)  // 这里的x值跟foo定义的位置有关系，跟调用的地方无关，类似js
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
第5行代码实际上是在 bar 函数中定义了一个局部变量 x 并将其赋值为 100，而不是修改全局变量 x 的值。所以无论是在bar 函数内部再调用 foo 函数，还是之后调用 foo 函数，其打印的 x 值都为20。
3）global关键字
如果我们想要在一个函数中对全局变量进行修改，怎么办呢？这个时候就可以使用 global 关键字了。在函数体内定义，并且使用global关键字修饰后，该变量也就变为全局变量。在函数体外也可以访问到该变量，并且在函数体内还可以对其进行修改。
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
tip: 尽管Python允许全局变量和局部变量重名，但是在实际开发时，不建议这么做，因为这样容易让代码混乱，很难分清哪些是全局变量，哪些是局部变量。
3）global关键字
如果我们想要在一个函数中对全局变量进行修改，怎么办呢？这个时候就可以使用 global 关键字了。在函数体内定义，并且使用global关键字修饰后，该变量也就变为全局变量。在函数体外也可以访问到该变量，并且在函数体内还可以对其进行修改。
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
tip: 尽管Python允许全局变量和局部变量重名，但是在实际开发时，不建议这么做，因为这样容易让代码混乱，很难分清哪些是全局变量，哪些是局部变量。
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

############## 类 #################
1. 私有方法，方法名前下划线标识

2. 类内定义方法，第一个参数为self，类内方法相互调用或者自己调动自己需要self.方法

