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

## graphql 结合数据库

```javascript
const express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
// 第一步：创建启动数据库服务，根目录创建db文件夹，windows终端执行./mongod.exe --dbpath=db目录绝对路径，27017
// 第二步：连接数据库服务
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost: 27017/moon", {
    useNewUrlParser: true, useUnifiedTopology: true // 防止报警
}) // 取个数据库名字moon
// 限制 数据库这个films(集合表)只能存三个字段
var FilmModel = mongoose.model("film", new mongoose.Schema({
    name: String,
    poster: String,
    // price: Int // 这里js就要换成Number
    price: Int
})) // film对应后面表名就叫films
// FilmModel.create
// FilmModel.find
// FilmModel.update
// FilmModel.delete
// 第三步：crud
// 第四步：可视化工具查有没有成功，Robomongo
var schema = buildSchema(`{
    type Film {
        // id: Int, // 这个注意，结合数据库后这个id就变成字符串了，一个长串
        id: String,
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
        // updateFilm(id: Int!, input: FilmInput): Film,
        updateFilm(id: String!, input: FilmInput): Film, // 通常情况下只关心真假，返回个Int类型就行
        // deleteFilm(id: Int!): Int
        deleteFilm(id: String!): Int
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
    // return faskeDb;
    return FilmModel.find();
  },
  createFilm({ input }) {
    // mongo的使用，先创建模型，后操作数据库；
    // 创建模型的好处，其他增删改查都可以复用这个模型；
    // 它是把操作数据库，按照有对象模型进行操作的；这个模型是
    // 给数据库用的，而不是给graph用的
    // FilmModel.create({
    //     ...input
    // }).then(res => {
    //     console.log(res)
    // })
    // graphql支持返回promise对象
    return FilmModel.create({
        ...input
    })
    return obj;
  },
  updateFilm({id, input}) {
    // 查出多个更新用updateMany
    // 查出一个更新用updateOne
    // id唯一主键查就查出一个
    // 这就是mongo的代码跟graphql没关系
    return FilmModel.updateOne({
        _id: id
    }, {// 第二个参数是要更新的数据
        ...input
    }).then(res => FilmModel.find({_id: id})).then(res=>res[0])
    // 一般update返回成功信息而不是详情，
    // then(res => FilmModel.find({_id: id}))是为了测试更新后的详情
    // find返回数组，我们只要第0个元素
  },
  deleteFilm({id}) {
    // deleteOne删除一个，deleteMany删除多个
    return FilmModel.deleteOne({_id: id}).then(res=>1)
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
    updateFilm(id: "6898eb1b2", input: {
        name: "111-修改",
        poster: "111-poster-修改"
    }){
        id, // id会自动补全
        name
    }
}
mutation {
    // deleteFilm(id: 1) // 返回值是基本类型，不用指定要哪个字段这些
    deleteFilm(id: "9ab34")
}
```

## graphql 客户端访问

客户端发出 graphql 的请求
server 项目目录下创建 public 文件夹->建静态资源页面 html,
express 可以指定某个文件夹为静态资源文件夹

```javascript
const express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
// 第一步：创建启动数据库服务，根目录创建db文件夹，windows终端执行./mongod.exe --dbpath=db目录绝对路径，27017
// 第二步：连接数据库服务
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost: 27017/moon", {
    useNewUrlParser: true, useUnifiedTopology: true // 防止报警
}) // 取个数据库名字moon
// 限制 数据库这个films(集合表)只能存三个字段
var FilmModel = mongoose.model("film", new mongoose.Schema({
    name: String,
    poster: String,
    // price: Int // 这里js就要换成Number
    price: Int
})) // film对应后面表名就叫films
// FilmModel.create
// FilmModel.find
// FilmModel.update
// FilmModel.delete
// 第三步：crud
// 第四步：可视化工具查有没有成功，Robomongo
var schema = buildSchema(`{
    type Film {
        // id: Int, // 这个注意，结合数据库后这个id就变成字符串了，一个长串
        id: String,
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
        // updateFilm(id: Int!, input: FilmInput): Film,
        updateFilm(id: String!, input: FilmInput): Film, // 通常情况下只关心真假，返回个Int类型就行
        // deleteFilm(id: Int!): Int
        deleteFilm(id: String!): Int
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
    // return faskeDb;
    return FilmModel.find();
  },
  createFilm({ input }) {
    // mongo的使用，先创建模型，后操作数据库；
    // 创建模型的好处，其他增删改查都可以复用这个模型；
    // 它是把操作数据库，按照有对象模型进行操作的；这个模型是
    // 给数据库用的，而不是给graph用的
    // FilmModel.create({
    //     ...input
    // }).then(res => {
    //     console.log(res)
    // })
    // graphql支持返回promise对象
    return FilmModel.create({
        ...input
    })
    return obj;
  },
  updateFilm({id, input}) {
    // 查出多个更新用updateMany
    // 查出一个更新用updateOne
    // id唯一主键查就查出一个
    // 这就是mongo的代码跟graphql没关系
    return FilmModel.updateOne({
        _id: id
    }, {// 第二个参数是要更新的数据
        ...input
    }).then(res => FilmModel.find({_id: id})).then(res=>res[0])
    // 一般update返回成功信息而不是详情，
    // then(res => FilmModel.find({_id: id}))是为了测试更新后的详情
    // find返回数组，我们只要第0个元素
  },
  deleteFilm({id}) {
    // deleteOne删除一个，deleteMany删除多个
    return FilmModel.deleteOne({_id: id}).then(res=>1)
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
// 配置静态资源目录
app.use(express.static("public"))
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
    updateFilm(id: "6898eb1b2", input: {
        name: "111-修改",
        poster: "111-poster-修改"
    }){
        id, // id会自动补全
        name
    }
}
mutation {
    // deleteFilm(id: 1) // 返回值是基本类型，不用指定要哪个字段这些
    deleteFilm(id: "9ab34")
}
```

都在同一个 server 项目目录下，没有跨域的问题

```html
<!-- home.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <h1>home</h1>
    <button onclick="getData()">查询数据</button>
    <button onclick="createData()">创建数据</button>
    <button onclick="updateData()">更新数据</button>
    <button onclick="deleteData()">删除数据</button>
    <!-- 测试发现不支持这种格式，需要进一步验证 -->
    <!-- <inputtype="text" readonly value="aaa"/> -->
    <script>
      function getData() {
        const myquery = `
        query {
            getNowplayingList {
                id,
                name,
                price
            }
        }
        `;
        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: myquery,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          }); // fetch两次链式调用，最后一个才拿到真正的数据
      }
      function createData() {
        const myquery = `
        // FilmInput 对应后端的FilmInput
        mutation ($input: FilmInput){
            createFilm(input: $input) {
                id,
                name
            }
        }
        `;
        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: myquery,
            variables: {
              input: {
                // 前端往后传的时候这段会替换掉myquery中的$input
                name: "666",
                price: 60,
                poster: "http://6666",
              },
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          }); // fetch两次链式调用，最后一个才拿到真正的数据
      }
      function updateData() {
        const myquery = `
            // $id: String!, input: FilmInput 需要跟后端的查询规则一模一样，包括！号
            mutation ($id: String!, input: FilmInput ){
                updateFilm(id: $id, input:$input // id不能写死， input也不能写死
                ){
                    id, // id会自动补全
                    name
                }
            }
        `;
        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: myquery,
            variables: {
              id: "87eab3c",
              input: {
                // 前端往后传的时候这段会替换掉myquery中的$input
                name: "666-修改",
                price: 60,
                poster: "http://6666-修改",
              },
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          }); // fetch两次链式调用，最后一个才拿到真正的数据
      }

      function deleteData() {
        const myquery = `
            mutation ($id: String!) {
                // deleteFilm(id: 1) // 返回值是基本类型，不用指定要哪个字段这些
                deleteFilm(id: $id)
            }
        `;
        fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            // 如果是axios，则第二个参数传它就行了
            query: myquery,
            variables: {
              id: "87eab3c",
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          }); // fetch两次链式调用，最后一个才拿到真正的数据
      }
    </script>
  </body>
</html>
```

## react 结合 graphql

react 中万物皆组件，查询可以单独做个组件
阿波罗模块是对 graphql 的封装，可以像组件那样使用 graphql,写成跨域组件、写成 mutation 组件其实就是在实现一些增删改等功能
`npm i react-apollo apollo-boost graphql graphql-tag`

```typescript
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    // uri: "http://localhost: 3000/graphql"
    uri: "/graphql"
})
render() {
    return (
        <ApolloProvider client={client}>
            <div>
                <MoonQuery></MoonQuery> // 新建的查询组件
            </div>
        </ApolloProvider>
    )
}
// MoonQuery
class MoonQuery extends Component {
    query = gql`
        query {
            getNowplayingList {
                id,
                name,
                price
            }
        }
    `
    render(){
        // 无参数版本
        return <Query query={this.query}>
            {
                ({loading, data})=>{
                    console.log(loading)
                    return loading? <div>loading...</div>:
                    <div>
                    // query
                        {
                            data.getNowplayingList.map(item=>{
                                <div></div>
                            })
                        }
                    </div>
                    // console.log(data)
                    // return <div>query</div>
                }
            }
        </Query>
    }
}

// 跨域处理，还是要反向代理,参考之前的setupProxy.js文件
app.use(
    '/graphql', // /api/list /api/detail 只过滤api开头的
    createProxyMiddleware({
        target: "http://localhost:3000", //代理就朝这个地址发请求，"https://i.maoyan.com" + "/ajax/..."
        changeOrigin: true // 改变域名这个是固定的
    })
) // 可以配置多个
```

```typescript
// 带参数版本
// db.js
type Query {
    getNowplayingList(id: String!):[Film]
}
// 对应处理器的情况, _id对应mongodb的情况
const root = {
    getNowplayingList({id}) {
        return FilmModel.find({_id:id})
    }
}

// MoonQuery
class MoonQuery extends Component {
    query = gql`
        query getNowplayingList($id: String){
            getNowplayingList(id: $id) {
                id,
                name,
                price
            }
        }
    `
    state={
        id: "98ea125"
    }
    render(){
        return <div>
            <input type="text" onChange={(evt) => {
                this.setState({
                    id: evt.target.value
                })
            }}>
            <Query query={this.query} variables={{id: this.state.id}}>
                {
                    ({loading, data})=>{
                        console.log(loading)
                        return loading? <div>loading...</div>:
                        <div>
                        // query
                            {
                                data.getNowplayingList.map(item=>{
                                    <div></div>
                                })
                            }
                        </div>
                        // console.log(data)
                        // return <div>query</div>
                    }
                }
            </Query>
        </div>
    }
}
```

## react mutation

```typescript
// db.js
import { ApolloProvider, Mutation } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    // uri: "http://localhost: 3000/graphql"
    uri: "/graphql"
})
render() {
    return (
        <ApolloProvider client={client}>
            <div>
                <MoonCreate></MoonCreate> // 新建的查询组件
            </div>
        </ApolloProvider>
    )
}


type Query {
    getNowplayingList(id: String!):[Film]
}
// 对应处理器的情况, _id对应mongodb的情况
const root = {
    getNowplayingList({id}) {
        return FilmModel.find({_id:id})
    }
}

// MoonCreate
class MoonCreate extends Component {
    createFilm = gql`
        mutation createFilm($input: FilmInput){
            createFilm(input: $input){
                id,
                name,
                price
            }
        }
    `
    render(){
        return <div>
            <Mutation mutation={this.createFilm}>
            {
                (createFilm, {data})=>{
                    console.log(data)
                    return <div>
                        <button onClick={()=>{
                            createFilm({
                                variables: {
                                    input: {
                                        name: "777",
                                        poster: "http://777",
                                        price: 70
                                    }
                                }
                            })
                        }}>add</button>
                    </div>
                }
            }
            </Mutation>
        </div>
    }
}
```

// MoonUpdate

```typescript
// 带参数版本
// db.js
import { ApolloProvider, Mutation } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    // uri: "http://localhost: 3000/graphql"
    uri: "/graphql"
})
render() {
    return (
        <ApolloProvider client={client}>
            <div>
                <MoonUpdate></MoonUpdate> // 新建的查询组件
            </div>
        </ApolloProvider>
    )
}


type Query {
    getNowplayingList(id: String!):[Film]
}
// 对应处理器的情况, _id对应mongodb的情况
const root = {
    getNowplayingList({id}) {
        return FilmModel.find({_id:id})
    }
}

// MoonUpdate
class MoonUpdate extends Component {
    createFilm = gql`
        mutation updateFilm($id:String!, $input: FilmInput){
            updateFilm(id: $id, input: $input){
                id,
                name,
                price
            }
        }
    `
    render(){
        return <div>
            <Mutation mutation={this.createFilm}>
            {
                (updateFilm, {data})=>{
                    console.log(data)
                    return <div>
                        <button onClick={()=>{
                            createFilm({
                                variables: {
                                    id: "7658eda34",
                                    input: {
                                        name: "777-修改",
                                        poster: "http://777-修改",
                                        price: 70
                                    }
                                }
                            })
                        }}>delete</button>
                    </div>
                }
            }
            </Mutation>
        </div>
    }
}
```

// MoonUpdate

```typescript
// 带参数版本
// db.js
import { ApolloProvider, Mutation } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    // uri: "http://localhost: 3000/graphql"
    uri: "/graphql"
})
render() {
    return (
        <ApolloProvider client={client}>
            <div>
                <MoonUpdate></MoonUpdate> // 新建的查询组件
            </div>
        </ApolloProvider>
    )
}


type Query {
    getNowplayingList(id: String!):[Film]
}
// 对应处理器的情况, _id对应mongodb的情况
const root = {
    getNowplayingList({id}) {
        return FilmModel.find({_id:id})
    }
}

// MoonDelete
class MoonDelete extends Component {
    createFilm = gql`
        mutation deleteFilm($id:String!){
            deleteFilm(id: $id)
        }
    `
    render(){
        return <div>
            <Mutation mutation={this.createFilm}>
            {
                (deleteFilm, {data})=>{
                    console.log(data)
                    return <div>
                        <button onClick={()=>{
                            deleteFilm({
                                variables: {
                                    id: "7658eda34",
                                }
                            })
                        }}>update</button>
                    </div>
                }
            }
            </Mutation>
        </div>
    }
}
```
