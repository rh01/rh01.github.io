# -*- coding: utf-8 -*-
"""
Created on Sat Feb 21 03:13:22 2015

@author: Leo
"""

import os, codecs, markdown
from jinja2 import Environment, FileSystemLoader

#read the markdown file
with open('homepage.md', 'r') as f:
	content = markdown.markdown(f.read(), ['markdown.extensions.extra'])

#load the template
template_dir = 'homepage_template.html'
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
env = Environment(loader=FileSystemLoader(THIS_DIR))
template = env.get_template(template_dir)
html_file =  template.render(content = content)

with open('../index.html', 'w') as f:
	f.write(html_file.encode('utf8'))