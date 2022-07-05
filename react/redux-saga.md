## redux-saga 可以干什么

非侵入式的和 redux 结合，不像之前的方案将 action 变成对象或者 promise, saga 在异步管控方面写起来更优美;本质上用到了 es6 的生成器函数

## generator

```javascript
// 像一个状态机，可以被中断
function* test() {
  console.log("111");
  // yield "111输出"; // 产出一个状态值；星号和yield是生成器的两个重要标识；python中叫协程任务能让程序中断；有输出可以称为状态机，比如return,这里yield可以有输出
  let input1 = yield "111输出"; // 这个地方就可以接收
  console.log("222", input1);
  yield "222输出";
  console.log("333");
  yield "333输出";
}
let gen = test(); // 推一把才行，找个变量记录下来
// gen.next(); // next让生成器方法走一次
// let res1 = gen.next();
// next还能接收参数
// let res1 = gen.next("aaa"); // 第一次只是让开始执行，遇到yield就停了，所以传参数没意义，接收不到
let res1 = gen.next();
console.log(res1); // 包含两个属性，一个是value，一个是done
// let res2 = gen.next();
let res2 = gen.next("bbb"); // 第二次传入，并执行next后，input1能接收到
console.log(res2);
// let res3 = gen.next();
let res3 = gen.next("ccc");
console.log(res3);
let res4 = gen.next();
console.log(res4); // value: undefined, done: true
```

```javascript
function* test1() {
  setTimeout(() => {
    console.log("111-success");
    genTest1.next(); // 依赖外部变量，偶尔太大
  }, 1000);
  yield;
  setTimeout(() => {
    console.log("222-success");
    genTest1.next();
  }, 1000);
  yield;
  setTimeout(() => {
    console.log("333-success");
    genTest1.next();
  }, 1000);
  yield;
}
let genTest1 = test1();
genTest1.next();
// 上面这种写法副作用很大
```

下面引出可执行生成器，完成自动化链式调用功能

```javascript
function getData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data1");
    }, 1000);
  });
}
function getData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data2");
    }, 1000);
  });
}
function getData3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data3");
    }, 1000);
  });
}
function* gen() {
  let f1 = yield getData1();
  console.log(f1);
  let f2 = yield getData2(f1);
  console.log(f2);
  let f3 = yield getData1(f2);
  console.log(f3);
}
function run(fn) {
  var g = fn();
  function next(data) {
    var result = g.next(data);
    if (result.done) {
      return result.value;
    }
    result.value.then((res) => {
      next(res);
    });
  }
  next();
}
run(gen);
```

## redux-saga

同步，redux 自己都可以处理;redux-saga 主要用于处理异步流程的
`npm -i redux-saga`

```typescript
<button
  onClick={() => {
    if (store.getState().list1.length === 0) {
      // dispatch
      store.dispatch({
        type: "get-list",
      });
    } else {
      console.log("缓存", store.getState().list1);
    }
  }}
>
  click-ajax-异步处理
</button>
```

redux 文件夹下创建 store.js、reducer.js、actionCreator.js

```javascript
// store.js
import { createStore, applyMiddleware } from "redux";
import reducer from "reducer";
import createSagaMiddleWare from "redux-saga";
const SagaMiddleWare = createSagaMiddleWare(); // 这里和以前不太一样，需要先生成对象
const store = createStore(reducer, applyMiddleware(SagaMiddleWare));
SagaMiddleWare.run(watchSaga); // 运行saga监听者，saga任务需要自己写，监听谁，再重新生成一个action; 在redux目录下建saga.js写saga任务
export default store;
```

```javascript
// reducer.js
const reducer = (prevState = { list1: [] }, action = {}) => {
  var newState = { ...preState };
  switch (action.type) {
    case "change-list":
      newState.list1 = action.payload;
      return newState;
    default:
      return preState;
  }
  return prevState;
};
export default reducer;
```

```javascript
// saga.js
import { take, fork, put, call } from "redux-saga/effects";
function* watchSaga() {
  while (true) {
    // take 监听 组件发来的action
    yield take("get-list");
    // fork 同步执行异步处理函数, 监听到之后立马执行后面的生成器函数; 非阻塞调用的形式执行fn
    yield fork(getList);
  }
}

function* getList() {
  // 异步处理的

  // call函数发异步请求
  let res = yield call(getListAction); // 一定等到结果回来才会往下执行；里面传的是：返回值是promise对象的函数;阻塞式的调用fn
  // 成功之后，通过pull函数发出新的action; 非阻塞式执行
  yield put({
    type: "change-list",
    payload: res,
  });
}

function getListAction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["1111", "2222", "3333"]);
    }, 2000);
  });
}
export default watchSaga;
```

## saga 监听多个异步

redux 目录下建 saga 目录->saga1.js、saga2.js
redux 目录下建 ->saga.js 来统一导出上面的俩

