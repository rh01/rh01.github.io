How To Connect Internet Using IPV6 Without No Traffic
2017-09-04

进入新的研究生学校，在大学从未曾接触到IPV6无流量上网的我来说，完全懵B，这是啥子东西嘛？都没有听说过，看来我上了一个“假的”大学。来到研究生学校（UCAS），发现他们的流量是要钱滴，好奇葩的有木有！！我上大学从来没有见过上网要钱滴。看来我的大学生活还是很不错的，瞬间自豪感起来了。虽说到了研究生流量要钱，那么就尽量在满足我们上要需求的情况下合理的进行省钱是一个好的idea.
http://olrs8j04a.bkt.clouddn.com/17-9-4/34115661.jpg
---
><a class="btn btn-primary" target="_blank" href="../files/Shadowsocks-win-2.5.2.zip"><span class="fa fa-download  fa-lg fa-fw"></span> ss client Download</a>


进入新的研究生学校，在大学从未曾接触到IPV6无流量上网的我来说，完全懵B，这是啥子东西嘛？都没有听说过，看来我上了一个“假的”大学。来到研究生学校（UCAS），发现他们的流量是要钱滴，好奇葩的有木有！！我上大学从来没有见过上网要钱滴。看来我的大学生活还是很不错的，瞬间自豪感起来了。虽说到了研究生流量要钱，那么就尽量在满足我们上要需求的情况下合理的进行省钱是一个好的idea.

因此特别地在这里，制作出一个省钱的教程，摆脱你的无VPN和无流量的困境。

###准备材料

<br>需要以下材料：

- [Bandwagonhost](https://bandwagonhost.com) 账号,有时也被称作搬瓦工
- 支付宝账户（需要支付你的VPS）
- Shadowsocks客户端（本教程附加下载，你也可以从这个 [地址](https://github.com/shadowsocks/shadowsocks-windows/releases/tag/4.0.5) 下载）
- 需要有线的以太网接口，一般情况下学校都会有网线插口
- 需要一根网线

###购买VPS

<br>废话少说，上教程和配图。


在网上搜索了很长时间，搬瓦工是一个便宜稳定并且支持支付宝支付的一家VPS（虚拟主机，往往人们在上面配置服务器或者部署网站，FQ等等，在这里我使用它做VPN服务来FQ。）

1. 打开[Bandwagonhost](https://bandwagonhost.com) ，注册并登录（很简单，省略）
2. 登录之后，选择合适的套餐，如果是新手，选择如下图所示的服务，1->2，千万别点错了，选择 **OrderOVZ**。
<div align="center">
![新手购机](http://olrs8j04a.bkt.clouddn.com/17-9-4/90531119.jpg?imageMogr2/thumbnail/!60p)
<center class="cap"><caption>图1 购机</caption></center>
</div>

3. 选择完成后，会跳出一个新的标签，在页面中选择节点地址就可以了，在这里选择了US - Los Angeles DC2 QNET (USCA_2)，如图。<div align="center">
![选择地址](http://olrs8j04a.bkt.clouddn.com/17-9-4/56351816.jpg)
<center class="cap"><caption>图2 选择地址并下单</caption></center>
</div>

4. 支付订单并完成
<div align="center">
    ![结算](http://olrs8j04a.bkt.clouddn.com/17-9-4/32584067.jpg)
    <center class="cap"><caption>图3 结算</caption></center>
</div>
<div align="center">
    ![支付](http://olrs8j04a.bkt.clouddn.com/17-9-4/21065011.jpg)
    <center class="cap"><caption>图4 选择使用支付宝支付，Paypal太贵！</caption></center>
</div>

###配置SS服务

<br>支付完成后，会向你发送一封邮件，这封邮件包含你的ip地址和SSH的端口号（这个是你需要客户端登录要填写的端口号）。默认情况下，分配的是CentOS系统的。

在主页点击 Services->My Services，即<div align="center">
    ![](http://olrs8j04a.bkt.clouddn.com/17-9-4/74582836.jpg)
    <center class="cap"><caption>图5 查看主机信息</caption></center>
</div>

接下来来到管理界面上对主机进行以下操作：

- 生成root密码
- 启用ipv6地址

然后使用XShell软件连接到VPS上，并进行下一步配置SS服务.<div align="center">
    ![](http://olrs8j04a.bkt.clouddn.com/17-9-4/64904900.jpg)
    <center class="cap"><caption>图6 远程登陆云主机</caption></center>
</div>

登陆后，对主机进行SS服务的安装（注意：在这里不使用搬瓦工自带的一键安装方法）。

首先安装配置工具:

```bash
# 一些安装包需要的编译工具
$ yum install epel-release
$ yum update
$ yum install python-setuptools m2crypto supervisor
# 安装python的pip包管理
$ easy_install pip
# 安装shadowsocks服务器端
$ pip install shadowsocks
```

编写配置文件：

```bash
$ vi /etc/shadowsocks.json
```

并将一下代码片段复制过去：

```json
{
    "server":"::",
    "server_port":8388,
    "local_port":1080,
    "password":"yourpassword",
    "timeout":600,
    "method":"aes-256-cfb"
}
```

注意：password里输入的是你自己定义的密码，server_port输入的端口你也可以自己定

- "server":"::" 表示启用的是IPV6，仅支持IPV6
- "server":"0.0.0.0"表示启用的是IPV4，仅支持IPV4
- "server":"0.0.0.0"\n"server_ipv6":"::" 表示启用IPV4和V6

打开SS客户端并输入VPS的ip信息：<div align="center">
    ![](http://olrs8j04a.bkt.clouddn.com/17-9-4/88255315.jpg)
    <center class="cap"><caption>图7 登录SS客户端，启用代理</caption></center>
</div>

<div class="alert alert-warning" role="alert">
  重点：<br>
  使用系统代理和
  在系统代理模式中启用全局模式。
</div>

在百度中搜索ip，会显示当前主机使用的ip地址。如图所示：<div align="center">
  ![](http://olrs8j04a.bkt.clouddn.com/17-9-4/38703883.jpg)<center class="cap"><caption>图8 查看IP</caption></center>
</div>

###开始IPV6无流量模式

<br>打开 **控制面板\网络和 Internet\网络连接**,设置本地网卡属性。在IPV6中设置首选DNS服务器为你的VPS主机IPV6地址。（切记：一定要确定你的校园网注销登录了，负责走得还是你的IPV4，即你的校园网。）

<div class="alert alert-warning" role="alert">
  如何确定走的是你的IPV6？<br>
  打开 http://test-ipv6.com/，查看IPV6地址是不是你VPS的IPV6地址！如果是，就对了，不是，注销校园网登录，或联系我！
</div>

<div class="alert alert-danger" role="alert">
  注意：<br>
  只能浏览网站，其他的需要进行做代理，比如QQ。其中QQ代理上填写的IP地址是你的以太网地址。  
<div align="center">
<img src="http://olrs8j04a.bkt.clouddn.com/17-9-5/18337819.jpg" align="center">
<center class="cap"><caption>图9 对电脑QQ进行代理设置</caption></center>
</div>
</div>


OK！你可以快快乐乐的玩耍了！下一篇文章将介绍如何对苹果手机进行局域网连接。

###参考文章
<br>[1] https://blog.whsir.com/post-1456.html



    

