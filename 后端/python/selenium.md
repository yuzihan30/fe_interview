<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-13 22:17:26
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-21 10:36:02
 * @FilePath: /fe_interview/后端/python/selenium.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. selenium是一套web网站的程序自动化操作解决方案， 学习网站：https://www.byhy.net/
通过它我们可以写出自动化程序，像人一样在浏览器里操作web界面，比如点击界面按钮，在文本框中输入文字等操作。
而且还能从web界面中获取信息，比如获取火车、汽车票务信息，招聘网站职位信息，财经网站股票价格信息等等，然后用程序进行分析处理
selenium可以提高我们从网站上输入信息和获取信息的能力，可以用在爬取信息、自动化测试或者自己使用等各种领域
原理架构图分为三部分：自动化程序（含selenium客户端）、浏览器驱动（由浏览器厂商提供）、浏览器
自动化程序不能直接控制浏览器（可以比作两个说不同语言的人一样），必须通过浏览器驱动（像个翻译一样，居中转达）
打开网址、输入信息，程序都是通过一个消息（这个网络消息就是通过http协议格式的）发送给浏览器驱动，浏览器驱动做一系列转换（转成浏览器可以接收的格式）转发给浏览器，浏览器进行处理之后会把这些操作结果（比如打开网页打开成功了）返回给浏览器驱动，浏览器驱动再返回给自动化程序告诉它刚才你叫我做的那个操作我成功了
其他的比如说要从网页上获取一段文字信息，比如说一个方框，这个元素里所有内容给我拿回来，也是同样的发起请求给浏览器驱动，浏览器根据它的指示要找哪个方框里的文字信息，它再把这个信息获取到，在返回给浏览器驱动，再返回给我们的程序，我们的程序就获取到这些信息了
了解原理，出了问题知道怎样定位
selenium已经贴心的为我么你准备了一套selenium客户端的库，编码http消息发出去和接收http消息解码都已经做到这个库里了，selenium为各种主流变成语言都提供了这种python库, 根据自己的编程语言选用安装就可以了；selenium客户端和浏览器驱动之间可以通过客户端库来构建消息和解析消息；浏览器驱动和浏览器之间是厂商的私有协议，谷歌是通过dev tools协议（websocket）

2. 安装
安装客户端库
pip install selenium
pip install selenium -i https://pypi.douban.com/simple/
安装浏览器和驱动
下载和浏览器版本对应的驱动，大版本号一样就没问题， win64能兼容32位的

3. 示例：
从selenium中导入webdriver模块
from selenium import webdriver
通过webdriver所定义好的各种不同浏览器对应的类创建控制浏览器的对象
webdriver实例对象，类似于控制浏览器的遥控器对象，多次使用的对象就需要取个名字
控制浏览器必须要通过浏览器驱动，入参指定浏览器驱动的地址，3.xx版本直接可以r'd:\tools\chromedriver.exe'，
wd = webdriver.Chrome() // Chrome首字母大写创建一个实例对象
但4.xx版本需要
from selenium.webdriver.chrome.service import Service
wd = webdriver.Chrome(service=Service(r'd:\tools\chromedriver.exe'))
这行代码的意思找到驱动并打开谷歌浏览器，自动化程序、驱动、浏览器三个都运行起来了, 接下来就要做具体自动化测试的事情了
路径前r原因，因为window路径分割符正好是字符串中转义符，转义符和后面一个字符会构成转义结构对应一个字符了，r就表示不转义
后面还有种方式不需要指定地址，让selenium客户端自己去找到它，可以放到环境变量里，把d:\tools放到path里就可以省略入参路径了，设置环境变量对已启动的程序是不生效的，需要重新打开pacharm
input()可以避免运行完直接结束，当用户输入的时候才能继续后面的操作
wb.get("https://baidu.com")get打开一个网址, 底层原理就是构建了一个http请求，有时候会发现这个比较耗时，因为包含一路的转发请求返回
日志和弹出防病毒测试都可以参考网站学习
pass 辅助断点调试，可以停在这里