```javascript
// saga1.js
import { take, fork, put, call } from "redux-saga/effects";
function* watchSaga1() {
  while (true) {
    // take 监听 组件发来的action
    yield take("get-list1");
    // fork 同步执行异步处理函数, 监听到之后立马执行后面的生成器函数; 非阻塞调用的形式执行fn
    yield fork(getList1);
  }
}

function* getList1() {
  // 异步处理的

  // call函数发异步请求
  let res = yield call(getListAction1); // 一定等到结果回来才会往下执行；里面传的是：返回值是promise对象的函数;阻塞式的调用fn
  // 成功之后，通过pull函数发出新的action; 非阻塞式执行
  yield put({
    type: "change-list1",
    payload: res,
  });
}

function getListAction1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["1111", "2222", "3333"]);
    }, 2000);
  });
}
export default watchSaga1;
```

```javascript
// saga2.js
import { take, fork, put, call } from "redux-saga/effects";
function* watchSaga2() {
  while (true) {
    // take 监听 组件发来的action
    yield take("get-list2");
    // fork 同步执行异步处理函数, 监听到之后立马执行后面的生成器函数; 非阻塞调用的形式执行fn
    yield fork(getList2);
  }
}

function* getList2() {
  // 异步处理的

  // call函数发异步请求
  let res = yield call(getListAction2); // 一定等到结果回来才会往下执行；里面传的是：返回值是promise对象的函数;阻塞式的调用fn
  // 成功之后，通过pull函数发出新的action; 非阻塞式执行
  yield put({
    type: "change-list2",
    payload: res,
  });
}

function getListAction2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["4444", "5555", "6666"]);
    }, 2000);
  });
}
export default watchSaga2;
```

```javascript
// saga2.js
import { all } from "redux-saga/effects";
import watchSaga1 from "./saga/saga1";
import watchSaga2 from "./saga/saga2";
function* watchSaga() {
  yield all([watchSaga1(), watchSaga2()]);
}
export default watchSaga;
```

```javascript
// reducer.js
const reducer = (prevState = { list1: [], list2: [] }, action = {}) => {
  var newState = { ...preState };
  switch (action.type) {
    case "change-list1":
      newState.list1 = action.payload;
      return newState;
    case "change-list2":
      newState.list2 = action.payload;
      return newState;
    default:
      return preState;
  }
  return prevState;
};
export default reducer;
```

```typescript
<button
  onClick={() => {
    if (store.getState().list1.length === 0) {
      // dispatch
      store.dispatch({
        type: "get-list1",
      });
    } else {
      console.log("缓存", store.getState().list1);
    }
  }}
>
  click-ajax-异步处理1
</button>
<button
  onClick={() => {
    if (store.getState().list2.length === 0) {
      // dispatch
      store.dispatch({
        type: "get-list2",
      });
    } else {
      console.log("缓存", store.getState().list2);
    }
  }}
>
  click-ajax-异步处理2
</button>
```

## saga 处理异步依赖的情况

第二个异步需要等第一个异步的结果

```javascript
// saga2.js
import { take, fork, put, call } from "redux-saga/effects";
function* watchSaga2() {
  while (true) {
    // take 监听 组件发来的action
    yield take("get-list2");
    // fork 同步执行异步处理函数, 监听到之后立马执行后面的生成器函数; 非阻塞调用的形式执行fn
    yield fork(getList2);
  }
}

function* getList2() {
  // 异步处理的

  // call函数发异步请求
  let res1 = yield call(getListAction2_1); // 一定等到结果回来才会往下执行；里面传的是：返回值是promise对象的函数;阻塞式的调用fn
  let res2 = yield call(getListAction2_2, res1);
  // 成功之后，通过pull函数发出新的action; 非阻塞式执行
  yield put({
    type: "change-list2",
    payload: res2,
  });
}

function getListAction2_1(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["4444", "5555", "6666"]);
    }, 2000);
  });
}
function getListAction2_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...data, "7777", "8888", "9999"]);
    }, 2000);
  });
}
export default watchSaga2;
```

## saga 监听器的另一种写法

```javascript
// saga1.js
import { takeEvery, put, call } from "redux-saga/effects";
function* watchSaga1() {
  // yield takeEvery("get-list1", getList1)写到saga-every后，这里就可以不用写了
  //   while (true) {
  //     // take 监听 组件发来的action
  //     yield take("get-list1");
  //     // fork 同步执行异步处理函数, 监听到之后立马执行后面的生成器函数; 非阻塞调用的形式执行fn
  //     yield fork(getList1);
  //   }
  yield takeEvery("get-list1", getList1); // 其实就是一个高阶函数
}

function* getList1() {
  // 异步处理的

  // call函数发异步请求
  let res = yield call(getListAction1); // 一定等到结果回来才会往下执行；里面传的是：返回值是promise对象的函数;阻塞式的调用fn
  // 成功之后，通过pull函数发出新的action; 非阻塞式执行
  yield put({
    type: "change-list1",
    payload: res,
  });
}

function getListAction1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["1111", "2222", "3333"]);
    }, 2000);
  });
}
export default watchSaga1;
export { getList1 };
```

saga2.js 同样道理
redux 目录下->saga-every.js

```javascript
import { takeEvery } from "redux-saga";
import { getList1 } from "./saga/saga1";
import { getList2 } from "./saga/saga2";
function* watchSaga() {
  yield takeEvery("get-list1", getList1);
  yield takeEvery("get-list2", getList2);
}
export default watchSaga;
```

p128-p133 暂时忽略
