
1. push 报错 fetal: Could not read from remote repository
   原因：远程仓库没有本地仓库的公钥无法认证
   解决方法：本地生成 SSH 公钥配置到远程仓库的公钥管理中
   ssh-keygen -t rsa -C "xx@yy.com" (mac 中测试这一步就能生成公钥)
   ssh-agent -s
   将 id_rsa.pub 中的公钥复制到远程仓库的个人设置-安全设置-SSH 公钥

test git
test git without vpn
经验证测试，切换 IP 会导致 SSH 公钥失效

隔天未切 IP 测试 SSH 是否失效

2. revert 是用一次新的提交回滚之前的提交，reset 是直接删除之前的提交

3. git merge 和 git rebase 的关系
   git merge B 和 git rebase B 都是将 B 分支合并到当前分支
   不要在公共分支使用 rebase，rebase 会改变提交的基点，会给团队成员带来混乱
   将公共分支合并到个人分支可以多用 git rebase， 个人分支 git pull --rebase 公共分支，解决完冲突后，再 merge 到主分支

4. git 使用练习的站点：https://learngitbranching.js.org/?locale=zh_CN

5. git commit -a 针对修改和删除文件，可以省略 git add，但新文件还是需要 git add, 不然就是 untracked 状态

6. 我刚才提交了什么，git show/git log -n1 -p, -p 显示更新之间的差异，-n 显示最近第几条提交, git show 默认显示 Head 的提交信息，加上 hash 具体显示某条提交的提交信息

7. git commit -a -m 这个-a 就是 git add 的作用

8. 提交信息写错了，没 push 前，git commit --amend 会打开 vim 编辑提交信息，或者 git commit --amend -m; push 之后的话，需要 force push，但不推荐这样做

9. 从提交里移出一个文件：git checkout HEAD^ myfile, git add -A, git commit --amend

10. 删除最后一次提交：
    需要删除已 push 的提交（适用于个人开发分支，不适合公共开发分支）：git reset HEAD^ --hard, git push -f [remote][branch]; 对于公共分支，为了避免影响他人，使用 git revert ID
    未 push: git reset --soft HEAD@{1}
    ########## 合并分支 ########
11. git rebase
    feature1: git rebase master 拉最新的 main 分支代码合并到开发分支 feature1，之后 feature1 测试完毕后，更新到 main，也需要在 main 分支执行：git rebase feature1

git rebase --abort 把最近的一次 rebase 撤销

## 修改 commit 信息

未 push, git commit --amend

## git 分支命名规范

分支命名规则一般为：f0122-xxxxx
f：代表 feature
0122：预计完成时间
xxxxx：简单 feature 描述；
主分支 master 主分支，所有提供给用户使用的正式版本，都在这个主分支上发布
开发分支 dev 开发分支，永远是功能最新最全的分支
功能分支 feature-_ 新功能分支，某个功能点正在开发阶段
发布版本 release-_ 发布定期要上线的功能
修复分支 bug-\* 修复线上代码的 bug

## git 撤销某个文件的修改，分为两种情况：

1.在工作区修改，但并未提交到暂存区（即并没有 add）。
对于单个文件的撤销修改而言，使用下面方法。
$ git checkout -- 文件名
若想撤销工作区中所有文件的修改，则
$ git checkout .
注意：git chekcout 是让文件回到最近一次该文件 git commit 或 git add 时的状态。 2.工作区修改了之后，提交到了暂存区（即 add），如何撤销修改？这里分为两种情况来说吧。
（1）对于该文件来说，在当前分支上，你还没有 commit 过一次。这时候，git status 后 git 给出提示：
是的，使用 git rm --cached 文件名命令来放弃该文件的暂存，这时，你用 git status 命令：
表明：test1 文件不被 git 追踪，并且它是修改的状态，没有提交到暂存区。此时，你用 git checkout -- file 是没有用的。因为，前面提到过，git checkout -- file 是回到最近的一次 commit 或者 add。但是，当前你还没有一次 commit 过，并且，add 也已经撤销了，所以 Git 找不到该文件在以往记录中的存在。自然没法用 git checkout -- file。
git 提示你：该文件在 Git 目前所知的文件中找不到。
此时，你可以任意的对此文件进行修改了，想好了之后，再提交到暂存区。
（2）如果你已经有了 commit 的记录，撤销文件。
则先：git reset HEAD file 让该文件回到工作区的状态。
然后：git chekcout -- file 即可

