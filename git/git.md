<!--
 * @Author: your name
 * @Date: 2022-03-20 11:55:43
 * @LastEditTime: 2022-03-30 19:36:14
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
