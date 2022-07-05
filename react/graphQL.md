## 思想

使用 GraphQL 接口时，可以基于定义约定想要的东西，然后 GraphQL 会根据请求，只返回想要的数据，这点类似于 SQL。同时，可以在一次 GraphQL 请求发送多个函数调用请求，这样可以减少请求的发送量，从而提高响应速度。
这种按照接口的类型定义，不断嵌套的抓取数据正是 GraphQL 中 Graph 的由来，表达了 Graph + QL = 按图 + 索骥内涵。
当然这种变态的抓取是非常恐怖的，如果有坏人故意发这种请求搞死我们，我们就完了，所以必须有一种方式来限制这种行为。
好在，我们可以对用户的请求进行 AST 语法分析，限制嵌套的深度，比如，我们可以让你最多嵌套 3 层。

## 参考资料

https://juejin.cn/post/6844903647256526855

## 场景

升级后某个功能是旧的多个接口中的数据组合；小程序是 PC 端接口的一小部分；后端提供的数据刚刚好事前端需要的数据；需要后端支持
特点：

- 请求需要的数据，不多不少
- 从多个接口获取资源，只需要一个请求，聚合的意思

```javascript
var express = require('express')
var graphqlHTTP = require('express-graphql')
var {buildSchema} = require('graphql')
// 定义查询语句和类型
var schema = buildSchema({
    type Query {
        hello: String
    }
})
// 定义查询对应的resolver, 也就是查询对应的处理器
var root = {
    hello: () => {
        return 'Hello world!'
    }
}
var app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // 调试器，后端写好可以先调试
}))
app.listen(4000)
```

01-helloworld.js

```javascript
const express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var schema = buildSchema(`{
    type Query {
        hello: String,
        getName: String,
        getAge: Int
    }
}`);

// 上面是定义(相当于轮廓)，这里是实现
var root = {
  hello: () => {
    // 通过数据库查询
    var str = "Hello world!";
    return str;
  },
  getName: () => {
    return "aaa";
  },
  getAge: () => {
    return 18;
  },
};
var app = express();

app.use("/home", function (req, res) {
  res.send("home data");
});
app.use("/list", function (req, res) {
  res.send("list data");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // 调试器，后端写好可以先调试
  })
);
app.listen(3000);
```

改完代码后需要重启才生效
nodemon ./xx.js // nodemon 可以帮助自动重启
npm i -g nodemon node-dev // 两个都行, 但有时浏览器仍需要重启

## 参数类型和传递

基本类型： String, Int, Float, Boolean
数组：[int]

```javascript
const express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var schema = buildSchema(`{
    type Account {
        name: String,
        age: Int,
        location: String
    }
    type Film {
        id: Int,
        name: String,
        poster: String,
        price: Int
    }
    type Query {
        hello: String,
        getName: String,
        getAge: Int,
        getAllNames: [String],
        getAllAges: [Int],
        getAccountInfo: Account, // 其他复杂类型需要自定义基本类型; 类似于之前写接口，描述一个对象
        getNowplayingList: [Film],
        getFilmDetail(id: Int!): Film, // 感叹号必须传的意思


    }
}`);
var faskeDb = [
  {
    id: 1,
    name: "111",
    poster: "http://111",
    price: 100,
  },
  {
    id: 2,
    name: "222",
    poster: "http://222",
    price: 200,
  },
  {
    id: 3,
    name: "333",
    poster: "http://333",
    price: 100,
  },
];
// 上面是定义(相当于轮廓)，这里是实现
var root = {
  hello: () => {
    // 通过数据库查询
    var str = "Hello world!";
    return str;
  },
  getName: () => {
    return "aaa";
  },
  getAge: () => {
    return 18;
  },
  getAllNames: () => {
    return ["aa", "bb", "cc"];
  },
  getAllAges: () => {
    return [19, 20, 21];
  },
  getAccountInfo() {
    // 不带冒号的简写方法
    return {
      name: "少安",
      age: 28,
      location: "榆林",
    };
  },
  getNowplayingList() {
    return faskeDb;
  },
  getFilmDetail({ id }) {
    console.log(id);
    return faskeDb.filter((item) => item.id === id)[0];
  },
};
var app = express();

app.use("/home", function (req, res) {
  res.send("home data");
});
app.use("/list", function (req, res) {
  res.send("list data");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // 调试器，后端写好可以先调试
  })
);
app.listen(3000);
```

```javascript
query {
    getAllAges,
    getAllNames,
    getAccountInfo { // 复杂类型，浏览器页面查的时候可以要什么取什么
        name
    }
}
// 数组也能按需索取
query {
    getNowplayingList {
        id,
        name,
        price
    }
}
query {
    getFilmDetail(id: 2){
        id // 要哪个字段
    }
}
```

## 增删改 mutation

```javascript
const express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var schema = buildSchema(`{
    type Film {
        id: Int,
        name: String,
        poster: String,
        price: Int
    }
    input FilmInput { // 注意是input
        name: String,
        poster: String,
        price: Int
    }
    type Query {
        getNowplayingList: [Film],
    }
    type Mutation{
        createFilm(input: FilmInput): Film,
        updateFilm(id: Int!, input: FilmInput): Film,
        deleteFilm(id: Int!): Int
    }
}`);
var faskeDb = [
  {
    id: 1,
    name: "111",
    poster: "http://111",
    price: 100,
  },
  {
    id: 2,
    name: "222",
    poster: "http://222",
    price: 200,
  },
  {
    id: 3,
    name: "333",
    poster: "http://333",
    price: 100,
  },
];
// 上面是定义(相当于轮廓)，这里是实现
var root = {
  getNowplayingList() {
    return faskeDb;
  },
  createFilm({ input }) {
    // 按之前id的解构情况，这里也是需要解构才能拿到input值
    var obj = { ...input, id: faskedDb.length + 1 };
    faskedDb.push(obj);
    return obj;
  },
  updateFilm({id, input}) {
    consol.log(id, input)
    var current = null
    faskeDb = faskeDb.map(item=>{
        if(item.id===id) {
            current = {...item, ...input}
            return {...item, ...input}
        }
        return item
    })
    return current
  },
  deleteFilm({id}) {
    faskeDb = faskeDb.filter(item => item.id!==id)
    return 1
  }
};
var app = express();

app.use("/home", function (req, res) {
  res.send("home data");
});
app.use("/list", function (req, res) {
  res.send("list data");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // 调试器，后端写好可以先调试
  })
);
app.listen(3000);

// 调试工具一次只能调一个查或者改
mutation {
    createFilm({
        name: "平凡的世界",
        poster: "http://333",
        price: 100,
    }) {
        id,
        name,
        price,
        poster,

    }
}
mutation {
    updateFilm(id: 1, input: {
        name: "111-修改",
        poster: "111-poster-修改"
    }){
        id, // id会自动补全
        name
    }
}
mutation {
    deleteFilm(id: 1) // 返回值是基本类型，不用指定要哪个字段这些
}
```
