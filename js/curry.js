function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    // if (_args >= len) {
    if (_args.length >= len) {
      // fn.call(this, ..._args)
      return fn.call(this, ..._args);
    } else {
      // _curry.call(this, fn, len, ..._args)
      return _curry.call(this, fn, len, ..._args);
    }
  };
}

function add(a, b, c, d) {
  console.log(a + b + c + d);
}

let curryAdd = curry(add);
curryAdd(1)(2)(3)(4);

function curry(a, b) {
  // do something...
  return (nextVal) => {
    return nextVal + arguments;
  };
}

let func = (i) => {
  return (done, wait) => {
    setTimeout(() => {
      console.log(i);
      done();
    }, wait);
  };
};

async function start(num) {}

start(10);

// 要实现的效果：
// 过1秒输出1，过2秒输出2，过3秒输出3以此类推
