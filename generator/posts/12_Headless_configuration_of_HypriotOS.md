Headless Configuration of HypriotOS
2017-12-08
树莓派教程
本部分是headless HypriotOS 配置的介绍，如有纰漏，请与作者联系.
http://www.shenheng.xyz/img/thumbs/pi.png
===


# 安装HypriotOS

这个就不用再说了，非常简单的，可以参考我的之前文章，但是最近我在部落格里面发现，安装方法比较多，我在这里抛砖引玉，有以下安装方法:

- (win)Win32磁盘映像工具: <https://sourceforge.net/projects/win32diskimager>
- (win)工具： <https://www.raspberrypi.org/forums/viewtopic.php?t=195939>
- (linux)flash tools <http://www.jianshu.com/p/3e2a901e66b7>
- (linux)space.sh 看起来很牛x <https://rpi.sh/post/setup/>

# 重要：如何进行headless配置

先放出一堆参考链接：

- 推荐1：这个适用于RaspOS

<https://raspberrypi.stackexchange.com/questions/10251/prepare-sd-card-for-wifi-on-headless-pi>

- 推荐2： 虽然这个工单已经关闭了，但是还是有帮助的

<https://github.com/hypriot/blog/issues/60>

- 推荐3：官方 

<https://github.com/hypriot/image-builder-rpi/releases>

对于headless的配置，简化讲，就是一般情况下，我们安装好树莓派镜像后，开机十分麻烦，再说如果手头上没有显示器，那就惨了.

- 在根目录(其实就是网上说的/boot分区)，首先添加一个空文件ssh代表启用ssh服务，找个路由器，找根网线连到路由器上，然后进入路由器的管理界面，查看增加那些ip，这个ip很可能就是你的树莓派（一般情况下，都会说明主机名！）
- 上面的陈述还是较为简单的，但是如果这几样你如果少一样，都无法完成开机，那么headless就是我们想要的一种结果

因此，我们需要在开机之前，把所有的事全部搞定（启动ssh服务，启用网卡，连上无线），因此关于HypriotOS的headless配置这篇文章来说，我们在这里以它为例（特殊）！不同于官方镜像，他的headless配置相比较简单些.

<div align="center">
<img src="http://www.shenheng.xyz/img/posts/12/release.png" >
</div>

上图说的是，他们已经大大的简化了初始配置步骤，一个user-data文件就可以搞定！但是注意，你的镜像版本是否为HypriotOS v1.7.1

下面放出我的/boot/user-data文件

```typescript
# cloud-config

# vim: syntax=yaml

#

 

# The current versionof cloud-init in the Hypriot rpi-64 is 0.7.9

# When dealing withcloud-init, it is SUPER important to know the version

# I have wasted manyhours creating servers to find out the module I was trying to use wasn't in thecloud-init version I had

# Documentation:http://cloudinit.readthedocs.io/en/0.7.9/index.html

 

# Set your hostnamehere, the manage_etc_hosts will update the hosts file entries as well

hostname: black-pearl

manage_etc_hosts: true

 

# You could modify thisfor your own user information

users:

  - name: pirate

    gecos: "Hypriot Pirate"

    sudo: ALL=(ALL) NOPASSWD:ALL

    shell: /bin/bash

    groups: users,docker,video

    plain_text_passwd: hypriot

    lock_passwd: false

    ssh_pwauth: true

    chpasswd: { expire: false }

 

# # Set the locale ofthe system

# locale:"en_US.UTF-8"

 

# # Set the timezone

# # Value of 'timezone'must exist in /usr/share/zoneinfo

# timezone:"America/Los_Angeles"

 

# # Update apt packageson first boot

# package_update: true

# package_upgrade: true

#package_reboot_if_required: true

package_upgrade: false

 

# # Install anyadditional apt packages you need here

# packages:

#  - ntp

 

# WiFi connect toHotSpot

# - use wpa_passphraseSSID PASSWORD to encrypt the psk

write_files:

  - content: |

      allow-hotplug wlan0

      iface wlan0 inet dhcp

      wpa-conf/etc/wpa_supplicant/wpa_supplicant.conf

      iface default inet dhcp

    path: /etc/network/interfaces.d/wlan0

  - content: |

     ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev

      update_config=1

      network={

      ssid="Netcore"

      psk="327327327"

      proto=RSN

      key_mgmt=WPA-PSK

      pairwise=CCMP

      auth_alg=OPEN

      }

    path:/etc/wpa_supplicant/wpa_supplicant.conf

 

# These commands willbe ran once on first boot only

runcmd:

  # Pickup the hostname changes

  - 'systemctl restart avahi-daemon'

 

#  # Activate WiFi interface

- 'ifup wlan0'
```

# 接下来

接下来就等待连接你的Hotpot，连接成功后，打开你的shell，连接即可：

- hostname: black-pearl
- username: pirate
- password: hypriot



# 参考

[1] <https://raspberrypi.stackexchange.com/questions/10251/prepare-sd-card-for-wifi-on-headless-pi>

[2] <https://github.com/hypriot/blog/issues/60>

[3] <https://github.com/hypriot/image-builder-rpi/releases>
