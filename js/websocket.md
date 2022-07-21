# 探究 websocket

> 学习材料： https://juejin.cn/post/6844903544978407431
> @[TOC](目录)

## 概述

1. websocket 使浏览器具备了双向通信能力
   基于 TCP 传输协议，并复用 HTTP 的握手通道
2. 建立连接、交互数据和数据帧的格式，好的数据格式能让协议更高效、扩展性更好
3. 针对 websocket 的攻击，协议如何抵御
4. 如何维持连接
5. 优点：支持双向通信，实时性强；更好的二进制支持；开销小，服务端到客户端 2-10 字节包头，客户端到服务端另外加 4 字节掩码（而 HTTP 协议每次需要携带完整头部）；支持扩展

## 使用示例

服务端用了 ws 这个库。相比大家熟悉的 socket.io，ws 实现更轻量，更适合学习的目的。

1. 服务端
   代码如下，监听 8080 端口。当有新的连接请求到达时，打印日志，同时向客户端发送消息。当收到到来自客户端的消息时，同样打印日志。

```javascript
var app = require("express")();
var server = require("http").Server(app);
var WebSocket = require("ws");

var wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("server: receive connection.");

  ws.on("message", function incoming(message) {
    console.log("server: received: %s", message);
  });

  ws.send("world");
});

app.get("/", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});
app.listen(3000);
```

2. 客户端
代码如下，向 8080 端口发起 WebSocket 连接。连接建立后，打印日志，同时向服务端发送消息。接收到来自服务端的消息后，同样打印日志。
<script>
  var ws = new WebSocket('ws://localhost:8080');
  ws.onopen = function () {
    console.log('ws onopen');
    ws.send('from client: hello');
  };
  ws.onmessage = function (e) {
    console.log('ws onmessage');
    console.log('from server: ' + e.data);
  };
</script>

## 建立连接

客户端通过 HTTP 请求与 WebSocket 服务端协商升级协议。协议升级完成后，后续的数据交换则遵照 WebSocket 的协议。

1. 客户端：申请协议升级
   首先，客户端发起协议升级请求。可以看到，采用的是标准的 HTTP 报文格式，且只支持 GET 方法。
   GET / HTTP/1.1
   Host: localhost:8080
   Origin: http://127.0.0.1:3000
   Connection: Upgrade
   Upgrade: websocket
   Sec-WebSocket-Version: 13
   Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
   重点请求首部意义如下：

Connection: Upgrade：表示要升级协议
Upgrade: websocket：表示要升级到 websocket 协议。
Sec-WebSocket-Version: 13：表示 websocket 的版本。如果服务端不支持该版本，需要返回一个 Sec-WebSocket-Version header，里面包含服务端支持的版本号。
Sec-WebSocket-Key：与后面服务端响应首部的 Sec-WebSocket-Accept 是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。

注意，上面请求省略了部分非重点请求首部。由于是标准的 HTTP 请求，类似 Host、Origin、Cookie 等请求首部会照常发送。在握手阶段，可以通过相关请求首部进行 安全限制、权限校验等。 2. 服务端：响应协议升级
服务端返回内容如下，状态代码 101 表示协议切换。到此完成协议升级，后续的数据交互都按照新的协议来。
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
备注：每个 header 都以\r\n 结尾，并且最后一行加上一个额外的空行\r\n。此外，服务端回应的 HTTP 状态码只能在握手阶段使用。过了握手阶段后，就只能采用特定的错误码。

3. Sec-WebSocket-Accept 的计算
   Sec-WebSocket-Accept 根据客户端请求首部的 Sec-WebSocket-Key 计算出来。
   计算公式为：
   将 Sec-WebSocket-Key 跟 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 拼接。
   通过 SHA1 计算出摘要，并转成 base64 字符串。
   伪代码如下：
   > toBase64( sha1( Sec-WebSocket-Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 ) )
   > 验证下前面的返回结果：
   > const crypto = require('crypto');
   > const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
   > const secWebSocketKey = 'w4v7O6xFTi36lq3RNcgctw==';

let secWebSocketAccept = crypto.createHash('sha1')
.update(secWebSocketKey + magic)
.digest('base64');

console.log(secWebSocketAccept);
// Oy4NRAQ13jhfONC7bP8dTKb4PTU=

## 数据帧格式