## git 撤销 commit

有时我们提交了错误的代码，需要撤销某次的 commit 记录，下面介绍几种方法：
一、删除文件
如果需要删除的 commit 是一个或多个文件，可以进行以下操作。
1、被提交到仓库的某个文件需要删除，可以使用 git rm 命令：
git rm <file> // 从工作区和暂存区删除某个文件
git commit -m "" // 再次提交到仓库
2、如果只想从暂存区删除文件，本地工作区不做出改变，可以：
git rm --cached <file>
3、如果在工作区不小心删错了某个文件，可以用 git checkout 将暂存区的文件覆盖工作区的文件，从而把误删的文件恢复：
git checkout -- <file>
4、用 git rm 删除文件，同时还会将这个删除操作记录下来；
用 rm 删除文件，删除的仅仅是本地物理文件，没有将其从 git 的记录中剔除。
5、git add 和 git rm 有相似的功能，
但 git add 仅能记录添加、改动的动作，删除的动作需靠 git rm 来完成。
二、GitHub 撤销某次 commit
如果需要删除的不只是某个文件，而是交错的代码，那么有以下三种方法可以删除 commit 。
1、git reset
git reset ：回滚到某次提交。
git reset --soft：此次提交之后的修改会被退回到暂存区。
git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的。
1）回滚代码
如果需要删除的 commit 是最新的，那么可以通过 git reset 命令将代码回滚到之前某次提交的状态，但一定要将现有的代码做好备份，否则回滚之后这些变动都会消失。具体操作如下：
git log // 查询要回滚的 commit_id
git reset --hard commit_id // HEAD 就会指向此次的提交记录
git push origin HEAD --force // 强制推送到远端
2）误删恢复
如果回滚代码之后发现复制错了 commit_id，或者误删了某次 commit 记录，也可以通过下方代码恢复：
git relog // 复制要恢复操作的前面的 hash 值
git reset --hard hash // 将 hash 换成要恢复的历史记录的 hash 值
注意：删除中间某次提交时最好不要用 git reset 回退远程库，因为之后其他人提交代码时用 git pull 也会把自己的本地仓库回退到之前的版本，容易出现差错进而增加不必要的工作量。
2、git rebase
git rebase：当两个分支不在一条线上，需要执行 merge 操作时使用该命令。
1）撤销提交
如果中间的某次 commit 需要删除，可以通过 git rebase 命令实现，方法如下：
git log // 查找要删除的前一次提交的 commit_id
git rebase -i commit_id // 将 commit_id 替换成复制的值

进入 Vim 编辑模式，将要删除的 commit 前面的 `pick` 改成 `drop`

保存并退出 Vim

这样就完成了。

2）解决冲突

该命令执行时极有可能出现 reabase 冲突，可以通过以下方法解决：

git diff // 查看冲突内容

// 手动解决冲突（冲突位置已在文件中标明）

git add <file> 或 git add -A // 添加

git rebase --continue // 继续 rebase

// 若还在 rebase 状态，则重复 2、3、4，直至 rebase 完成出现 applying 字样

git push

3、git revert

git revert：放弃某次提交。
git revert 之前的提交仍会保留在 git log 中，而此次撤销会做为一次新的提交。
git revert -m：用于对 merge 节点的操作，-m 指定具体某个提交点。
1）撤销提交

要撤销中间某次提交时，使用 git revert 也是一个很好的选择：

git log // 查找需要撤销的 commit_id

git revert commit_id // 撤销这次提交

2）撤销 merge 节点提交

如果这次提交是 merge 节点的话，则需要加上 -m 指令：

git revert commit_id -m 1 // 第一个提交点

// 手动解决冲突

git add -A

git commit -m ""

git revert commit_id -m 2 // 第二个提交点

// 重复 2，3，4

git push

## Git fetch和pull区别
git fetch是将代码拉下来了，但并未合并，所以看不到最新的代码，也看不到最新的git log
二、拉取不同

1、Git fetch：Git fetch会将数据拉取到本地仓库 - 它并不会自动合并或修改当前的工作。

2、git pull：git pull是从远程获取最新版本并merge到本地，会自动合并或修改当前的工作。

三、commitID不同

