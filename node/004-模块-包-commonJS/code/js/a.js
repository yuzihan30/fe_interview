function test() {
  console.log("test-aaa");
}
// 然后b和c都想用这个方法
function upper(str) {
  _init(); // 内部用的方法, 不成文的规定；最后发现c也去用这个_init方法
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
function _init() {
  console.log("init");
}
