function lastIndexOf(x, y) {
  // 1. 初始化
  let m = x.length;
  let n = y.length;
  let indexArr = [];
  let i = 0;
  // 2. 遍历y数组
  while (i < n) {
    let j = 0;
    while (j < m) {
      if (y[i] == x[j]) {
        j++;
        i++;
      } else {
        break;
      }
    }
    if (j == m) {
      indexArr.push(i - m);
    } else {
      i = i - j + 1;
    }
  }
  // 3. 返回结果值
  return indexArr.pop();
}

let x = ["xx", "xx", "xx", "we"];
let y = ["xx", "xx", "xx", "xx", "we"];
console.log(lastIndexOf(x, y));
