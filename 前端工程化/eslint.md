## 用法

1.

```javascript
直接在代码文件中以注释的方式定义
需要注意的是，代码文件内以注释配置的规则会覆盖配置文件里的规则，即优先级要更高。
例如：
- 临时在一段代码中取消eslint检查，可以如下设置：
/* eslint-disable */

// Disables all rules between comments
alert(‘foo’);

/* eslint-enable */

- 临时在一段代码中取消个别规则的检查（如no-alert, no-console）：

/* eslint-disable no-alert, no-console */

// Disables no-alert and no-console warnings between comments
alert(‘foo’);
console.log(‘bar’);

/* eslint-enable no-alert, no-console */

- 在整个文件中取消eslint检查：

/* eslint-disable */

// Disables all rules for the rest of the file
alert(‘foo’);

- 在整个文件中禁用某一项eslint规则的检查：

/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
alert(‘foo’);

- 针对某一行禁用eslint检查：

alert(‘foo’); // eslint-disable-line

// eslint-disable-next-line
alert(‘foo’);

- 针对某一行的某一具体规则禁用eslint检查：

alert(‘foo’); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert(‘foo’);

- 针对某一行禁用多项具体规则的检查：

alert(‘foo’); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert(‘foo’);
```

2.

```javascript
通过配置.eslintignore文件忽略掉不想被检查的文件
可以通过在项目目录下建立.eslintignore文件，并在其中配置忽略掉对哪些文件的检查。需要注意的是，不管你有没有在.eslintignore中进行配置，eslint都会默认忽略掉对/node_modules/* 以及 /bower_components/*文件的检查。下面是一个简单的.eslintignore文件的内容。

# Ignore built files except build/index.js
build/
!build/index.js
```
