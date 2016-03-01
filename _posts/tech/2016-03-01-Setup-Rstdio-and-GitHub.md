---
layout: post
title: R and Rstdio Condfigration
category: 技术
tags: RStudio,GitHuub
---

## Introduction

Version control has become essential for me keeping track of projects, as well as collaborating. It allows backup of scripts and easy collaboration on complex projects. RStudio works really well with Git, an open source open source distributed version control system, and GitHub, a web-based Git repository hosting service. I was always forget how to set up a repository, so here’s a reminder.


This example is done on [RStudio Server](https://www.rstudio.com/products/rstudio-server-pro/), but the same procedure can be used for [RStudio desktop](https://www.rstudio.com/products/rstudio/) . Git or similar needs to be installed first, which is straight forward to do.

## Setup Git on RStudio and Associate with GitHub

In RStudio, *Tools* -> *Version Control*, select Git.


In RStudio, *Tools* -> *Global Options*, select **Git//SVN** tab. Ensure the path to the Git executable is correct. This is particularly important in Windows where it may not default correctly (e.g. /usr/bin/git).

![options](../../../pic/1.png)

Now hit, *Create RSA Key* …

![create RSA key](../../../pic/2.png)

Close this window.

Click, *View public key*, and copy the displayed public key.

![copy public key](../../../pic/3.png)

If you haven’t already, create a [GitHub](www.github.com) account. Open your account settings and click the SSH keys tab. Click Add SSH key. Paste in the public key you have copied from RStudio.

![add SSH key](../../../pic/4.png)

Tell Git who you are. Remember Git is a piece of software running on your own computer. This is distinct to GitHub, which is the repository website. In RStudio, click *Tools* -> *Shell* … . Enter:

```
git config --global user.email "1048157315@qq.com"
git config --global user.name "rh01"
```

Use your GitHub username.

![10_who_are_you](../../../pic/5.png)



## Create New project AND git

In RStudio, click *New project* as normal. Click *New Directory*.

![7_new_project](../../../pic/6.jpg)

Name the project and check *Create a git repository*.

![8_new_project_with_git](../../../pic/7.jpg)

Now in RStudio, create a new script which you will add to your repository.

![9_test_script](../../../pic/8.jpg)


After saving your new script (test.R), it should appear in the Git tab on the Environment / history panel.

![11_initial_commit](../../../pic/9.jpg)

Click the file you wish to add, and the status should turn to a green ‘A’. Now click *Commit* and enter an identifying message in *Commit message*.

![12_inital_commit2](../../../pic/10.jpg)

You have now committed the current version of this file to your repository on your computer/server. In the future you may wish to create [branches](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) to organise your work and help when collaborating.

Now you want to push the contents of this commit to GitHub, so it is also backed-up off site and available to collaborators. In GitHub, create a New *repository*, called here *test*.

![5_create_git](../../../pic/11.jpg)


In RStudio, again click *Tools* -> *Shell* … . Enter:

```
git remote add origin https://github.com/rh01/test.git
git config remote.origin.url git@github.com:rh01/test.git
git pull -u origin master
git push -u origin master
```

![13_push_pull](../../../pic/12.jpg)

You have now pushed your commit to GitHub, and should be able to see your files in your GitHub account. The *Pull Push* buttons in RStudio will now also work. Remember, after each *Commit*, you have to Push to GitHub, this doesn’t happen automatically.

## Clone an existing GitHub project to new RStudio project
In RStudio, click New project as normal. Click Version Control.

![7_new_project](../../../pic/13.jpg)

In *Clone Git Repository*, enter the GitHub repository URL as per below. Change the project directory name if necessary.

![14_new_version_control](../../../pic/14.jpg)

In RStudio, again click *Tools* -> *Shell* … . Enter:

```
git config remote.origin.url git@github.com:rh01/test.git
```

---