4. 选择元素
```
from selenium import webdriver
from selenium.webdriver.common.by import By // 版本4推荐写法

# 创建 WebDriver 对象
wd = webdriver.Chrome()
# 调用WebDriver 对象的get方法 可以让浏览器打开指定网址
wd.get('https://www.byhy.net/_files/stock1.html')
# 根据id选择元素，返回的就是该元素对应的WebElement对象
element = wd.find_element(By.ID, 'kw') // 版本4推荐写法
# 通过该 WebElement对象，就可以对页面元素进行操作了
# 比如输入字符串到 这个 输入框里
element.send_keys('通讯\n')
```
如果根据 传入的ID，找不到这样的元素，find_element 方法就会抛出 selenium.common.exceptions.NoSuchElementException 异常， 那就试试捕获
from selenium.common.exception import NoSuchElementException
try:
    element = wd.find_element(By.ID, 'kw') // 自动化最难的就是定位元素
exception NoSuchElementException:
    xxx
程序执行完了，发现没停，是因为驱动在运行，可以任务管理器里讲驱动退出
wd.quit() // 正常退出

## 5. 示例
```python
from selenium import webdriver

# 字符串前加'r'表示非转义的原始字符串，这里不加应该也行，主要针对反斜杠那种转义字符
# 执行这段代码会启动浏览器驱动及浏览器，用wd来操控浏览器，通常第一步就是打开网址
wd = webdriver.Chrome(r'/Users/yuzihan/Downloads/chromedriver')

# 设置隐藏等待时间, 每隔固定半秒间隔去找某个元素一次。超过10s找不到就抛异常
wd.implicitly_wait(10)

# 打开命令会发给浏览器驱动
# wd.get('http://python3.vip')
wd.get('http://www.baidu.com')

element = wd.find_element_by_id('kw')

# \n相当于敲回车键
# element.send_keys('NFT\n')
# element.send_keys('NFT')
element.send_keys('python\n')

# 找到元素，操作元素
# search_btn = wd.find_element_by_id('su')
# search_btn.click()

# import time
#
# time.sleep(1)

element = wd.find_element_by_id('1')
# find_elements,找不到不会抛异常，而是返回空列表
# element = wd.find_elements_by_id('1')
# print(element.text)
# print(element.get_attribute('srcid'))
print(element.get_attribute('outerHTML'))

# 对于输入框不能用.text获取内容，需要用get_attribute('value')
# 获取元素文本内容，有时内容没有或者没有完全展示界面上，这个.text可能不行，
# 就需要get_attribute('innerText'), get_attribute('textContent')
# 获取整个元素对应的html, 'outerHTML'
# 关闭本次打开的浏览器窗口和驱动
wd.quit()

# pass主要作用就是占位，让代码整体完整
pass
```
## 等待元素出现
```python
from selenium import webdriver
from selenium.webdriver.common.by import By

# 创建 WebDriver 对象
wd = webdriver.Chrome()

# 调用WebDriver 对象的get方法 可以让浏览器打开指定网址
wd.get('https://www.byhy.net/_files/stock1.html')

# 根据id选择元素，返回的就是该元素对应的WebElement对象
element = wd.find_element(By.ID, 'kw')

# 通过该 WebElement对象，就可以对页面元素进行操作了
# 比如输入字符串到 这个 输入框里
element.send_keys('通讯\n')

element = wb.find_element(By.ID, 'go')
element.click()

// 查询返回结果需要时间，如果结果还没返回就执行查询操作就会报错, 解决方案可以让后面操作先等一等
import time
time.sleep(1)
// 上面方案的缺点就是万一等的时间不够呢，另一种方案就是循环
// element = wb.find_element(By.ID, '1')
// print(element.text)
while True:
    try:
        element = wb.find_element(By.ID, '1')
        print(element.text)
        break
    except:
        // 这里也不能太快，不然也很耗CPU
        time.sleep(1)
// 第二种方案繁琐了，selenium内置了一种方法叫隐式等待
// 就是刚创建好浏览器对象的时候加上
// wb = webdriver.Chrome()
// wb.implicitly_wait(10)
//那么后续所有的 find_element 或者 find_elements 之类的方法调用 都会采用上面的策略：
//如果找不到元素， 每隔 半秒钟 再去界面上查看一次， 直到找到该元素， 或者 过了10秒 最大时长。

wb.quit()

```
## 操控元素




