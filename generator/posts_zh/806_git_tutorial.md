Git和GitHub教程
2017-08-03
Web 开发
Git是一个开源的版本控制系统，本教程将讲解Git的基本使用和高级使用技巧...
http://olrs8j04a.bkt.clouddn.com/17-8-25/84252244.jpg
---
![git logo](http://olrs8j04a.bkt.clouddn.com/17-8-25/84252244.jpg
){: .pull-right}
本教程主要从Git的简明使用到高级应用，比如协作和相关高级话题。本教程本着简明扼要的目标给出相当精彩的教程！
##Git Configurations

基本配置命令：
```bash
git config –global user.name “xxxxx”
git config –global user.email xxx@xx.com
```
使用上述命令时，user.name和user.email均为GitHub注册的用户名和邮箱。
查看Git的配置内容：
```bash
git config –list
```
一般情况下打印的内容如下图所示：
<div align="center">
![Git Configuration](../img/blog/git-configuration.png)
<center class="cap"><caption >图1 Git配置内容</caption></center>
</div>
##Creating New Repos

- 主要学习的命令为：git init，git clone，git status
- git init为在本地计算机创建一个新的仓库。
- git clone为从远程或者本地Git服务器上copy一个repo到本地计算机。
- git status为检查repo的状态信息，比如那些文件发生改变，那些需要commit等等。

###git init
<br>
运行git init命令后，Git将跟踪当前文件夹下的所有内容，包括文件和目录。所有这些文件信息都存储在名为.git的目录中（注意在开头.，这意味着它将是Mac / Linux上的隐藏目录）。这个.git目录是Git记录“repo”跟踪所有变化和提交的地方！

<div class="alert alert-warning" role="alert">不要直接编辑.git目录中的任何文件。这是版本库（repo）的核心。如果更改文件名和/或文件内容，git可能会丢失在repo中保留的文件，并且可能会失去很多工作！可以查看这些文件，但不要编辑或删除它们。</div>

以下是.git目录中每个文件夹的简要描述：

* config file - 存储所有特定的项目的配置。

<div class="padding_right">Git在您当前使用的任何存储库的Git目录（.git / config）中的配置文件中查找配置值。这些值特定于该单个存储库。
例如，假设您在Git的全局配置（global）使用您的个人电子邮件地址。但是如果您希望将工作电子邮件用于特定项目而不是您的个人电子邮件，那么就应该修改该文件中的邮件设置。</div>

* description file - 此文件仅由GitWeb程序使用，可以忽略它。
* hooks directory - 我们可以在该目录中放置客户端或服务器端脚本，这些脚本用来挂钩Git不同的生命周期事件。
* info directory - 包含全局排除文件objects目录 - 此目录将存储我们所做的所有提交。
* refs directory - 此目录包含提交的指针（基本上是“分支”和“标签”）。

###git clone
<br>
目的：在本地构建一个副本<br>
**usage**:
```bash
git clone https://github.com/xxx/xxxx.git
git clone git@github.com:xxxx/xxx.git
```

###git status
<br>
git status会告诉我们Git正在考虑什么，以及Git看到的版本库的状态。当你是第一次使用它，你应该每一步都要使用git status命令！在执行完其他命令后，都要很习惯性地运行该命令。这将帮助您了解Git的工作原理，并帮助您对文件/版本库的状态做出正确的判断。

**Git Status Explanation**
<br>比如下列一段输出：
>On branch master

>Your branch is up-to-date with 'origin/master'.

>nothing to commit, working directory clean

The output tells us two things:

1. On branch master – this tells us that Git is on the master branch. You've got a description of a branch on your terms sheet so this is the "master" branch (which is the default branch). 
2. Your branch is up-to-date with 'origin/master'. – Because git clone was used to copy this repository from another computer, this is telling us if our project is in sync with the one we copied from. We won't be dealing with the project on the other computer, so this line can be ignored.
3. nothing to commit, working directory clean – this is saying that there are no pending changes.
Explanation Of Git Status In A New Repo
```bash
$ git status
On branch master
Initial commit
nothing to commit (create/copy files and use "git add" to track)
```

##Review a Repo’s History

