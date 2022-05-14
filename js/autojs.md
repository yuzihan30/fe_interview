<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-14 13:43:17
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-14 14:28:47
 * @FilePath: /fe_interview/js/autojs.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
参考资源
https://hyb1996.github.io/AutoJs-Docs/#/
https://article.itxueyuan.com/AWnl88 
1. 短视频
console.log(device.width, device.height)
swipe(x1, y1, x2, y2, swipe_time)
swipe(540, 400, 540, 2000, 450)
通用化
x1 = device.width / 2
y1 = device.height / 6
x2 = device.width / 2
y2 = (device.height / 6) * 5
swipe_time = 450 // ms
屏幕竖向分6等份
swipe(x1, y1, x2, y2, swipe_time)
根据时间或者视频次数来做循环
for (let i = 0; i <= 10; i++ ) {
    swipe(x1, y1, x2, y2, swipe_time)
    sleep(2000) // 等待2s
}
停止脚本，按音量键的上键或者ctrl+shift+p
为了防止系统检测到我们在使用脚本，坐标不会去写死，random
x1 = device.width / 2 + random(0, 10) // random(0, 10)生成0-10之间的随机数
y1 = device.height / 6 + random(0, 50)
x2 = device.width / 2 + random(0, 10)
y2 = device.width / 2 + random(0, 10)
swipe_time = 450 + random(0, 30)
sleep_time = 2000 + random(1000, 5000)
for (let i = 0; i <= 10; i++ ) {
    swipe(x1, y1, x2, y2, swipe_time)
    sleep(sleep_time) 
}

