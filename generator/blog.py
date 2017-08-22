# -*- coding: utf-8 -*-
"""
Created on Sat Feb 21 03:13:22 2015

@author: Leo
"""

from paperplane import createBlog
#import os
#os.chdir("C:\Users\Furkan\Desktop\leo-blog\generator")

#Posts will be read from here
text_dir = "posts/*.md"

#Generated pages will be written here
blog_dir = "../blog/"

#Templates
index_template = 'blog_index_template.html'
blog_template = 'blog_post_template.html'

#Create the blog
createBlog(text_dir, blog_dir, blog_template, createIndexPage = True, index_template = index_template, subdir = "../")

#Turkish blog
text_dir = "posts_tr/*.md"
blog_dir = "../turkce-blog/"
index_template = 'blog_index_template_tr.html'
blog_template = 'blog_post_template_tr.html'
createBlog(text_dir, blog_dir, blog_template, createIndexPage = True, index_template = index_template, subdir = "../")
