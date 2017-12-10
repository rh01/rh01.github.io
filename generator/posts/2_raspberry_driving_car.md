Raspberry Self Driving Car Configuration First
2017-05-04
raspberry, self driving car
这篇教程整合了我的[rasp-driving-car]()上面Wiki的全部内容，这个是我本科毕业设计时做的毕业设计智能车的一个前期准备，包括树莓派上面得配置和PC上面得主要配置.
http://www.shenhengheng.xyz/img/blog/car.png
---

这篇教程整合了我的[rasp-driving-car]()上面Wiki的全部内容，这个是我本科毕业设计时做的毕业设计智能车的一个前期准备，包括树莓派上面得配置和PC上面得主要配置.

# 1 系统准备

## 1.1 商品清单

### 1.1.1 树莓派3 B+ 

 <div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/41632196.jpg"> <center class="cap"><caption>图1-1 树莓派3 B+正面</caption></center></div>

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/95921573.jpg"> <center class="cap"><caption>图1-2 树莓派3 B+侧面</caption></center></div> 

推荐购买渠道（链接）：[淘宝](https://item.taobao.com/item.htm?spm=a230r.1.14.29.bteq38&id=527576110046&ns=1&abbucket=5#detail)

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/46514326.jpg"> <center class="cap"><caption>图1-3 购买页（裸机）</caption></center></div> 

### 1.1.2 无线网卡（树莓派使用）

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/38500109.jpg"> <center class="cap"><caption>图1-4 树莓派专用无线网卡</caption></center></div> 

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/22048837.jpg"> <center class="cap"><caption>图1-5 购买页（无线网卡）</caption></center></div> 


推荐购买渠道（链接）：[淘宝](https://item.taobao.com/item.htm?spm=a230r.1.14.25.xxFdXt&id=22921464431&ns=1&abbucket=5#detail)

### 1.1.3 树莓派摄像头模块（建议）

树莓派摄像头模块在项目中使用到，但后期发现树莓派摄像头模块可以用普通的USB摄像头代替。（可选，建议购买，帧稳定）

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/58224994.jpg"> <center class="cap"><caption>图1-6 购买页（摄像头模块）</caption></center></div> 


推荐购买渠道（链接）：[淘宝](https://item.taobao.com/item.htm?spm=a1z09.2.0.0.HTGZE3&id=530162749946&_u=q1tnd988d6dd)

### 1.1.4 内存卡（不建议网上购买） 

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/95832767.jpg"> <center class="cap"><caption>图1-7 购买页（TF小卡）</caption></center></div> 


16G够用。推荐电子商店购买，淘宝购买渠道（链接）：[淘宝](https://item.taobao.com/item.htm?spm=a1z10.5-c.w4002-3106558063.18.no9fXs&id=524240381982)

### 1.1.5 其他 

比如还需要准备的材料有数据线（USB数据线 -> 安卓数据线），读卡器，电源（有充电宝用充电宝代替）。

## 1.2 烧录树莓派

### 1.2.1 软件准备


1）win32diskimager（开源软件）：[下载地址](https://sourceforge.net/projects/win32diskimager/)

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/90096130.jpg"> <center class="cap"><caption>图1-8 软件打开之后的样子</caption></center></div> 



2）树莓派系统（很多，这里选择 **RASPBIAN** ）：[下载地址](https://downloads.raspberrypi.org/raspbian_latest)

### 1.2.2 步骤

1）打开win32diskimager -> 选中下载后的树莓派系统镜像文件 -> 设备选择你的读卡器（盘符）


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/98990068.jpg"> <center class="cap"><caption>图1-9 选中镜像和设备</caption></center></div> 


2）点击写入按钮，将会对设备进行写入

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/9111544.jpg"> <center class="cap"><caption>图1-10 对设备进行写入操作</caption></center></div> 


3）写入完成后 -> 对刷入的系统进行测试 -> 将内存卡插入在树莓派上并试图点亮树莓派。（点亮即成功）

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/43763363.jpg"> <center class="cap"><caption>图1-11 设备写入成功</caption></center></div> 


通过上图所示，树莓派的连接方式如下图。正常的点亮方式是红灯信号灯常亮，绿色信号灯闪烁。

**NOTE**：但最新的RASPBIAN系统默认刷入系统时不支持SSH服务，也就是说为了安全起见，树莓派不支持直接通过SSH登录，需要连接显示器来打开SSH服务，才能进行远程登录。

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/23827259.jpg"> <center class="cap"><caption>图1-12 连接方式</caption></center></div> 




# 2 首次登陆系统进行必要的配置

## 2.1 必要的商品清单

### 2.1.1 hdmi转vga转接头（可选）

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/24679462.jpg"> <center class="cap"><caption>图2-1 购买页（hdml转vga转接头）</caption></center></div> 

淘宝购买渠道（链接）：淘宝

### 2.1.2 其他

需要网线一根，台式电脑显示器（配有连接线）


## 2.2 登录系统（不使用外接显示器）

使用外接显示器相对比较简单，在这里省略不写。

从11月开始，SSH服务被禁用。所以我们通过在BOOT磁盘（也就是你的内存卡）的`/mnt /sdc1 /`文件夹中创建一个名为ssh的空文件来启用它。（即`/mnt/sdc1/ssh`）。

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/86547073.jpg"> <center class="cap"><caption>图2-2 在内存卡的根目录下创建一个空的文件ssh</caption></center></div> 

这样的话，SSH服务被启用了，节省了很多不必要的资源。通过网线连接到路由器上，组成局域网，查看路由器的管理界面找到树莓派的IP地址。如图所示。

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/81964379.jpg"> <center class="cap"><caption>图2-3 查看路由器管理，找到树莓派的IP地址</caption></center></div> 


找到IP之后，就可以在电脑端打开SSH客户端Putty，XShell，SecureCRT，以下按照XShell客户端测试。

1. 打开XShell，并输入

```bash
ssh pi@192.168.1.44
```

格式为`ssh user@ip`，并输入密码，默认密码：`raspberry`

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/63300525.jpg"> <center class="cap"><caption>图2-4 登录界面</caption></center></div> 



2. 启用Picamera模块

```bash
sudo raspi-config
```

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/46994547.jpg"> <center class="cap"><caption></caption></center></div> 


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/81507310.jpg"> <center class="cap"><caption></caption></center></div> 


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/16449337.jpg"> <center class="cap"><caption></caption></center></div> 


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/28061408.jpg"> <center class="cap"><caption></caption></center></div> 


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/12296483.jpg"> <center class="cap"><caption></caption></center></div> 


完成后，测试摄像头是否成功启用。（拍摄一张照片和拍摄一段视频）

```bash
raspistill -t 1 -o img.jpg
raspivid -o video.h264
```

3. 手动连接wifi

```bash
sudo vi /etc/wpa_supplicant/wpa_supplicant.conf
```

文件的内容如下：

```text
country=GB
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="Netcore"
    key_mgmt=WPA-PSK
    psk="327327327"
}
```

然后重新启用wlan0

```bash
sudo ifdown wlan0
sudo ifup wlan0
```

此时查看wlan0分配的IP地址：

```bash
ifconfig
```

此时就可以拔掉网线，就可以用无线网卡连路由进行通信。

4. 更新和升级软件

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 2.3 额外的技巧

一般情况下，为了好记，我经常利用DNS解析服务将我的域名解析为我的树莓派的ip地址，十分方便。

# 3 配置AP

## 3.1 配置流程

### 3.1.1 必需的包

1. hostapd
2. dnsmasq

```bash
sudo apt-get install dnsmasq hostapd
```

### 3.1.2 配置网卡

将wlan1（购买的网卡）配置一个静态IP地址, 首先告诉树莓派DHCP获取IP时忽略WLAN1

```bash
sudo nano /etc/dhcpcd.conf
```

在文件的最后添加：

```text
denyinterfaces wlan1  
```

配置静态IP

```bash
sudo nano /etc/network/interfaces
```

文件内容如下：

```text
allow-hotplug wlan1  
iface wlan1 inet static  
    address 172.24.1.1
    netmask 255.255.255.0
    network 172.24.1.0
    broadcast 172.24.1.255
#    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

重启DHCP服务。

```bash
sudo apt-get install dhcpcd5 #如果没有这个服务
sudo service dhcpcd restart
```

然后重启WLAN1设备以适应配置

```bash
sudo ifdown wlan1; sudo ifup wlan1
```

### 3.1.3 配置HOSTAPD文件

```text
sudo nano /etc/hostapd/hostapd.conf
```

内容是：

```text
# This is the name of the WiFi interface we configured above
interface=wlan1

# Use the nl80211 driver with the brcmfmac driver
driver=nl80211

# This is the name of the network
ssid=Pi3-AP

# Use the 2.4GHz band
hw_mode=g

# Use channel 6
channel=6

# Enable 802.11n
ieee80211n=1

# Enable WMM
wmm_enabled=1

# Enable 40MHz channels with 20ns guard interval
ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]

# Accept all MAC addresses
macaddr_acl=0

# Use WPA authentication
auth_algs=1

# Require clients to know the network name
ignore_broadcast_ssid=0

# Use WPA2
wpa=2

# Use a pre-shared key
wpa_key_mgmt=WPA-PSK

# The network passphrase
wpa_passphrase=123456789

# Use AES, instead of TKIP
rsn_pairwise=CCMP
```

检查配置是否起作用：

```bash
sudo /usr/sbin/hostapd /etc/hostapd/hostapd.conf
```

如果成功，则会在你的移动设备上（智能手机）上检测到Pi3-AP的路由。如果你尝试连接，则不会成功分配地址，因为还没有做完！

因为我们还需要告诉hostapd在启动时启动时查找配置文件。使用

```bash
sudo nano /etc/default/hostapd
```

打开默认配置文件，找到该行

```text
#DAEMON_CONF=""
```

并且用下面这行替换掉

```text
DAEMON_CONF="/etc/hostapd/hostapd.conf".
```

### 3.1.4 配置DNSMASQ

```bash
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig  
sudo nano /etc/dnsmasq.conf  
```

将下面的内容粘贴上去：

```text
interface=wlan1      # Use interface wlan0  
listen-address=172.24.1.1 # Explicitly specify the address to listen on  
bind-interfaces      # Bind to the interface to make sure we aren't sending things elsewhere  
server=8.8.8.8       # Forward DNS requests to Google DNS  
domain-needed        # Don't forward short names  
bogus-priv           # Never forward addresses in the non-routed address spaces.  
dhcp-range=172.24.1.50,172.24.1.150,12h # Assign IP addresses between 172.24.1.50 and 172.24.1.150 with a 12 hour lease time
```

### 3.1.5 建立IPV4 转发

```bash
sudo nano /etc/sysctl.conf
```

去掉

```bash
#net.ipv4.ip_forward=1
```

前面的#

```bash
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```

上面这条命令是立即激活转发！

还需要通过在wlan0接口和wlan1接口之间配置NAT来分享Pi的互联网连接到我们通过WiFi连接的设备。可以使用以下命令来执行此操作：

```bash
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE  
sudo iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT  
sudo iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT
```

但是，我们需要在每次重新启动Pi时应用这些规则，运行下面的命令

```bash
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
```

为了避免每次重启都需要运行该命令，打开 

```bash
sudo nano /etc/rc.local
```

在exit 0前添加一行

```
iptables-restore < /etc/iptables.ipv4.nat  
```

### 3.1.6 我们已经完成了

```bash
sudo service hostapd start  
sudo service dnsmasq start  
```

## 3.2 注意事项

1. 树莓派3和树莓派2的配置过程是不一样的，上面的配置过程仅适用于树莓派3.
2. 上面的配置是WLAN1做AP，WLAN0将数据流转发给WLAN1的，那么转发也可以做以太网和wlan0转发，以太网和wlan1转发。过程类似。
3. 为了激活，必须重启！


# 4 搭建OpenCV3环境

## 4.1 扩大文件系统

由于编译安装OpenCV需要的空间很大，所以应该做的第一件事是扩展文件系统，以包括micro-SD卡上的所有可用空间：

```bash
sudo raspi-config
```


<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/6380903.jpg"> <center class="cap"><caption></caption></center></div> 

<div align="center"><img src="http://olrs8j04a.bkt.clouddn.com/17-12-10/85376892.jpg"> <center class="cap"><caption>图4-1 扩展文件系统</caption></center></div> 


## 4.2 安装依赖

```bash
sudo apt-get install build-essential cmake pkg-config -y
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev -y

sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev -y 
sudo apt-get install libxvidcore-dev libx264-dev -y
sudo apt-get install libgtk2.0-dev -y
sudo apt-get install libatlas-base-dev gfortran -y 
sudo apt-get install python2.7-dev python3-dev -y
```

## 4.3 下载OpenCV源代码

```bash
cd ~
wget -O opencv.zip https://github.com/Itseez/opencv/archive/3.1.0.zip
unzip opencv.zip
```

OpenCV 3.1.0 地址：https://github.com/Itseez/opencv_contrib/archive/3.1.0.zip

```bash
wget -O opencv_contrib.zip https://github.com/Itseez/opencv_contrib/archive/3.1.0.zip
unzip opencv_contrib.zip
```

## 4.4 Python2.7还是Python3.5 


1. pip包管理器

```bash
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py

sudo pip install virtualenv virtualenvwrapper
sudo rm -rf ~/.cache/pip

# virtualenv and virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

echo -e "\n# virtualenv and virtualenvwrapper" >> ~/.profile
echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.profile
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.profile

source ~/.profile
```

### 4.4.1 安装Numpy


```bash
pip install numpy
```

如果正在为Python 2.7编译OpenCV 3，请确保Python 2部分包含Interpreter ，Libraries ，numpy和packages path ：


## 4.5 编译安装OpenCV


```bash
cd ~/opencv-3.1.0/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-3.1.0/modules \
    -D BUILD_EXAMPLES=ON ..


make -j4
```

很容易出错，因为树莓派不一定CPU的资源不一定够用，使用

```bash
make clean
make

sudo make install
sudo ldconfig
```

然后检查是否存在层`cv2.so`或者`cv2.cpython-34m.so`：

对于Python27说，

```bash
ls -l /usr/local/lib/python2.7/site-packages/
```

如果存在，则说明在python2的环境下能够使用OpenCV。

对于Python3.4说：

```bash
ls -l /usr/local/lib/python3.4/site-packages/
```
如果存在，则表明在Python3的环境下能够使用OpenCV

但是对于Python3说需要将`cv2.cpython-34m.so`重命名为`cv2.so`才能使用。

安装完成后，需要将编译生成的文件和解压后的文件删除。

```bash
rm -rf opencv-3.1.0 opencv_contrib-3.1.0
```


# 5 搭建机器学习与深度学习环境

## 5.1 搭建TensoFlow环境

1）下载并安装

```bash
# For Python 2.7
wget https://github.com/samjabrahams/tensorflow-on-raspberry-pi/releases/download/v1.1.0/tensorflow-
1.1.0-cp27-none-linux_armv7l.whl
sudo pip install tensorflow-1.1.0-cp27-none-linux_armv7l.whl
```

```bash
# For Python 3.4
wget https://github.com/samjabrahams/tensorflow-on-raspberry-pi/releases/download/v1.1.0/tensorflow-
1.1.0-cp34-cp34m-linux_armv7l.whl
sudo pip3 install tensorflow-1.1.0-cp34-cp34m-linux_armv7l.whl
```

由于国内的网络原因，因此会出现403。为了避免这种事情的发生，我提前下载好了并放在了七牛云上。

- python2：http://olxgfquub.bkt.clouddn.com/tensorflow-1.1.0-cp27-none-linux_armv7l.whl
- python3：http://olxgfquub.bkt.clouddn.com/tensorflow-1.1.0-cp34-cp34m-linux_armv7l.whl

2）重装mock库

```bash
# For Python 2.7
sudo pip uninstall mock
sudo pip install mock
```
```bash
# For Python 3.3+
sudo pip3 uninstall mock
sudo pip3 install mock
```

## 5.2 安装keras

```bash
sudo pip install keras
```

# 参考文献
[1] https://caffinc.github.io/2016/12/raspberry-pi-3-headless/[Z].: 2017.

[2] Frillip. https://frillip.com/using-your-raspberry-pi-3-as-a-wifi-access-point-with-hostapd/[Z]. 
2017: 2017.

[3] Pyimagesearch. www.pyimagesearch.com/2016/04/18/install-guide-raspberry-pi-3-raspbian-jessie-opencv- 3/[Z]. 2017: 2017.

[4] Samjabrahams. https://github.com/samjabrahams/tensorflow-on-raspberry-pi[Z]. 2017: 2017.

[5] https://raspberrypi.stackexchange.com/questions/10251/prepare-sd-card-for-wifi-on-headless-pi[Z]. 2017: 2017.

[6] https://github.com/hypriot/blog/issues/60[Z]. 2017: 2017.

[7] https://github.com/hypriot/image-builder-rpi/releases[Z]. 2017: 2017.
