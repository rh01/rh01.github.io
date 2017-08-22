# -*- coding: utf-8 -*-
"""
Created on Sat Feb 21 03:13:22 2015

@author: Leo
"""
from jinja2 import Environment, FileSystemLoader
import xml.etree.ElementTree as ET
import os

#os.chdir("C:\Users\Furkan\Desktop\leo-blog\generator")

#parse XML
tree = ET.parse('projects.xml')
root = tree.getroot()

#parse template
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
env = Environment(loader=FileSystemLoader(THIS_DIR))
template = env.get_template('projects_template.html')
html_file =  template.render(projects = root.findall('project'))

#write HTML file
f = open("../projects.html",'w')
f.write(html_file.encode('utf8'))
f.close()
