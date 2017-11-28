Learning Theory
2017-11-28

最近整理了一下有关强化学习的一些资料，准备这几天整理成笔记，有关马尔科夫决策过程的，马尔科夫过程相对来说苦涩，因为它是属于随机过程的一个课题，但它的应用和一些motivation与现实却十分贴近，所以理解起来并不难。总而言之，它不属于强化学习，但它是理解和走入强化学习的必经之路，是强化学习的基础。
http://olrs8j04a.bkt.clouddn.com/17-11-28/61138696.jpg
===

最近整理了一下有关强化学习的一些资料，准备这几天整理成笔记，有关马尔科夫决策过程的，马尔科夫过程相对来说苦涩，因为它是属于随机过程的一个课题，但它的应用和一些motivation与现实却十分贴近，所以理解起来并不难。总而言之，它不属于强化学习，但它是理解和走入强化学习的必经之路，是强化学习的基础。

# 学习理论

## 1. 学习算法的目标

早期学习算法的目标是找到一种近似拟合函数，使得函数能够拟合给定的数据，类似于我们初中高中时学习的给你一组坐标点，让你求解出满足这些点的表达式.

如果学习算法能够拟合正确的样本（或者说，学习算法能够将样本正确分类），那么将说明算法具有一致性（constant[[1\]](#_ftn1)）.

比如一个分类算法能够将数据完全正确分类，那么就说这个分类算法是具有一致性的，那么该算法的在数据上表示为一个一致性空间（consistent space）.

但是我们不关心这个算法在训练数据上的performance，而是关心训练数据之外的performance，这个也被称之为generalization ability（泛化能力）.因为就像我们一样找算卦先生一样，我们要的不是对过去的描述，我们的目的在于对未来的预测.（深有体会）

还有一种重要的指标为稳定性/鲁棒性（Robust），古人有句老话：“放之四海皆为准”说的就是这个道理，用在学习算法上，就是不管谁做，不管怎么划分数据（任意比例），对我们最后的accuracy影响不大。比如：丢骰子，交给两个人丢，不管这两个人丢几次，但是你会发现这两个人丢出骰子正面数字“6”朝上的几率是基本上不发生多大的变化的，都近似为1/6.

## 2. 概率近似算法 – PAC Model

一般情况下，我们可以假设我们的训练数据和测试数据都是独立同分布（iid）来源于一个不知道（unknown）的分布![img](http://www.shenhengheng.xyz/img/posts/11/clip_image002.png).

在这里我们将我们的分类算法形成的解空间称为假设空间![img](http://www.shenhengheng.xyz/img/posts/11/clip_image004.png)（hypothesis space）,那么我们现在要在假设空间内对我们的算法进行评估（evaluate），采用的评估指标为均值误差（average error）或者期望误差（expect error）.

定义风险函数（risk function）：

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image006.png)

假设![img](http://www.shenhengheng.xyz/img/posts/11/clip_image008.png)是在数据集![img](http://www.shenhengheng.xyz/img/posts/11/clip_image002.png)经过独立同分布抽样得来的。因为我们之前定义了一个假说空间![img](http://www.shenhengheng.xyz/img/posts/11/clip_image011.png)，那么我们将在每一个假说函数![img](http://www.shenhengheng.xyz/img/posts/11/clip_image013.png)，上针对数据求得每一个假说函数对应的期望误差![img](http://www.shenhengheng.xyz/img/posts/11/clip_image015.png)，由于每一个选择（比如数据集，假说函数的选择）都可以看作成随机试验，那么我们可以将![img](http://www.shenhengheng.xyz/img/posts/11/clip_image015.png)看作一个随机变量（random variable）来分析.

由于在未知分布的情况下，所以我们并没有合适的计算方法，只能利用统计学里面的假设检定的方法近似求出期望误差所在的大致区间。我们可以定义一个bound记作![img](http://www.shenhengheng.xyz/img/posts/11/clip_image017.png)，![img](http://www.shenhengheng.xyz/img/posts/11/clip_image019.png)被称作置信水平.

比如下图描述的为![img](http://www.shenhengheng.xyz/img/posts/11/clip_image021.png)，分布为正态分布的置信区间（confidence interval）

![http://www.kean.edu/~fosborne/bstat/px/392x286xthe_95_ci_for_mu.gif.pagespeed.ic.m2MSz_40ZG.png](http://www.shenhengheng.xyz/img/posts/11/clip_image023.jpg)

即

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image025.png)

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image027.png)![img](http://www.shenhengheng.xyz/img/posts/11/clip_image029.png)

## 3. 求出最小期望风险（MSE）

现在，假定我们的训练数据![img](http://www.shenhengheng.xyz/img/posts/11/clip_image031.png)独立同分布于特定的分布![img](http://www.shenhengheng.xyz/img/posts/11/clip_image002.png)，概率密度函数为![img](http://www.shenhengheng.xyz/img/posts/11/clip_image034.png)。

那么错误分类的期望误差为

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image036.png)

但是这种往往是不现实的，因为在现实处理的数据我们是不知道它背后的具体分布的.

## 4. 最小实验误差（ERM - Empirical Risk Minimization）

那么做统计的人就提出了一种在未知![img](http://www.shenhengheng.xyz/img/posts/11/clip_image038.png)的情况下，如何计算误分类的误差。

思想是将具体的![img](http://www.shenhengheng.xyz/img/posts/11/clip_image040.png)换成在样本数据上做平均，那么实验风险函数为

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image042.png)

找到使得上式最小的![img](http://www.shenhengheng.xyz/img/posts/11/clip_image044.png),使得

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image046.png)

注意：根据经验可以知道，

- 当![img](http://www.shenhengheng.xyz/img/posts/11/clip_image048.png)越大越好；
- 不管![img](http://www.shenhengheng.xyz/img/posts/11/clip_image048.png)设置多大，都将有可能会造成过拟合的情况发生。

## 5. VC confidence – 期望误差和实验误差的边界

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image051.png)

对该公式[[2\]](#_ftn2)的解释：

1. 其中![img](http://www.shenhengheng.xyz/img/posts/11/clip_image053.png)表示了对假说空间![img](http://www.shenhengheng.xyz/img/posts/11/clip_image011.png)的度量；
2. ![img](http://www.shenhengheng.xyz/img/posts/11/clip_image056.png)；
3. 假说空间越大，Hypothesis dimension就越高，![img](http://www.shenhengheng.xyz/img/posts/11/clip_image058.png)，那么bound越大，说明overfitting的几率就越大.
4. 结构风险（SRM）最小

上面的式子可以看作 期望误差![img](http://www.shenhengheng.xyz/img/posts/11/clip_image060.png)实验误差（training error->bias）+VC（error->variance）        

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image062.jpg)

Model的variance可以这样理解：100个人算平均身高和1000个人算平均身高，1000个人算的身高更准一些，抛硬币也是.

需要注意的是：当![img](http://www.shenhengheng.xyz/img/posts/11/clip_image053.png)越大，那么variance就越大.

上面的两个式子是支持向量机的基础，在这里提出了一个margin的概念，在这里，为了节省篇幅，放在支持向量机上面去陈述。

## 7. 假说空间的大小:VC-dimension 

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image065.jpg)

![img](http://www.shenhengheng.xyz/img/posts/11/clip_image067.jpg)

------

[[1\]](#_ftnref1)consistent在这里翻译成一致性，比如： consistent，這個字的意思在線性代數裡面，就是指一個線性方程組有解存在的意思。

[[2\]](#_ftnref2) C.J. C. Burges, A tutorial on support vector machines for pattern recognition, DataMining and Knowledge Discovery 2 (2) (1998), p.121-167