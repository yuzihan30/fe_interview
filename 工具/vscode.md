<!--
 * @Author: your name
 * @Date: 2022-05-03 08:50:29
 * @LastEditTime: 2022-05-03 08:55:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/工具/vscode.md
-->

1. 竖线设置：设置->首选项->搜索 ruler->在 setting.json 中编辑->设置"editor.rulers": [120]
2. 列选择快捷键，alt+shift+鼠标左键拖动，shift+option+鼠标左键拖动(Mac)
3. clear 控制台清屏
4. 插件安装
   插件安装参考：https://www.jianshu.com/p/fd945e8e099d
   https://juejin.cn/post/6882292770606678029
   Settings Sync VSCode 设置同步到 Gist: command + shift + p
   macOS: Shift + Option + U¨
   针对 react 项目的插件：参考资料 https://xie.infoq.cn/article/fdfe14852fb523ad16c5334ec
5. 行字符数限制
   一般规定一行代码不超过 80 或者 120 个字符。
   取决于团队的编码规范。
   不同公司不同团队有不同的规定。
   当单行代码过长。产生横向滚动条。使得代码难以阅读。
   在设置中搜索 editor.rulers -> "editor.rulers": [120]

## 格式化

vscode+prettier 配置保存自动格式化
第一步，先打开 vscode 软件，左下角点击设置 》打开设置》唤出快速搜索条界面。
第二步，设定编辑器默认代码格式化（美化）的插件为 Prettier，同理在搜索设置框贴入 editor.defaultFormatter，将配置项选择为 Prettier。
第三步，设定 Prettier 插件保存时自动格式化代码，搜索设置项贴入 editor.formatOnSave，将搜索到的项目打钩即可

"files.autoSave": "onFocusChange",
"editor.formatOnSave": true,
"editor.formatOnType": true,
"eslint.autoFixOnSave": true,
"eslint.enable": true,
这样当我们在保存文件的时候，就会自动优化文件格式了。

## Mac 更新 VSCode 写权限被拒绝 Cannot update while running on a read-only volume

执行以下命令并重启 vscode, 其实执行第一条命令就行了，有时新插件老版本不支持，比如 volar

sudo chown -R \$USER ~/Library/Caches/com.microsoft.VSCode.ShipIt
xattr -dr com.apple.quarantine ~/Downloads/Visual\ Studio\ Code.app
~/Downloads/Visual/换成自己电脑的 vscode 安装的路径，其他地方不需要修改