<学习一下两个命令：<br>
**git log**，**git show**

###git log
<br>git log命令用于显示版本库的所有提交。

默认情况下，此命令显示：**SHA**、**作者**、**日期** 和 **消息**。如下图所示：

<dir align="center">
![git log](../img/blog/git-log.png)
<center class="cap"><caption>图2 git log输出信息</caption></center>    
</dir>

学习一个新的命令：

```bash
$ git log --oneline
```

git log --online这个命令：

1. 列出每行一个提交
2. 显示提交的SHA的前7个字符
3. 显示提交的消息

```bash
$ git log –stat
```

git log –stat这个命令：

1. 显示已修改的文件
2. 显示已添加/删除的行数
3. 显示已添加/删除的行总数和已修改文件数的总数目的摘要行

```bash
$ git log -p
```

The git log command has a flag that can be used to display the actual changes made to a file. The flag is --patch which can be shortened to just -p:

```bash
$ git log -p
```

git log -p命令用于显示对文件所做的实际更改。

1. 显示已修改的文件
2. 显示已添加/删除的行的位置
3. 显示所做的实际更改

### git show
<br>
```bash
$ git show
```

git show它只会显示最近的提交。通常，提供SHA作为参数：

```bash
$ git show fdf5493
```

git show命令只显示一个提交。

git show命令的输出与git log -p命令输出完全相同。所以默认情况下，git show显示：

1. 提交
2. 作者日期
3. 提交消息
4. 补丁信息
4. Add Commits To A Repo

##介绍三个命令：git add，git commit，git diff

###git add

<br>git add命令用于将文件从工作目录添加到分段索引。

```bash
$ git add <file1> <file2> ... <fileN>
```

这个命令：

1. 采用空格分隔的文件名列表
2. 或者，.可以使用代替文件列表来告诉Git添加当前目录（和所有嵌套文件）

###git commit

<br>一般情况下，只输入`git commit`指令，将会弹出没有设置编辑器路径等类似的错误信息。因此需要在第1节中配置时添加上默认的编辑器路径或者链接。

```bash
$ git config --global core.editor <your-editor's-config-went-here>
```

接下来，如果要提交时，就会弹出编辑器窗口，在里面添加提交信息，保存并关闭，即可提交上去。

```bash
git commit -m “xxxx”
```

这条命令绕过了编辑器。如果您正在撰写的提交消息很短，并且您不想等待代码编辑器打开再输入，可以使用-m标志直接在命令行中传递消息。
比如：

```bash
$ git commit -m "Initial commit"
```

输入完成后，可以通过git log命令查看提交信息。

###git diff

<br>git diff命令的作用是比较两次提交之间的差距，比如改变了那些内容，添加或者删除那些文件。一般配合git log使用。

比如下面一个例子：

首先利用git log查看一下提交的历史记录。

<dir align="center">
    ![打印提交历史](../img/blog/print-commit-log.png)
    <center class="cap"><caption>图3 打印提交历史</caption></center>
</dir>

然后使用git diff查看两次提交之间的不同。使用方法：git diff SHA1 SHA2，一般情况下给出SHA的前7位就可以了。

```bash
git diff 9aab8ce 60113d2
```

最后的输出结果为：

<dir align="center">
    ![打印两次提交的差异](../img/blog/print-2-diff.png)
    <center class="cap"><caption>图4 打印出两次提交的差异</caption></center>
</dir>


###Having Git Ignore Files

<br>
上面提到了git add如何快速的添加文件，比如使用.来代替添加当前目录。但这样会存在一个问题，就是这样会把自己不想添加的文件也添加了进去。那么该如何避免添加或者如何自动化地将其忽略掉，就算添加上去，如何移除掉等等。这就是本节要学习的目标。

假设将Word文档添加到存储项目的目录中，但不希望将其添加到存储（repo）库。 Git会看到这个新文件，所以当运行git status命令，Word文档会显示在文件列表中。


<dir align="center">
    ![打印git status结果](../img/blog/git-status-print.png)
    <center class="cap"><caption>图5 终端应用程序显示git status命令的输出。输出显示Word文档，位于Git的“未跟踪文件”部分。</caption></center>
