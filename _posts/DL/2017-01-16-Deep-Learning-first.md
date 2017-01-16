---
layout: post
title: [笔记1]从机器学习到深度学习-两个问题
category: DL
tags: classification,machine learning,deep learning,tutorial
keywords: Note
---

这篇笔记主要摘出一部分的问题和解决方案来谈谈我学习 [Deep Learning](https://classroom.udacity.com/courses/ud730) 时的一些感想和收获。

## 行人检测任务

**问题是**：

假设你在你的车上有一个摄像头拍摄前面的街道，你想检测你前面的行人在哪？保证你不撞到他们，你怎么能通过一个分类器实现呢？

![detecting](http://p1.bqimg.com/567571/6b5b92539b60bd36.png)

**Answer**：（我的想法）

首先选择一些标记了正负标记的样本（Positive：行人，Negative：杂讯），用于训练行人检测分类模型，然后利用训练好的模型来检测街道是否有行人。

*导师给出的答案*:

*A typical method is to run a binary classifier over different areas of an image, and mark the areas with a positive label as detected instances.*

一种把这个检测问题转化为分类问题的方法是，一个分类器将图片中的小块分成两类，行人或者非行人，你就可以对图片多次执行这个分类器，每当它的输出为行人时就告诉你你所需要的行人位置！

## 用于排名的分类（有时候也成为竞价排名）

**问题是**

网页搜索排序,假设你有一个搜索请求,你想找到在网站上所有跟请求相关的网页,你怎么使用一个分类器实现？

![Ranking](http://p1.bqimg.com/567571/c2e243e01ec6dcc8.png)

**解决方案：**

使分类器接收成对的搜索请求和网站,输出则是两类中的其中一个 相关或者不相关
当然 如果你在整个网络中运行分类器,将会有无数的网页需要查看,但是搜索引擎将会走捷径,仅尝试分类那些比较有可能的候选网站.



