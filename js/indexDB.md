<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-17 10:36:01
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-17 10:38:00
 * @FilePath: /fe_interview/js/indexDB.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. indexDB简洁
目前很多浏览器端据存储方案都不适合存储大量数据，例如Cookies容量不超过4KB,且每次请求都会发送回服务器lallorse容量在2.5~I0MB之间，且需要以学符申形式进行存储。为此,浏览器端的数据存储需要种新的技术方案，IndexedDB应运而生。

在了解IndexedDB之前，首先了解以下两种不同类型的数据库:关系型和文档型(也称为NoSQL或对象)。

关系型数据库:如SQLServer.MySQL.Oracle,此类数据库将数据存储在表中。
文档型数据库:如MongoDB、CouchDB、Redis,此类数据库将数据集作为个体对象存储。

IndexedDB是HTML5提供的内置于浏览器中的数据库，它可以通过网页脚本程序创建和操作。IndexedDB允许储存大量数据,并且提供查询接口建立索引的功能。就数据库类型而言，IndexedDB不属于关系型数据库(不支持SQL查询语句),更接近文档型数据库。IndexedDB具备以下几个特点:

(1)键值对储存
IndexedDB内部采用对象仓库(ObjectStore)存放数据，所有类型的数据都可以直接存入包括JavaScript对象。在对象仓库中，数据以“键值对”的形式保存，每一个数据都有对应的键名且键名必须是唯一的，否则会抛出错误。

(2)异步API
IndexedDB数据库在执行增、删、改、查操作时不会锁死浏览器,用户依然可以进行其他操作。与localStorage的同步设计相比，IndexedDB的异步设计可以防止大量数据读写时拖慢网页加载速度，而影响用户的网站体验。

(3)支持事务
事务的概念在关系型数据库中应用比较广泛,这里读者只需要简单理解它的作用即可。举个例子，一次操作需要在一 个数据表中同时插入两条数据，第1条数据插入成功，第2条数据插入失败。那么，对于整个操作来说，两条数据都插入成功才算成功，失败时便需要事务的回滚,将已经插入的第1条数据清除。

IndexedDB支持事务意味着在一系列操作步骤之中，只要有 一步失败，整个事务就都取消，数据库回到事务发生之前的状态,不存在只改写一部分数据的情况。
在IndexedDB中，事务会自动提交或回滚。当请求一个事务时,必须指定事务的请求访问模式。

(4)同域限制
IndexedDB也受到同域限制，每-一个数据库对应创建该数据库的域名，来自不同域名的网页只能访问自身域名下的数据库，而不能访问其他域名下的数据库。

(5)存储空间大
IndexedDB的存储空间比localStorage大得多，一般来说不少于250MB。不同浏览器的限制不同,IE的储存上限是250MB,Chrome和Opera浏览器的存储上限是硬盘剩余空间的某个百分比,Firefox浏览器则没有上限。

(6)支持二进制储存
前8Cbexebnl1.8.If
IndexedDB不仅可以储存字符串,还可以储存二进制数据。
根据上述特点,IndexedDB适用于以下场景:
●用户通过浏览器访问应用程序。
开发人员需要在客户端存储大量的数据。
●开发人员需要在一个大型的数据集合中快速定位单个数据点。
●客户端数据存储需要事务支持。
浏览器的更新速度较快,因此关于浏览器对IndexedDB的支持,读者可以到http:// caniuse. com/ # search= indexdb这个网址查看最新的支持情况。