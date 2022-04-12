<!--
 * @Author: your name
 * @Date: 2022-03-20 11:55:43
 * @LastEditTime: 2022-04-09 11:39:31
 * @LastEditors: Please set LastEditors
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

