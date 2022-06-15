<!--
 * @Author: your name
 * @Date: 2022-03-20 11:55:43
 * @LastEditTime: 2022-05-19 09:30:54
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/git/git.md
-->
1. push报错fetal: Could not read from remote repository
原因：远程仓库没有本地仓库的公钥无法认证
解决方法：本地生成SSH公钥配置到远程仓库的公钥管理中
ssh-keygen -t rsa -C "xx@yy.com" (mac中测试这一步就能生成公钥)
ssh-agent -s
将id_rsa.pub中的公钥复制到远程仓库的个人设置-安全设置-SSH公钥

test git 
test git without vpn
经验证测试，切换IP会导致SSH公钥失效

隔天未切IP测试SSH是否失效

2. revert是用一次新的提交回滚之前的提交，reset是直接删除之前的提交

3. git merge 和git rebase的关系
git merge B 和git rebase B都是将B分支合并到当前分支
不要在公共分支使用rebase，rebase会改变提交的基点，会给团队成员带来混乱
将公共分支合并到个人分支可以多用git rebase， 个人分支git pull --rebase公共分支，解决完冲突后，再merge 到主分支


4. git使用练习的站点：https://learngitbranching.js.org/?locale=zh_CN

5. git commit -a 针对修改和删除文件，可以省略git add，但新文件还是需要git add, 不然就是untracked状态

6. 我刚才提交了什么，git show/git log -n1 -p, -p显示更新之间的差异，-n显示最近第几条提交, git show默认显示Head的提交信息，加上hash具体显示某条提交的提交信息

7. git commit -a -m 这个-a就是git add 的作用

8. 提交信息写错了，没push前，git commit --amend会打开vim编辑提交信息，或者git commit --amend -m; push之后的话，需要force push，但不推荐这样做

9. 从提交里移出一个文件：git checkout HEAD^ myfile, git add -A, git commit --amend

10. 删除最后一次提交：
需要删除已push的提交（适用于个人开发分支，不适合公共开发分支）：git reset HEAD^ --hard, git push -f [remote][branch]; 对于公共分支，为了避免影响他人，使用git revert ID
未push: git reset --soft HEAD@{1}
########## 合并分支 ########
1. git rebase
feature1: git rebase master 拉最新的main分支代码和并到开发分支feature1，之后feature1测试完毕后，更新到main，也需要在main分支执行：git rebase feature1

git rebase --abort把最近的一次rebase撤销

## git分支命名规范
分支命名规则一般为：f0122-xxxxx
f：代表feature
0122：预计完成时间
xxxxx：简单feature描述；
主分支		master		主分支，所有提供给用户使用的正式版本，都在这个主分支上发布
开发分支		dev 		开发分支，永远是功能最新最全的分支
功能分支		feature-*	新功能分支，某个功能点正在开发阶段
发布版本		release-*	发布定期要上线的功能
修复分支		bug-*		修复线上代码的 bug
## git撤销某个文件的修改，分为两种情况：
1.在工作区修改，但并未提交到暂存区（即并没有add）。
对于单个文件的撤销修改而言，使用下面方法。
$ git checkout -- 文件名
若想撤销工作区中所有文件的修改，则
$ git checkout .
注意：git chekcout 是让文件回到最近一次该文件git commit或git add时的状态。
2.工作区修改了之后，提交到了暂存区（即add），如何撤销修改？这里分为两种情况来说吧。
（1）对于该文件来说，在当前分支上，你还没有commit过一次。这时候，git status后git给出提示：
是的，使用git rm --cached 文件名命令来放弃该文件的暂存，这时，你用git status命令：
表明：test1文件不被git追踪，并且它是修改的状态，没有提交到暂存区。此时，你用git checkout -- file是没有用的。因为，前面提到过，git checkout -- file是回到最近的一次commit或者add。但是，当前你还没有一次commit过，并且，add也已经撤销了，所以Git找不到该文件在以往记录中的存在。自然没法用git checkout -- file。
git提示你：该文件在Git目前所知的文件中找不到。
此时，你可以任意的对此文件进行修改了，想好了之后，再提交到暂存区。
（2）如果你已经有了commit的记录，撤销文件。
则先：git reset HEAD file让该文件回到工作区的状态。
然后：git chekcout -- file即可
## GIT缓存本地不想提交的代码
开发的过程中，有时之前开发的功能出现了BUG，但是本地又在相同的文件中开发了新的需求时，需要将代码还原再修复BUG。可是代码还原的话大大提高了二次开发的成本。 通过git stash这个命令可以轻松实现。
git stash用法
git stash是将本地当前未提交的内容暂存起来并且将修改的文件还原到修改之前的状态，用于后续恢复当前的工作，不会被git push到远程分支。
$ git status
On branch branch
Your branch is up to date with 'origin/branch'.
Changes not staged for commit:
  (use "git add ..." to update what will be committed)
  (use "git checkout -- ..." to discard changes in working directory)
        modified:   path/filename
$ git stash
Saved working directory and index state WIP on branch: commitId commitMessage
$ git status
On branch branch
Your branch is up to date with 'origin/branch'.
nothing to commit, working tree clean
这样我们就可以在不还原新的开发的情况下去处理已知的BUG了。
git stash pop删除暂存并恢复暂存的内容
使用git stash pop来恢复之前暂存的内容。


########## Monorepos ########
Monorepo是指将所有代码放到一个代码仓库中的项目管理策略
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