WebSocket 客户端、服务端通信的最小单位是帧（frame），由 1 个或多个帧组成一条完整的消息（message）。
发送端：将消息切割成多个帧，并发送给服务端；
接收端：接收消息帧，并将关联的帧重新组装成完整的消息；

### 数据帧格式详解

针对前面的格式概览图，这里逐个字段进行讲解，如有不清楚之处，可参考协议规范，或留言交流。
FIN：1 个比特。
如果是 1，表示这是消息（message）的最后一个分片（fragment），如果是 0，表示不是是消息（message）的最后一个分片（fragment）。
RSV1, RSV2, RSV3：各占 1 个比特。
一般情况下全为 0。当客户端、服务端协商采用 WebSocket 扩展时，这三个标志位可以非 0，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用 WebSocket 扩展，连接出错。
Opcode: 4 个比特。
操作代码，Opcode 的值决定了应该如何解析后续的数据载荷（data payload）。如果操作代码是不认识的，那么接收端应该断开连接（fail the connection）。可选的操作代码如下：

%x0：表示一个延续帧。当 Opcode 为 0 时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。
%x1：表示这是一个文本帧（frame）
%x2：表示这是一个二进制帧（frame）
%x3-7：保留的操作代码，用于后续定义的非控制帧。
%x8：表示连接断开。
%x9：表示这是一个 ping 操作。
%xA：表示这是一个 pong 操作。
%xB-F：保留的操作代码，用于后续定义的控制帧。

Mask: 1 个比特。
表示是否要对数据载荷进行掩码操作。从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作。
如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。
如果 Mask 是 1，那么在 Masking-key 中会定义一个掩码键（masking key），并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask 都是 1。
掩码的算法、用途在下一小节讲解。
Payload length：数据载荷的长度，单位是字节。为 7 位，或 7+16 位，或 1+64 位。
假设数 Payload length === x，如果

x 为 0~126：数据的长度为 x 字节。
x 为 126：后续 2 个字节代表一个 16 位的无符号整数，该无符号整数的值为数据的长度。
x 为 127：后续 8 个字节代表一个 64 位的无符号整数（最高位为 0），该无符号整数的值为数据的长度。

此外，如果 payload length 占用了多个字节的话，payload length 的二进制表达采用网络序（big endian，重要的位在前）。
Masking-key：0 或 4 字节（32 位）
所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask 为 1，且携带了 4 字节的 Masking-key。如果 Mask 为 0，则没有 Masking-key。
备注：载荷数据的长度，不包括 mask key 的长度。
Payload data：(x+y) 字节
载荷数据：包括了扩展数据、应用数据。其中，扩展数据 x 字节，应用数据 y 字节。
扩展数据：如果没有协商使用扩展的话，扩展数据数据为 0 字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。
应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度。

### 掩码算法

掩码键（Masking-key）是由客户端挑选出来的 32 位的随机数。掩码操作不会影响数据载荷的长度。掩码、反掩码操作都采用如下算法：
首先，假设：

original-octet-i：为原始数据的第 i 字节。
transformed-octet-i：为转换后的数据的第 i 字节。
j：为 i mod 4 的结果。
masking-key-octet-j：为 mask key 第 j 字节。

算法描述为： original-octet-i 与 masking-key-octet-j 异或后，得到 transformed-octet-i。

j = i MOD 4
transformed-octet-i = original-octet-i XOR masking-key-octet-j

## 交互数据

一旦 WebSocket 客户端、服务端建立连接后，后续的操作都是基于数据帧的传递。
WebSocket 根据 opcode 来区分操作的类型。比如 0x8 表示断开连接，0x0-0x2 表示数据交互。

### 数据分片

WebSocket 的每条消息可能被切分成多个数据帧。当 WebSocket 的接收方收到一个数据帧时，会根据 FIN 的值来判断，是否已经收到消息的最后一个数据帧。
FIN=1 表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。FIN=0，则接收方还需要继续监听接收其余的数据帧。
此外，opcode 在数据交换的场景下，表示的是数据的类型。0x01 表示文本，0x02 表示二进制。而 0x00 比较特殊，表示延续帧（continuation frame），顾名思义，就是完整消息对应的数据帧还没接收完。

### 数据分片例子

直接看例子更形象些。下面例子来自 MDN，可以很好地演示数据的分片。客户端向服务端两次发送消息，服务端收到消息后回应客户端，这里主要看客户端往服务端发送的消息。
第一条消息
FIN=1, 表示是当前消息的最后一个数据帧。服务端收到当前数据帧后，可以处理消息。opcode=0x1，表示客户端发送的是文本类型。
第二条消息