</dir>

git add .会添加本地目录下所有文件，因此Word文档可能会提交到存储库。<br>
如果要将文件保存在项目的目录结构中，但是要确保文件不会意外地提交到项目中，因此我们可以使用特殊命名文件.gitignore（注意前面的点和文件名称，重要！）。将该文件添加到与.git目录所在目录相同的目录中（项目的顶级目录）。我们需要做的就是列出我们希望Git忽略（不跟踪）的文件的名称，Git将忽略这些文件。<br>
在.gitignore文件中添加以下行：

```shell
*.doc
*.docx
```

接下来再运行git status命令。

<dir align="center">
    ![重新打印git status](../img/blog/git-print-untracked-files.png)
    <center class="cap"><caption>图6 终端显示git status的输出。 Word文档不再列为未跟踪的文件。但是，列出了新的未跟踪文件“.gitignore”。</caption></center>
</dir>

通配符可以匹配某种模式或者字符。常用到的通配符如下所示。

- blank lines can be used for spacing
- \# - marks line as a comment
- matches 0 or more characters
- ? - matches 1 character
- [abc] - matches a, b, or c
- \*\* - matches nested directories - a/\*\*/z matches
    - a/z
    - a/b/z
    - a/b/c/z

总结：**.gitignore** 文件用于告诉Git不应该跟踪的文件。该文件应放在.git目录所在的目录中。

##Tagging, Branching, and Merging

需要学习四个命令：git tag, git branch, git checkout, git merge.作用如表1所示。
<center class="cap">
    <caption>表1 功能</caption>
</center>
<table class="table table-condensed">
<tbody>
<tr>
<td style="text-align: center;" valign="top" width="128">git tag</td>
<td valign="top" width="128">Add tag to specific commits.</td>
</tr>
<tr>
<td style="text-align: center;" valign="top" width="128">git branch</td>
<td valign="top" width="128">Allow multiple lines of development.</td>

</tr>
<tr>
<td style="text-align: center;" valign="top" width="128">git checkout</td>
<td valign="top" width="128">Switch between different branches and tags.</td>
</tr>
<tr>
<td style="text-align: center;" valign="top" width="128">git merge</td>
<td valign="top" width="128">Combine changes on different banches.</td>
</tr>
</tbody>
</table>


###git tag

<br>
用于与存储库标签交互的命令是git tag命令：

```bash
$ git tag -a v1.0
```

这将打开代码编辑器，等待提供给标签的消息。
<center>
![等待输入消息](../img/blog/git-wait-input.png)
<center class="cap"><caption>图7 等待输入消息</caption></center>
</center>
 
保存并退出编辑器后，终端上不显示任何内容。输入`git tag`，它将显示repo中的所有标签。
 
 <div align="center">
    ![打印所有标签](../img/blog/git-print-all-tags.png)
    <center class="cap"><caption>图8 所有标签</caption></center>
</div>
 
`git log`是一个非常强大的命令，它检查repo的所有提交。`--decorate`标志显示隐藏在默认视图中的一些细节。

###git branch

<br>
`git branch`命令主要用来生成项目分支的。用于与Git的分支进行交互.

1. 列出存储库中的所有分支名称
2. 创建新的分支机构
3. 删除分支

如果仅仅是git branch命令，控制台将输出当前的仓库中有哪些分支和当前位于哪一个分支上。比如
 <div align="center">
    ![git branch的输出结果](../img/blog/git-print-branches.png)
    <center class="cap"><caption>
图9 git branch的输出结果，结果表明当前只有master分支，并且当前位于master分支。
</caption></center>
</div>
 
要创建一个分支，您只需使用git branch，并且提供分支的名称。所以如果你想要创建一个叫做“dev”的分支，你可以运行这个命令：

```bash
git branch dev
```

记住，当提交完所有的程序之后，它会将增加到当前的分支上。所以即使你创建了新的分支dev，，也不会添加新的提交到dev上，因为我们没有切换到dev分支上。如果你现在增加了一个新的提交，那么该提交将被添加到主分支（master）上，而不是dev分支。如果要在分支之间切换，你需要使用Git的`checkout`命令。

```bash
git checkout dev
```

