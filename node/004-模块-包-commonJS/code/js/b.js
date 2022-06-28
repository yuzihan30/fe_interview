function test() {
  console.log("test-bbb");
}
// 这时用到了a中方法，加载时必须a在前b在后，顺序乱了会出问题，比如b放到
// a前面，b在加载执行时a还没加载进来；文件少的时候不会犯这种错误，文件多的时候
var result = upper("bbb");
console.log(result);
