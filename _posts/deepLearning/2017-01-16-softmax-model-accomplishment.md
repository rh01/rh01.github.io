---
layout: post
title: softmax 模型
category: 深度学习
tags: softmax modle,classifcation
keywords: softmax,python
---

## softmax 模型和激活函数

> """Softmax."""
>
>scores = [3.0, 1.0, 0.2]
>
>import numpy as np
>
>def softmax(x):
>    """Compute softmax values for each sets of scores in x."""
>    pass
>      
>
>
>print(softmax(scores))

> # Plot softmax curves
> import matplotlib.pyplot as plt
> x = np.arange(-2.0, 6.0, 0.1)
> scores = np.vstack([x, np.ones_like(x), 0.2 * np.ones_like(x)])
> 
> plt.plot(x, softmax(scores).T, linewidth=2)
> plt.show()
> 

**Softmax 模型**
**Note**: softmax(x) 函数应该返回一个形状和x相同的NumPy array类型。

例如，当输入为一个列表或者一维矩阵（用列向量表示一个样本样本）时，比如说以下的：
> scores = [1.0, 2.0, 3.0]

应该返回一个同样长度（即3个元素）的一维矩阵：

> print softmax(scores)
> 

**[ 0.09003057  0.24472847  0.66524096]**

对于一个二维矩阵，如以下（列向量表示单个样本），例如:

> scores = np.array([[1, 2, 3, 6],[2, 4, 5, 6],[3, 8, 7, 6]])                    

该函数应该返回一个同样大小(3,4)的二维矩阵，如以下:
> 
> [[ 0.09003057  0.00242826  0.01587624  0.33333333]
>  [ 0.24472847  0.01794253  0.11731043  0.33333333]
>  [ 0.66524096  0.97962921  0.86681333  0.33333333]]
>  

每个样本（列向量）中的概率加起来应当等于 1。

解决方案：

> def softmax(x):
>     """Compute softmax values for each sets of scores in x."""
>     values = []
>     for item in x:
>         values.append(item) #Compute and return softmax(x)
>     
>     return np.array(values)

运行结果:

>[ 3.   1.   0.2]

![result](http://p1.bqimg.com/567571/543b662323c9f1cf.png)

**笔记：**

numpy.array

numpy.array(*object*, *dtype=None*, *copy=True*, *order=None*, *subok=False*, *ndmin=0*)

**Create an array.**
