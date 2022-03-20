<!--
 * @Author: your name
 * @Date: 2022-03-19 21:36:25
 * @LastEditTime: 2022-03-20 15:36:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/webpack/webpack.md
-->
webpack和vite比较
1. webpack在应用比较大时，存在dev server冷启动时间长，HMR热更新慢的问题。原因是webpack dev server在启动时需要先build然后启动webserver，而vite在执行vite serve时直接启动web server,并不会编译所有文件
2. vite特点：轻量、按需打包、HMR(热渲染依赖)

########## webpack优化 #########
speed-measure-webpack-plugin用于测量loader和plugin耗时
使用方法：使用该插件的wrap方法包裹webpack配置（require导入插件, 实例化smp，调用smp.wrap(config)）
1. exclude/include减少转译文件, 使用绝对路径数组, exclude优先级高，优先使用include
示例：include: [path.resolve(__dirname, 'src')]

2. cache-loader将转译结果缓存下来，也可以通过给babel-loader配置cacheDirectory选项为true（默认false）,设置空值或者true时默认缓存目录node_modules/.cache/babel-loader
示例：use: ['cache-loader', 'bable-loader']

3. happypack 多进程打包，将任务分解给多个子进程执行，执行完之后发给主进展；当项目部复杂时不必配置，因进程的分配和管理也需要时间
示例：
const HappyPack = require('happypack')
use: 'HappyPack/loader?id=js'
use: 'HappyPack/loader?id=css'
new HappyPack({
    id: 'js',
    use: ['babel-loader']
})
new HappyPack({
    id: 'css',
    use: ['style-loader', 'css-loader', 'postcss-loader']
})
若HappPack中配置postcss-loader, 必须配置postcss.config.js：
// postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}

4. thread-loader: 和happypack作用相同
示例：use: ['thread-loader', 'cache-loader', 'babel-loader']

5. 开启JS多进程压缩：webpack-parallel-uglify-plugin，或者uglifyjs-webpack-plugin(配置parallel)，二者其实都不能让构建提速；webpack默认使用TerserWebpackPlugin开启了多进程和缓存，默认存放目录node_modules/.cache/terser-webpack-plugin

6. HardSourceWebpackPlugin: 提供中间缓存，默认存放目录node_modules/.cache/hard-source-webpack-plugin, 测试发现可节约80%的打包时间
示例：new HardSourceWebpackPlugin()

7. noParse：用于配置不需要解析的第三方模块，如果第三方模块没有AMD/CommonJS规范版本，noPare可以跳过转化和解析, 属性值可以是正则表达式或者function
示例：
module: {
    noParse: /jquery|loadsh/ // 测试发现引用了这俩包，如果配置noParse能减少40%构建时间
}

8. resolve: 配置如何查找导入的模块所对应的文件， 配置extensions: ['.js', '.json'],频率高的后缀放前面，控制数组长度，减少尝试次数
示例：
resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
}

9. IgnorePlugin: webpack的内置插件，忽略第三方包的指定目录
示例： plugins: [
    // 忽略moment下的./locale目录, moment会将本地化功能和核心功能一起打包
    new webpack.IgnorePlugin(/\.\/locale$/, /moment$/)
]

单独引入：
import moment from 'moment'
import 'moment/locale/zh-cn'

10. externals: 可以减少webpack打包体积，index.html中引入cdn上的js文件，依然可以import方式引入
示例：externals: {
    'jquery': 'jQuery' // 通过script引入后, 会产生全局变量jQuery
}

11. DllPlugin: webpack的内置插件DllPlugin和DLLReferencePlugin可以拆分bundles，将变动少的库单独编译打包成动态链接库，能大大提高构建速度
示例：
```
// webpack.config.dll.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}

"scripts": {
    "build:dll": "webpack --config webpack.donfig.dll.js"
}
dist
└── dll
    ├── manifest.json // manifest.json 用于让 DLLReferencePlugin 映射到相关依赖上
    └── react.dll.9dcd9d.js
//webpack.config.js
const webpack = require('webpack');
const path = require('path');
module.exports = {
    //...
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json')
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
        }),
        //...
    ]
}
// public/index.html中引入
<script src="/dll/react.dll.9dcd9d.js"></script>
```

12. 抽离公共代码：可以分基础型的react等库、工具型的lodash、特定型的Echarts（首屏可能用不到）进行拆分
```
//webpack.config.js
// 可以查看各个包的大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/, // 打包第三方库
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                // 打包其余的公共代码
                common: { 
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 // 引入三次及以上的被打包
                },
                // 抽离出更多的小公共模块
                'lottie-web': {
                    name: "lottie-web", // 单独将 react-lottie 拆包
                    priority: 5, // 权重需大于`vendor`
                    test: /[\/]node_modules[\/]lottie-web[\/]/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1 //重复引入了几次
                },
            }
        }
        // runtimeChunk的作用是将包含chunk映射关系的列表从main.js中抽离出来叫manifest.js
        runtimeChunk: {
            name: 'manifest'
        }
    }
}
```
  output: {
    // chunkhash解决缓存命中，而文件有变动需要获取最新文件的问题
    // 不缓存index.html, 这样每次chunk变动，chunkhash改变，index.html也会请求新的文件
    filename: mode === 'production' ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: mode === 'production' ? '[id].[chunkhash:8].chunk.js' : '[id].js',
    path: getPath(config.outputPath)
  }

13. webpack自身优化
tree-shaking, ES6的import, 不会打包没有用到的模块
import {add, minus} from 'xx'
add(1, 2) // 那么就不会打包minus
scope hosting, 可以减少一些变量声明，生产环境默认开启，speed-measure-webpack-plugin 和 HotModuleReplacementPlugin同时使用会报错
babel优化
// .babelrc
{
    "presets": [],
    "plugins": [
        [
            "@babel/plugin-transform-runtime" // 避免将一些公共方法注入到每个文件
        ]
    ]
}