FIN=0，opcode=0x1，表示发送的是文本类型，且消息还没发送完成，还有后续的数据帧。
FIN=0，opcode=0x0，表示消息还没发送完成，还有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。
FIN=1，opcode=0x0，表示消息已经发送完成，没有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。服务端可以将关联的数据帧组装成完整的消息。

Client: FIN=1, opcode=0x1, msg="hello"
Server: (process complete message immediately) Hi.
Client: FIN=0, opcode=0x1, msg="and a"
Server: (listening, new message containing text started)
Client: FIN=0, opcode=0x0, msg="happy new"
Server: (listening, payload concatenated to previous message)
Client: FIN=1, opcode=0x0, msg="year!"
Server: (process complete message) Happy new year to you too!

## 连接保持+心跳

WebSocket 为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的 TCP 通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。
但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

发送方->接收方：ping
接收方->发送方：pong

ping、pong 的操作，对应的是 WebSocket 的两个控制帧，opcode 分别是 0x9、0xA。
举例，WebSocket 服务端向客户端发送 ping，只需要如下代码（采用 ws 模块）
ws.ping('', false, true);

## Sec-WebSocket-Key/Accept 的作用

前面提到了，Sec-WebSocket-Key/Sec-WebSocket-Accept 在主要作用在于提供基础的防护，减少恶意连接、意外连接。
作用大致归纳如下：

避免服务端收到非法的 websocket 连接（比如 http 客户端不小心请求连接 websocket 服务，此时服务端可以直接拒绝连接）
确保服务端理解 websocket 连接。因为 ws 握手阶段采用的是 http 协议，因此可能 ws 连接是被一个 http 服务器处理并返回的，此时客户端可以通过 Sec-WebSocket-Key 来确保服务端认识 ws 协议。（并非百分百保险，比如总是存在那么些无聊的 http 服务器，光处理 Sec-WebSocket-Key，但并没有实现 ws 协议。。。）
用浏览器里发起 ajax 请求，设置 header 时，Sec-WebSocket-Key 以及其他相关的 header 是被禁止的。这样可以避免客户端发送 ajax 请求时，意外请求协议升级（websocket upgrade）
可以防止反向代理（不理解 ws 协议）返回错误的数据。比如反向代理前后收到两次 ws 连接的升级请求，反向代理把第一次请求的返回给 cache 住，然后第二次请求到来时直接把 cache 住的请求给返回（无意义的返回）。
Sec-WebSocket-Key 主要目的并不是确保数据的安全性，因为 Sec-WebSocket-Key、Sec-WebSocket-Accept 的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）。

强调：Sec-WebSocket-Key/Sec-WebSocket-Accept 的换算，只能带来基本的保障，但连接是否安全、数据是否安全、客户端/服务端是否合法的 ws 客户端、ws 服务端，其实并没有实际性的保证。

## 数据掩码的作用

WebSocket 协议中，数据掩码的作用是增强协议的安全性。但数据掩码并不是为了保护数据本身，因为算法本身是公开的，运算也不复杂。除了加密通道本身，似乎没有太多有效的保护通信安全的办法。
那么为什么还要引入掩码计算呢，除了增加计算机器的运算量外似乎并没有太多的收益（这也是不少同学疑惑的点）。
答案还是两个字：安全。但并不是为了防止数据泄密，而是为了防止早期版本的协议中存在的代理缓存污染攻击（proxy cache poisoning attacks）等问题。
1、代理缓存污染攻击
下面摘自 2010 年关于安全的一段讲话。其中提到了代理服务器在协议实现上的缺陷可能导致的安全问题。猛击出处。

“We show, empirically, that the current version of the WebSocket consent mechanism is vulnerable to proxy cache poisoning attacks. Even though the WebSocket handshake is based on HTTP, which should be understood by most network intermediaries, the handshake uses the esoteric “Upgrade” mechanism of HTTP [5]. In our experiment, we find that many proxies do not implement the Upgrade mechanism properly, which causes the handshake to succeed even though subsequent traffic over the socket will be misinterpreted by the proxy.”
[TALKING] Huang, L-S., Chen, E., Barth, A., Rescorla, E., and C.

          Jackson, "Talking to Yourself for Fun and Profit", 2010,

