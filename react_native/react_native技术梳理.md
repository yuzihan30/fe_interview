<!--
 * @Author: your name
 * @Date: 2022-03-15 17:19:12
 * @LastEditTime: 2022-03-15 17:21:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/react_native/react_native技术梳理.md
-->
const [isHungry, setIsHungry] = useState(true)
为什么这里的常量可以修改？ 因为state每次变动都要重新执行一遍，相当于重新定义一个常量