1、Git fetch：使用Git fetch更新代码，本地的库中master的commitID不变，还是等于1。

2、git pull：使用git pull更新代码，本地的库中master的commitID发生改变，变成了2。

## git删除远程分支
git删除远程分支 git push origin --delete [branch_name]

## git分支改名
1、修改本地分支名称
git branch -m oldBranchName newBranchName

2、将本地分支的远程分支删除
git push origin :oldBranchName

3、将改名后的本地分支推送到远程，并将本地分支与之关联
git push --set-upstream origin newBranchName

## git merge --no-ff
把dev分支使用普通默认merge的方式到master中后，提交历史信息合并到一起，导致回退时，可能回退到的不是自己想要的那个版本（回退到了分支中的某个版本）；
加上--no-ff则不会，各个分支的提交历史信息不会合并到一起（会回退到master的上个版本）。
https://blog.csdn.net/weixin_43239880/article/details/124591165
https://blog.csdn.net/HD243608836/article/details/117567871?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-117567871-blog-124410028.pc_relevant_multi_platform_whitelistv5&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-117567871-blog-124410028.pc_relevant_multi_platform_whitelistv5&utm_relevant_index=2
## GIT 缓存本地不想提交的代码

开发的过程中，有时之前开发的功能出现了 BUG，但是本地又在相同的文件中开发了新的需求时，需要将代码还原再修复 BUG。可是代码还原的话大大提高了二次开发的成本。 通过 git stash 这个命令可以轻松实现。
git stash 用法
git stash 是将本地当前未提交的内容暂存起来并且将修改的文件还原到修改之前的状态，用于后续恢复当前的工作，不会被 git push 到远程分支。
$ git status
On branch branch
Your branch is up to date with 'origin/branch'.
Changes not staged for commit:
(use "git add ..." to update what will be committed)
(use "git checkout -- ..." to discard changes in working directory)
modified: path/filename
$ git stash
Saved working directory and index state WIP on branch: commitId commitMessage
$ git status
On branch branch
Your branch is up to date with 'origin/branch'.
nothing to commit, working tree clean
这样我们就可以在不还原新的开发的情况下去处理已知的 BUG 了。
git stash pop 删除暂存并恢复暂存的内容
使用 git stash pop 来恢复之前暂存的内容。

## 本地项目上传到 GitHub

https://blog.csdn.net/tyh_keephunger/article/details/115697379
github 上建项目->git remote add origin git@github.com:yuzihan30/vue3-init.git->git push origin master/main

“在 git 中,可以利用 branch 命令查询远程分支,该命令用于列出分支,当参数设置为“-r”时,就会列出所有的远程分支,语法为“git branch -r”

########## Monorepos ########
Monorepo 是指将所有代码放到一个代码仓库中的项目管理策略
Monorepos 的优点
依赖管理：共享依赖，所有的代码都在一个仓库。版本管理非常方便。
代码复用：所有的代码都在一个仓库，很容易抽离出各个项目共用的业务组件或工具，并通过 TypeScript 在代码内引用。
一致性：所有代码在一个仓库，代码质量标准和统一风格会更容易。
透明度：所有人都能看到全部代码，跨团队协作和贡献更容易。
Monorepos 的缺点
性能：代码越来越多，Git、IDE 之类的工具会越来越卡。
权限：管理文件权限会更具挑战，Git 目录并没有内置的权限管理系统，整个项目是没办法区分某些部门开放哪个项目，某些部门关闭的。
学习成本：对新人来说，项目变大了，学习成本自然会更高。
Monorepo 绝对不是银弹，Monorepo 策略也不完美，但某些方面来说确实解决了一些项目的维护和开发体验。


## 
##

revision	英[rɪˈvɪʒn]
美[rɪˈvɪʒn]
n.	修订; 复习; (一项、一轮等)修改; 温习;
[例句]The catalogue is under revision.
目录册正在修订之中。
[其他]	复数：revisions

chore	英[tʃɔː(r)]
美[tʃɔːr]
n.	家务活; 日常事务; 例行工作; 令人厌烦的任务; 乏味无聊的工作;
[例句]Fortunately, the chore of leaf sweeping is well worth the effort.
幸运的是，干清扫落叶这个活儿是值得的。
Working In Progress，ERP中指在制品或流水线，又称车间生产管理。WIP（work in progress）