复制代码
在正式描述攻击步骤之前，我们假设有如下参与者：

攻击者、攻击者自己控制的服务器（简称“邪恶服务器”）、攻击者伪造的资源（简称“邪恶资源”）
受害者、受害者想要访问的资源（简称“正义资源”）
受害者实际想要访问的服务器（简称“正义服务器”）
中间代理服务器

攻击步骤一：

攻击者浏览器 向 邪恶服务器 发起 WebSocket 连接。根据前文，首先是一个协议升级请求。
协议升级请求 实际到达 代理服务器。
代理服务器 将协议升级请求转发到 邪恶服务器。
邪恶服务器 同意连接，代理服务器 将响应转发给 攻击者。

由于 upgrade 的实现上有缺陷，代理服务器 以为之前转发的是普通的 HTTP 消息。因此，当协议服务器 同意连接，代理服务器 以为本次会话已经结束。
攻击步骤二：

攻击者 在之前建立的连接上，通过 WebSocket 的接口向 邪恶服务器 发送数据，且数据是精心构造的 HTTP 格式的文本。其中包含了 正义资源 的地址，以及一个伪造的 host（指向正义服务器）。（见后面报文）
请求到达 代理服务器 。虽然复用了之前的 TCP 连接，但 代理服务器 以为是新的 HTTP 请求。
代理服务器 向 邪恶服务器 请求 邪恶资源。
邪恶服务器 返回 邪恶资源。代理服务器 缓存住 邪恶资源（url 是对的，但 host 是 正义服务器 的地址）。

到这里，受害者可以登场了：

受害者 通过 代理服务器 访问 正义服务器 的 正义资源。
代理服务器 检查该资源的 url、host，发现本地有一份缓存（伪造的）。
代理服务器 将 邪恶资源 返回给 受害者。
受害者 卒。

附：前面提到的精心构造的“HTTP 请求报文”。
Client → Server:
POST /path/of/attackers/choice HTTP/1.1 Host: host-of-attackers-choice.com Sec-WebSocket-Key: <connection-key>
Server → Client:
HTTP/1.1 200 OK
Sec-WebSocket-Accept: <connection-key>
复制代码
2、当前解决方案
最初的提案是对数据进行加密处理。基于安全、效率的考虑，最终采用了折中的方案：对数据载荷进行掩码处理。
需要注意的是，这里只是限制了浏览器对数据载荷进行掩码处理，但是坏人完全可以实现自己的 WebSocket 客户端、服务端，不按规则来，攻击可以照常进行。
但是对浏览器加上这个限制后，可以大大增加攻击的难度，以及攻击的影响范围。如果没有这个限制，只需要在网上放个钓鱼网站骗人去访问，一下子就可以在短时间内展开大范围的攻击。

## 交互流程

1、我打开浏览器，访问了这个网站，并录入用户名密码，点击登录。2、登录事件执行 js 脚本建立了一个 websocket 连接。3、连接建立成功后触发了后台的@onOpen 方法和前台的 ws.onopen 方法。4、前台的 onopen 方法里向服务器发送了如下消息体：{'userID':'dayuan','password':'ps123','msg_type':'01'}5、后台的@OnMessage 方法接收到了前台的消息，并由 msg_type 判断出这个消息是登录动作，于是走到了 doLogon 方法中。6、doLogon 方法经过身份验证后，将此连接实例存入了 Hashtable 类型的容器 wsTable 中，登录完成。7、我在浏览器里找到好友 A，打开对话框输入“你好”，并点击发送。8、发送事件执行 js：ws.send("{'toID':'A','text':'你好','msg_type':'02'}");9、后台的@OnMessage 方法接收到了前台的消息，并由 msg_type 判断出这个消息是聊天，于是走到了 doChat 方法。10、doChat 方法根据 toID 从 wsTable 中拿到了 A 的连接实例，并调用 A 的 sendMessage 方法将消息发送到了 A 的浏览器。(wsTable 中 A 的连接实例是在 A 登录时放进去的)11、A 的浏览器里收到服务器的消息后，触发了 ws.onmessage 方法，并展示到了 A 的页面中。

## 应用场景
websocket实现一个后台数据更新， 自动刷新页面的功能，在本地测试过都没有问题，部署以后在火狐上可以，所有谷歌内核的浏览器都会自动断开，没有任何报错，有个提示不知道是不是有关系，有大佬知道怎么解决吗