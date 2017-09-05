Connect Internet Without No Traffic In School
2017-09-05

上一篇文章介绍了如何对电脑进行ipv6免流量配置，接下来就对如何对局域网内的手机如何顺利的联网进行论述，主要介绍局部代理，不同于上篇文章介绍到的对桌面版QQ和微信进行应用代理，这次测试的手机不能进行对QQ 和微信进行使用，好像屏蔽掉了，但能正常在浏览器进行上网和看youtube，Gmail等等
http://olrs8j04a.bkt.clouddn.com/17-9-5/76082342.jpg
---
昨天刚刚介绍了如何对电脑进行ipv6免流量配置，接今天就对如何对局域网内的手机如何顺利的联网进行论述，主要介绍局部代理，不同于上篇文章介绍到的对桌面版QQ和微信进行应用代理，这次测试的手机不能进行对QQ 和微信进行使用，好像屏蔽掉了，但能正常在浏览器进行上网和看youtube，Gmail等等

###准备材料
<br>

- 一部iphone手机
- 能进行ipv6免流上网的电脑，装有免费wifi共享软件
- 关闭防火墙

### 具体操作
<br>

1. 打开手机设置，连接你设置的共享wifi，（ **记住** 一定要把电脑的防火墙干掉，不干掉是上不去网滴）.
2. 连接之后，在那个wifi上点击一个类似与感叹号的按钮，会弹出详细信息关于该网络，往下滑，你会发现有设置代理的地方，转到 **AUTO** 处，输入 **http://xxx.xxx.xxx.xxxx:1080/pac** 。<div align="center">
![](http://olrs8j04a.bkt.clouddn.com/17-9-5/58224058.jpg?imageMogr/thunbnail/!50p)  <center><caption class="cap">图1 手机端设置</caption></center>
  </div><div align="center">
  ![](http://olrs8j04a.bkt.clouddn.com/17-9-5/26444952.jpg?imageMogr/thumbnail/!40p)
  <center><caption class="cap">图2 能够正确上网</caption></center>
  </div>
3. 打开你的浏览器，看看是否能够正确上网了。
