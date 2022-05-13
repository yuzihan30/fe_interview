<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-13 21:23:02
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-13 22:03:42
 * @FilePath: /fe_interview/后端/python/fastAPI.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. fastAPI主要特点
高性能，python3.6版本开始对异步性能有较好的支持，其他两个框架同步
开发效率高200%-300%
减少约40%人为BUG 错过提示友好
直观、易学易用
精简编码 代码重复率低
自带API交互文档 开发成果随时交付
API开发标准化

2. Starlette, Pydantic与FastAPI的关系
Python的类型提示 type hints 3.6或者3.7以后的版本有类型提示, 充分使用的话会让代码写的非常规范和严谨
class Name:
    pass
def get_name_with_age(name:str, age: int): // 类型也可以是自定义的类型，比如name: Name
    print(name, age)
get_name_with_age(name=[], age=1) // 错
定义了参数类型，在调用的时候就需要传递正确的类型
类型可以嵌套, 下面使用python的类型提示实现嵌套效果
from typing import List, Set, Tuple, Dict // 导入列表类型
def process_time(items: List[str]): //列表里元素是字符串类型, 还可以items: Dict[str, float]
    for item in items:
        print(item)
Pydantic是一个基于Python类型提示来定义数据验证、序列化和文档（使用JSON模式）库
Starlette(小星星)是一种轻量级的ASGI框架/工具包，是构建高性能Asyncio服务的理想选择（支持websocket, GraphQL,后台任务,启动关闭事件,session,cookie,测试覆盖率），其实就是基于python3.6版本的异步web框架
faskAPI就是基于Starlette，并充分利用Pydantic（基于python语言的type hint）, 再引入一些新的内容