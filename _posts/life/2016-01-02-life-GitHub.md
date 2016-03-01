---
layout: post
title: RStudio和GitHub出现的问题解决方案
category: 生活
tags: RStudio
keywords: RStudio,GitHub
---



## RStudio在使用GitHub时遇见的一些问题（持续更新中 ...）

1. 当我尝试着从RStudio IDE中push到github的时候，遇到了以下的错误信息.

```
error: unable to read askpass response from 'rpostback-askpass'
fatal: could not read Username for 'https://github.com':
       No such device or address
```

RStduio也有我的源

```
https://github.com/rh01/calendar.git
```

RStudio 不允许我改变版本控制系统的源（主要在这里灰色显示），如下图所示：


![Git Push Error](../../../pic/Git Push Error.png)

我尝试了很多方法去解决该问题，在 [stackoverflow](http://stackoverflow.com/questions/24944387/errors-when-using-rstudios-git-tools) 收到启发，根据我的情况，作出了以下的方案解决上述问题

我根据之前的经验，看到我之前已经正常工作的RProject的configuration

![correct push](../../../pic/correct push.png)

于是我在本地计算机中删除了本地clone的repo.然后重新克隆github中源

![clone Git.png](../../../pic/Git clone.png)

然后我在RStudio中 click *New Project* -> *Existing Directory*

![New Project](../../../pic/New Project.png)

OKay,It's Works.

![Success Commit.png](../../../pic/Success Commit.png)


