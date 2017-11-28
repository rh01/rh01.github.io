Learning Theory
2017-11-28

本部分是学习理论的介绍，如有纰漏，请与作者联系.
http://olrs8j04a.bkt.clouddn.com/17-11-28/61138696.jpg
===

本部分是学习理论的介绍，如有纰漏，请与作者联系.

# 学习理论

## 1. 学习算法的目标

早期学习算法的目标是找到一种近似拟合函数，使得函数能够拟合给定的数据，类似于我们初中高中时学习的给你一组坐标点，让你求解出满足这些点的表达式.

如果学习算法能够拟合正确的样本（或者说，学习算法能够将样本正确分类），那么将说明算法具有一致性（constant[[1\]](#_ftn1)）.

比如一个分类算法能够将数据完全正确分类，那么就说这个分类算法是具有一致性的，那么该算法的在数据上表示为一个一致性空间（consistent space）.

但是我们不关心这个算法在训练数据上的performance，而是关心训练数据之外的performance，这个也被称之为generalization ability（泛化能力）.因为就像我们一样找算卦先生一样，我们要的不是对过去的描述，我们的目的在于对未来的预测.（深有体会）

还有一种重要的指标为稳定性/鲁棒性（Robust），古人有句老话：“放之四海皆为准”说的就是这个道理，用在学习算法上，就是不管谁做，不管怎么划分数据（任意比例），对我们最后的accuracy影响不大。比如：丢骰子，交给两个人丢，不管这两个人丢几次，但是你会发现这两个人丢出骰子正面数字“6”朝上的几率是基本上不发生多大的变化的，都近似为1/6.

## 2. 概率近似算法 – PAC Model

一般情况下，我们可以假设我们的训练数据和测试数据都是独立同分布（iid）来源于一个不知道（unknown）的分布 ${{\cal D}}$.


在这里我们将我们的分类算法形成的解空间称为假设空间${{h \in H}}$ （hypothesis space）,那么我们现在要在假设空间内对我们的算法进行评估（evaluate），采用的评估指标为均值误差（average error）或者期望误差（expect error）.

定义风险函数（risk function）：

$$\mathop {err(h)}\limits_{{\cal D}}  = {{\cal D}}\{ (x,y) \in X \times \{  - 1,1\} |h(x) \ne y\} $$

假设$S = \{ ({x_1},{y_1}),({x_2},{y_2}),...,({x_l},{y_l})\} $是在数据集${{\cal D}}$经过独立同分布抽样得来的。因为我们之前定义了一个假说空间$H$，那么我们将在每一个假说函数$\mathop {err}\limits_{{\cal D}} ({h_S})$，上针对数据求得每一个假说函数对应的期望误差$\mathop {err}\limits_{{\cal D}} ({h_S})$，由于每一个选择（比如数据集，假说函数的选择）都可以看作成随机试验，那么我们可以将$\mathop {err}\limits_{{\cal D}} ({h_S})$看作一个随机变量（random variable）来分析.

由于在未知分布的情况下，所以我们并没有合适的计算方法，只能利用统计学里面的假设检定的方法近似求出期望误差所在的大致区间。我们可以定义一个bound记作$\varepsilon {\rm{ = }}\varepsilon {\rm{(}}l,H,\delta )$，${\rm{1 - }}\delta $被称作置信水平.

比如下图描述的为${\rm{1 - }}\delta  = 95\% $，分布为正态分布的置信区间（confidence interval）

<div align="center">
<img src="http://www.shenhengheng.xyz/img/posts/11/clip_image023.jpg" >
</div>



即

$$P(\mathop {err}\limits_{{\cal D}} ({h_S}) > \varepsilon ) = \varepsilon (l.h.\delta ) < \delta $$

$$P(\mathop {err}\limits_{{\cal D}} ({h_S}) \le \varepsilon ) = \varepsilon (l.h.\delta ) \ge 1 - \delta $$

## 3. 求出最小期望风险（MSE）

现在，假定我们的训练数据$S = \{ ({x_1},{y_1}),({x_2},{y_2}),...,({x_l},{y_l})\}  \subseteq X \times \{  - 1,1\} $独立同分布于特定的分布${{\cal D}}$，概率密度函数为$P(x,y)$。

那么错误分类的期望误差为

$$R[h] = \int_{X \times \{  - 1,1\} } {{1 \over 2}|h(x) - y|dp(x,y)} $$

但是这种往往是不现实的，因为在现实处理的数据我们是不知道它背后的具体分布的.

## 4. 最小实验误差（ERM - Empirical Risk Minimization）

那么做统计的人就提出了一种在未知${{\cal D}},p(x,y)$的情况下，如何计算误分类的误差。

思想是将具体的$p(x,y)$换成在样本数据上做平均，那么实验风险函数为

$${R_{emp}}[h] = {1 \over l}\sum\limits_{i = 1}^l {{1 \over 2}|h({x_i}) - {y_i}|} $$

找到使得上式最小的${h^*}$,使得

$${R_{emp}}[{h^*}] \le {R_{emp}}[h],\;\;\;\;\forall h \in H$$

注意：根据经验可以知道，

- 当$l$越大越好；
- 不管$l$设置多大，都将有可能会造成过拟合的情况发生。

## 5. VC confidence – 期望误差和实验误差的边界

$$R[h] \le {R_{emp}}[h] + \sqrt {{{v(\log ({{2l} \over v}) + 1) - \log ({\delta  \over 4})} \over l}} $$

对该公式[[2\]](#_ftn2)的解释：

1. 其中$v$表示了对假说空间$H$的度量；
2. $l \to \infty ,R[h] \to {R_{emp}}[h]$；
3. 假说空间越大，Hypothesis dimension就越高，$v \to \infty $，那么bound越大，说明overfitting的几率就越大.

## 6. 结构风险（SRM）最小

上面的式子可以看作 期望误差$ \le $实验误差（training error->bias）+VC（error->variance）        
<div align="center">
<img src="http://www.shenhengheng.xyz/img/posts/11/clip_image062.jpg" >
</div>

Model的variance可以这样理解：100个人算平均身高和1000个人算平均身高，1000个人算的身高更准一些，抛硬币也是.

需要注意的是：当$v$越大，那么variance就越大.

上面的两个式子是支持向量机的基础，在这里提出了一个margin的概念，在这里，为了节省篇幅，放在支持向量机上面去陈述。

## 7. 假说空间的大小:VC-dimension 


<div align="center">
<img src="http://www.shenhengheng.xyz/img/posts/11/clip_image065.jpg" >
<img src="http://www.shenhengheng.xyz/img/posts/11/clip_image067.jpg" >
</div>

------

[[1\]](#_ftnref1)consistent在这里翻译成一致性，比如： consistent，這個字的意思在線性代數裡面，就是指一個線性方程組有解存在的意思。

[[2\]](#_ftnref2) C.J. C. Burges, A tutorial on support vector machines for pattern recognition, DataMining and Knowledge Discovery 2 (2) (1998), p.121-167