1. 从Git正在跟踪的工作目录中删除所有文件和目录.（Git跟踪文件将被存储在存储库中，所以没有丢失）
2. 进入存储库并拉出对应分支所指向的所有文件和目录

因此，这将删除主分支中提交的所有文件。它将用dev分支中的提交的文件替换它们。

一个分支用于开发或对原有项目打补丁但不会影响原有的项目（因为更改是在分支上进行的）。一旦你在分支上进行更改，你可以将该分支合并到主分支中

现在分支的变更已经合并，您可能不再需要这个分支了。所以如果要删除这个分支，则可以使用-d标志。下面的命令包括-d标志，它提供给Git所要删除的分支名字（在这种情况下是“dev”分支）。

```bash
git branch -d dev
```

有一点需要注意的是，不能删除你当前所在的分支。因此，为了删除dev分支，你必须切换到主分支或创建新的分支并切换到新分支上进行删除操作。


Git Branch Recap
To recap, the git branch command is used to manage branches in Git:

```bash
# to list all branches

$ git branch

# to create a new "dev" branch
$ git branch dev

# to delete the "dev" branch
$ git branch -d dev
```

上面的命令主要说明：

1. 列出本地所有分支
2. 创建新的分支
3. 删除分支

###git merge

<br>
请记住，主题分支（如dev）的目的是允许你进行更改内容但不影响master主分支。对当前所在分支进行更改后，你可以删除该分支，或者决定要保留所在分支上的更改，并将其与另一个分支进行组合。将分支结合在一起的操作称为合并（merging）。

Git可以自动地把不同分支上的更改合并在一起。这种分支之间的合并操作使得Git变得非常强大。你可以对分支进行不同程度地修改，然后只需使用Git将这些更改组合在一起。


The Merge Command
The git merge command is used to combine Git branches:

```bash
$ git merge <name-of-branch-to-merge-in>
```

When a merge happens, Git will:

1. look at the branches that it's going to merge
2. look back along the branch's history to find a single commit that both branches have in their commit history
3. combine the lines of code that were changed on the separate branches together
4. makes a commit to record the merge

要在dev分支中合并，请确保在（master）主分支上运行：

```bash
$ git merge dev
```

因为这结合了两个不同的分支，将会做出一个承诺。当提交时，需要提供提交消息。由于这是一个合并提交，因此已经提供了一个默认消息。你可以根据需要更改消息，但常见的做法是使用默认的合并提交消息。所以当您的代码编辑器打开消息时，只需再次关闭它并接受该提交消息。
  <div align="center">
    ![git merge 的输出结果](../img/blog/git-merge-print.png)
    <center class="cap"><caption>图10 常规的git merge操作</caption></center>
</div>


  <div align="center">
    ![出现conflicts](../img/blog/git-occur-conficts.png)
    <center class="cap"><caption>图11 出现conflicts，操作是git commit -a，打开默认的代码编辑器，然后关闭即可，即选择默认的commit message
</caption></center>
</div>


Merge Recap

To recap, the git merge command is used to combine branches in Git:

```bash
$ git merge <other-branch>
```

There are two types of merges:

1. Fast-forward merge – the branch being merged in must be ahead of the checked out branch. The checked out branch's pointer will just be moved forward to point to the same commit as the other branch.
2. the regular type of merge
3. two divergent branches are combined
4. a merge commit is created

###Merge Conflicts

<br>
多数情况下，Git可以将分支合并在一起，完全没有任何问题。但是，有一些合并无法自动完全执行。将合并失败的情况称为合并冲突。
如果确实发生合并冲突，Git会尝试尽可能多地合并（就是尽量合并一些文件或目录），但是没有完成合并的则会留下特殊的标记（例如\>\>\>和<<<），告诉你哪些部分需要你手动修复。

**那些情况会导致合并冲突?**

我们都知道，Git会跟踪文件中的行。当完全相同的行在单独的分支中更改时，会发生合并冲突。例如，如果您使用dev的分支，并将README.md的标题更改为“About Me”，然后在另一个分支上，并将标题更改为“Information About Me”，Git应选择哪个标题？你已经改变了两个分支中的README.md的标题，所以Git没有办法知道你实际想要保留哪一个。而且肯定不会随便选择其中一个进行合并！你可以强制合并冲突，以便可以解决冲突。

