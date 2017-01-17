---
layout: post
title: softmax 模型
category: 深度学习
tags: classification,machine learning,deep learning,tutorial
keywords: Note
---

## softmax 模型和激活函数

{% highlight python %}
"""Softmax."""

scores = [3.0, 1.0, 0.2]

import numpy as np

def softmax(x):
    """Compute softmax values for each sets of scores in x."""
    pass # TODO:Compute and return softmax(x)

print(softmax(scores))

# Plot softmax curves
import matplotlib.pyplot as plt
x = np.arange(-2.0, 6.0, 0.1)
scores = np.vstack([x, np.ones_like(x), 0.2 * np.ones_like(x)])

plt.plot(x, softmax(scores).T, linewidth=2)
plt.show()

{% endhighlight %}

**Softmax 模型**

**Note**: softmax(x) 函数应该返回一个形状和x相同的NumPy array类型。

例如，当输入为一个列表或者一维矩阵（用列向量表示一个样本样本）时，比如说以下的：

{% highlight python %} 
 scores = [1.0, 2.0, 3.0]
{% endhighlight %} 

应该返回一个同样长度（即3个元素）的一维矩阵：

{% highlight python %} 
print softmax(scores) 
{% endhighlight %} 

{% highlight python %} 
[ 0.09003057  0.24472847  0.66524096]
{% endhighlight %} 

对于一个二维矩阵，如以下（列向量表示单个样本），例如:

{% highlight python %}
scores = np.array([[1, 2, 3, 6],[2, 4, 5, 6],[3, 8, 7, 6]])
{% endhighlight %}                     

该函数应该返回一个同样大小(3,4)的二维矩阵，如以下:

{% highlight python %}
 [[ 0.09003057  0.00242826  0.01587624  0.33333333]
  [ 0.24472847  0.01794253  0.11731043  0.33333333]
  [ 0.66524096  0.97962921  0.86681333  0.33333333]]
{% endhighlight %} 

每个样本（列向量）中的概率加起来应当等于 1。

解决方案：
{% highlight python %}
def softmax(x):
     """Compute softmax values for each sets of scores in x."""
    return np.exp(x) / np.sum(np.exp(x), axis = 0)
{% endhighlight %}

运行结果:

{% highlight python %} 
[ 0.8360188   0.11314284  0.05083836]
{% endhighlight %} 


![result](http://i1.piimg.com/567571/b44cd2b3a1927e8f.png)

**笔记：**

两个数学函数

np.sum()：

np.exp()


