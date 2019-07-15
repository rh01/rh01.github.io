Deploy a very small microservice on Raspberrypi kubernetes
2019-03-01
kubernetes,microservice,raspberrypi,k8s,gRPC
最近一直在如何将微服务部署在我的边缘机器上（树莓派），通过kubernetes管理。然后就开始了今天的项目成果，为此特别对此总结。
https://www.shenhengheng.xyz/img/thumbs/k8s+pis.jpg
===
## 0x00 动机 

最近一直在如何将微服务部署在我的边缘机器上（树莓派），通过kubernetes管理。然后就开始了今天的项目成果，为此特别对此总结。

本次的微服务我使用的golang，主要因为golang的天然适合开发云端服务的特性并且golang的轻便，包的管理方便等特点。并且golang的docker镜像稍微小，占用空间小。

那么下面就开始吧，本次的环境主要分为两台机器，分别我的本地计算机（这里使用的Mac），另外就是我需要部署的环境（有三个树莓派节点组成的kubernetes集群）。

这里你需要：

- 熟悉go语言
- 熟悉微服务
- 熟悉Docker
- 熟悉kubernetes的部署与基本管理任务
- 熟悉Linux

本章主要参考了下面的文章：

- [边缘智能-在树莓派上部署kubernetes集群](https://41sh.cn/?id=16)
- https://github.com/rh01/deploy-golang-applicaton-on-kubernetes
- https://github.com/rh01/traefik-for-pi
- https://zhuanlan.zhihu.com/p/33813413

## 0x01 编写golang的应用 

**本小节全部在我们本地的计算机中做的！**

在本地创建项目文件夹goappk8s，并且将该文件夹设置成临时的 GOPATH环境变量的Value值。

```bash
$ mkdir -pv k8sapp/src
$ export GOPATH=/User/rh01/k8sapp/
```

然后在**src**目录下面添加 golang 代码：

```bash
$ mkdir -pv github.com/rh01/goappk8s && cd github.com/rh01/goappk8s
$ cat << EOF >> main.go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()
    router.GET("/ping", func(c *gin.Context) {
        c.String(http.StatusOK, "PONG")
    })
    router.Run(":8080")
}
EOF
```

> 注：上面的代码取自 <https://github.com/cnych/goappk8s>
>
> 另外上面的代码主要是创建了一个微服务，主要实现PING的功能

可以看到上面的代码中，我们导入了第三方包 github.com/gin-gonic/gin，这时可以手动将该依赖包下载下来放置到**GOPATH**下面，这里使用了 **govendor** 来进行管理，当然你可以使用其他的包管理工具，比如：dep、glid或者利用go mod 等等。

在 **github.com/rh01/goappk8s** 目录下面执行下面的操作：

**如何安装 govendor：**

在Mac中可以使用brew工具或者使用下面的命令

```
$ go get -u github.com/kardianos/govendor
```

下面我们使用govendor来将依赖包缓存到本地项目中，方便移植和项目管理。

```bash
# 初始化本地项目文件夹为使用vendor管理包
$ govendor init
# 将依赖包缓存到本地
$ govendor fetch github.com/gin-gonic/gin
```

上面 fetch 需要设置代理才能通过，还是老办法：
```
$ export http_proxy="http://127.0.0.1:12333"
$ export https_proxy="http://127.0.0.1:12333"
```

这样一个非常小的微服务应用就做完了，这时需要测试一下，看看是否正常运行。这时切换到 **GOPARH** 文件夹。执行下面的语句

```bash
$ go install github.com/rh01/goappk8s && ./bin/goappk8s
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /ping                     --> main.main.func1 (3 handlers)
[GIN-debug] Listening and serving HTTP on :8080
```

这时会打印出如上面所示的日志信息，这时我们可以通过 curl 来访问。

```bash
$ curl localhost:8080/ping
PONG
```

这时我们的服务是已经正常可以运行的了。

## 0x02 打包成Docker镜像（使用ARM） 

这里主要使用了 Docker 的多阶段构建来打造一个非常小的镜像，这对我们的边缘端来讲，是非常必要的，因为他们的资源是非常有限的。

> 有关 Docker镜像的多阶段构建以及Docker镜像优化问题，请详见我之前的一篇文章：
>
> https://www.41sh.cn/?id=25

下面我们看一下Dockerfile文件吧。

```dockerfile
FROM golang AS build-env
ADD . /go/src/app
WORKDIR /go/src/app

ENV http_proxy http://192.168.1.9:12333
ENV https_proxy http://192.168.1.9:12333

RUN go get -u -v github.com/kardianos/govendor
RUN govendor sync
RUN GOOS=linux GOARCH=arm GOARM=7 go build -v -o /go/src/app/app-server


    
FROM armhf/alpine:latest
RUN apk add -U tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
COPY --from=build-env /go/src/app/app-server /usr/local/bin/app-server
EXPOSE 8080
CMD [ "app-server" ]
```

这里也参考了知乎的这片文章：<https://zhuanlan.zhihu.com/p/33813413>

主要修改如下：

1 增加了

```dockerfile
ENV http_proxy http://192.168.1.9:12333
ENV https_proxy http://192.168.1.9:12333
```

这是因为国内的网络环境，我们需要添加代理，才能拉取相关的依赖包

2  修改了

```
RUN GOOS=linux GOARCH=arm GOARM=7 go build -v -o /go/src/app/app-server
```

这是因为我们需要在树莓派 arm架构下去编译和运行golang程序，因此需要交叉编译。

3 修改了

```
FROM armhf/alpine:latest
```

这个也是因为硬件架构的不同进行相应的修改



然后构建`Docker`镜像：

```bash
$ docker build -t rh02/goappk8s:v1.0.0 .
.......(省略了)
Successfully built 00751f94d8a9
Successfully tagged cnych/goappk8s:v1.0.0
$ docker push rh02/goappk8s:v1.0.0
```

上面的操作可以将我们本地的镜像`rh02/goappk8s:v1.0.0`推送到公共的`dockerhub`上面去（前提是你得先注册了dockerhub）。

## 0x03 将服务部署在kubernetes 

如果要将微服务部署在kubernetes上，只需要写一个yaml文件，定义好你需要的资源对象即可，下面先给出我们的部署的yaml文件内容。

```yaml
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: goapp-deploy
  namespace: kube-apps
  labels:
    k8s-app: goappk8s
spec:
  replicas: 2
  revisionHistoryLimit: 10
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  template:
    metadata:
      labels:
        k8s-app: goappk8s
    spec:
      containers:
      - image: rh02/goappk8s:v1.1.0
        imagePullPolicy: Always
        name: goappk8s
        ports:
        - containerPort: 8080
          protocol: TCP
        resources:
          limits:
            cpu: 100m
            memory: 100Mi
          requests:
            cpu: 50m
            memory: 50Mi
        livenessProbe:
          tcpSocket:
            port: 8080
          initialDelaySeconds: 10
          timeoutSeconds: 3
        readinessProbe:
          httpGet:
            path: /ping
            port: 8080
          initialDelaySeconds: 10
          timeoutSeconds: 2

---
apiVersion: v1
kind: Service
metadata:
  name: goapp-svc
  namespace: kube-apps
  labels:
    k8s-app: goappk8s
spec:
  ports:
    - name: api
      port: 8080
      protocol: TCP
      targetPort: 8080
  selector:
    k8s-app: goappk8s

---
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: goapp-ingress
spec:
  rules:
  - host: k8sapp1.41sh.cn
    http:
      paths:
      - path: /
        backend:
          serviceName: goapp-svc
          servicePort: api
```

> 这里的k8sapp1.41sh.cn 需要解析为ingress的node。详细可以参考 https://github.com/rh01/traefik-for-pi

因为我们编写了一个无状态的应用，因此上面主要创建了三个资源对象，分别为deployment（部署），service（服务）和ingress（主要负责负载均衡和提供一种访问的方式）对象。

使用kubectl来创建这三个资源对象。

```bash
$ kubectl apply -f deployment.yaml
deployment "goapp-deploy" created
service "goapp-svc" created
ingress "goapp-ingress" created
```

这时我们需要创建一个traefik的ingress应用，用来处理ingress的请求。

```bash
$ kubectl label node edge-node2 ingress-controller=traefik 
$ kubectl apply -f traefik.yaml
```

## 0x04 尾声 

这时，我们都已经做完了，这时我们可以打开我们的dashboard看看怎么样。并且可以通过在浏览器中访问 <http://k8sapp1.41sh.cn/ping> 来访问我们的微服务。

下面是成果截图。

![屏幕快照 2019-03-01 下午3.03.48.png](https://www.41sh.cn/zb_users/upload/2019/03/201903011551423865486307.png)



![屏幕快照 2019-03-01 下午3.04.39.png](https://www.41sh.cn/zb_users/upload/2019/03/201903011551423899753911.png)