请记住，当Git不确定要从正在合并的分支中使用哪一行作为最终的合并对象时，会发生合并冲突。所以你需要在两个不同的分支上编辑同一行，然后尝试合并它们。

Merge Conflict Recap

A merge conflict happens when the same line or lines have been changed on different branches that are being merged. Git will pause mid-merge telling you that there is a conflict and will tell you in what file or files the conflict occurred. To resolve the conflict in a file:

1. locate and remove all lines with merge conflict indicators
2. determine what to keep
3. save the file(s)
4. stage the file(s)
5. make a commit

<div class="padding_right">Be careful that a file might have merge conflicts in multiple parts of the file, so make sure you check the entire file for merge conflict indicators - a quick search for <<< should help you locate all of them.</div>

##Undoing Changes

需要学习3个命令，git commit –amend，git revert， git reset，具体的作用如表2所示。
<center class="cap">
    <caption>表2 功能</caption>
</center>
<table class="table table-condensed">
<tbody>
<tr>
<td style="text-align: center;" valign="top" width="128">git commit --amend </td>
<td valign="top" width="128">Alter the most-recent(Last) commit</td>
</tr>
<tr>
<td style="text-align: center;" valign="top" width="128">git revert xxxxxxx</td>
<td valign="top" width="128">Reverses given commit.</td>

</tr>
<tr>
<td style="text-align: center;" valign="top" width="128">git reset</td>
<td valign="top" width="128">Erases commits</td>
</tr>
</tbody>
</table>

 
###git commit --amend

<br>假设你已经使用`git commit`命令进行了大量的提交。现在使用`--amend`标志，可以更改最近的一次提交。

```bash
$ git commit –amend
```

如果您的工作目录很干净（意味着存储库中没有任何未提交的更改信息），那么运行git commit --amend将要求你提供一个新的提交消息。此时代码编辑器将打开并显示原始提交消息。你只需要增加内容或完全重写消息！然后保存并关闭编辑器以确定新的提交消息。

###git revert

<br>
当你告诉Git要还原一个特定的提交时，Git会改变上次提交的内容，并且完全相反操作。

举个例子，如果在提交A中添加了一个字符，如果像回溯上次提交A，那么Git将会把提交A中的字符进行删除并进行一次新的提交。它也可以以另一种方式工作，如果一个字符/行被删除，然后还原该提交以添加已删除的内容！

```bash
$ git revert <SHA-of-commit-to-revert>
```

`<SHA-of-commit-to-revert>`表示要回溯提交的ID哈希值（7位）。

Revert Recap

To recap, the git revert command is used to reverse a previously made commit:

```bash
$ git revert <SHA-of-commit-to-revert>
```

This command:

1. will undo the changes that were made by the provided commit
2. creates a new commit to record the change

### git reset


<br>reset可能似乎巧合地接近revert，但实际上是完全不同的。

- revert->恢复会创建一个新的提交，它会恢复或取消先前的提交。另一方面，
- reset->重置会擦除提交！
 
<div class="alert alert-danger" role="alert">
  重置十分危险<br>
你必须小心Git的重置功能。这是允许用户从存储库中删除提交的少数命令之一。如果提交不再在存储库中，则提交改变或添加删除的内容将不复存在。
</div>

但是，Git在完全擦除任何东西之前，会跟踪所有内容约30天。要访问此内容，您需要使用git reflog命令。查看这些链接了解更多信息：

- [git-reflog](https://git-scm.com/docs/git-reflog)
- [Rewriting History](https://www.atlassian.com/git/tutorials/rewriting-history)
- [reflog, your safety net](http://gitready.com/intermediate/2009/02/09/reflog-your-safety-net.html)

由于不经常使用，所以在这部分不做太多的陈述。[具体详见](https://github.com/geeeeeeeeek/git-recipes/wiki/2.6-%E5%9B%9E%E6%BB%9A%E9%94%99%E8%AF%AF%E7%9A%84%E4%BF%AE%E6%94%B9#git-reset)
