Deploy gRPC microservice on Raspberrypi kubernetes
2019-03-05
kubernetes,microservice,raspberrypi,k8s,gRPC
今天带着大家如何在树莓派kubernetes集群中部署微服务,这次文章和上次文章的区别就是这个涉及两个微服务,如何使两个微服务在kubernetes中实现服务之间的调用可能是与上次的不同之处,这次也使用Google的开源框架gRPC框架来加快微服务的开发.
https://www.shenhengheng.xyz/img/thumbs/k8s+grpc+pis.png
===

今天带着大家如何在树莓派kubernetes集群中部署微服务,这次文章和上次文章的区别就是这个涉及两个微服务,如何使两个微服务在kubernetes中实现服务之间的调用可能是与上次的不同之处,这次也使用Google的开源框架gRPC框架来加快微服务的开发.

本次教程需要准备:

- 一个启动好的树莓派kubernetes集群(参考: [边缘智能-在树莓派上部署kubernetes集群](https://41sh.cn/?id=16))
- protobuf工具(参考 https://github.com/google/protobuf,从release页下载对应的操作系统的版本即可)
- Docker (参考: https://docs.docker.com/engine/installation/)
- kubectl工具 (参考: https://kubernetes.io/docs/tasks/tools/install-kubectl/)

本次文章主要参考: 

- [Getting Started with Microservices using Go, gRPC and Kubernetes](https://outcrawl.com/getting-started-microservices-go-grpc-kubernetes)

代码:

- https://github.com/rh01/grpc-microservice-k8s

## 0x01 定义我们的protobuf文件 

protobuf是google的一个序列化结构化数据工具,它可以让人们定义好相关的结构,使用protoc工具自动生成对应的代码.类似的结构化工具还有thrift.

> 微服务:这里我主要实现一个最大公约数的功能,输入两个数值,返回这两个数的最大公约数.

这里既然使用gRPC来做,那么主要使用rpc来实现服务调用,因为rpc实现的是服务之间的同步调用，即客户端调用服务并等待响应。gRPC是提供RPC功能的框架之一。此时我们需要使用Protocol Buffer的接口定义语言中编写消息类型和服务的代码并进行编译。

下面就是我们使用protobuf语言定义的消息类型和服务.(具体参考: <https://grpc.io/docs/quickstart/go.html)>

```bash
$ mkdir -pv ~/go/src/github.com/rh01/mini-deploy-app/pb
$ cd ~/go/src/github.com/rh01/mini-deploy-app/pb
$ vim pb.proto
```

```yaml
syntax = "proto3"; // protobuf 版本

package pb;        // 代码生成的package名字

// 定义的请求消息体
message GCDRequest {
    uint64 a = 1;
    uint64 b = 2;
}

// 定义的响应消息体
message GCDResponse {
    uint64 result = 1;
}

// 调用的远程服务,这是client请求server端的远程计算服务
service GCDService {
    rpc Compute (GCDRequest) returns (GCDResponse) {}
}
```

接下来我们需要使用 protoc 生成对应的服务代码

```
$ protoc -I . --go_out=plugins=grpc:. ./*.proto
```

> 提前须知:
>
> 1. 执行上面的指令需要使用安装 grpc 和 proto-gen-go 工具,使用下面的命令:
>
> ```bash
> $ go get -u google.golang.org/grpc
> $ go get -u github.com/golang/protobuf/protoc-gen-go
> ```
>
> 2. 将 $GOPATH/bin 目录添加到PATH环境变量中
>
> ```bash
> $ export PATH=$PATH:$GOPATH/bin
> ```

这时应该生成了 gcd.pb.go 程序.

## 0x02 最大公约数服务 

### 定义服务端 

gcd 服务将会使用上一步生成的代码进行实现gcd计算服务.

```bash
$ cd ~/go/src/github.com/rh01/mini-deploy-app/
$ mkdir -p gcd
$ vim main.go
```

```go
package main

import (
    "log"
    "net"

    context "golang.org/x/net/context"

    pb "github.com/rh01/mini-deploy-app/pb"
    "google.golang.org/grpc"
    "google.golang.org/grpc/reflection"
)
```

在main函数中主要定义server结构,并将其注册为server端,用于处理 gcd 计算的请求.然后启动grpc服务.

```go
type server struct {
}

func main() {
    lis, err := net.Listen("tcp", ":3000")
    if err != nil {
        log.Fatalf("Failed to listen: %v", err)
    }
    s := grpc.NewServer()
    
    pb.RegisterGCDServiceServer(s, &server{})
    reflection.Register(s)
    if err := s.Serve(lis); err != nil {
        log.Fatalf("Failed to serve: %v", err)
    }
}
```

实现GCDServiceServer接口的 `Compute` 方法, server 结构对象的指针作为方法接受者.

```Go
// gcd.pb.go
// GCDServiceServer is the server API for GCDService service.
type GCDServiceServer interface {
    Compute(context.Context, *GCDRequest) (*GCDResponse, error)
}
func (s *server) Compute(ctx context.Context, r *pb.GCDRequest) (*pb.GCDResponse, error) {
    a, b := r.A, r.B
    for b != 0 {
        a, b = b, a%b
    }
    return &pb.GCDResponse{Result: a}, nil
}
```

## 0x03 定义RESTFul客户端 

前端使用 [gin](https://github.com/gin-gonic/gin) 框架,主要是提供一个REST风格的访问方式和调用我们定义的gcd服务端执行实际的计算任务.

```go
$ cd ~/go/src/github.com/rh01/mini-deploy-app/
$ mkdir -p api
$ vim main.go
```

```
package main

import (
    fmt "fmt"
    "log"
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    pb "github.com/rh01/mini-deploy-app/pb"
    "google.golang.org/grpc"
)

func main() {
    conn, err := grpc.Dial("gcd-service:3000", grpc.WithInsecure())
    if err != nil {
        log.Fatalf("Dial failed: %v", err)
    }
    gcdClient := pb.NewGCDServiceClient(conn)
}
```

上面的代码主要使用rpc的方式访问我们定义的服务端,此时的 gcd-service:3000 就是我们gcd服务端的 endpoint,这个就是服务地址,需要在kubernetes中定义.

```go
    r := gin.Default()
    r.GET("/gcd/:a/:b", func(c *gin.Context) {
        // Parse parameters
        a, err := strconv.ParseUint(c.Param("a"), 10, 64)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameter A"})
            return
        }
        b, err := strconv.ParseUint(c.Param("b"), 10, 64)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameter B"})
            return
        }
        // Call GCD service
        req := &pb.GCDRequest{A: a, B: b}
        if res, err := gcdClient.Compute(c, req); err == nil {
            c.JSON(http.StatusOK, gin.H{
                "result": fmt.Sprint(res.Result),
            })
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
    })
```

接下来处理 /gcd/:a/:b 请求,读取参数 A 和 B,然后调用GCD服务.

最后运行我们的REST API端.启动一个API server.

```go
    // Run HTTP server
    if err := r.Run(":3000"); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
```

## 0x04 构建Docker镜像 

下面是我定义的Dockerfile文件,因为有两个服务,所以这里分成两个Docker镜像,一个是gcd服务,另外一个是提供RESTAPI访问的客户端api.

> 有关Docker的多阶段构建参考: [[实战\] 将golang编写的微服务部署在树莓派搭建的kubernetes集群](https://www.41sh.cn/?id=61)

```dockerfile
# Dockerfile.gcd
FROM golang AS build-env

WORKDIR /go/src/github.com/rh01/mini-deploy-app/gcd
COPY gcd .
COPY pb ../pb
COPY vendor ../vendor



ENV http_proxy http://192.168.1.9:12333
ENV https_proxy http://192.168.1.9:12333

RUN go get -u -v github.com/kardianos/govendor
RUN govendor sync
RUN GOOS=linux GOARCH=arm GOARM=7 go build -v -o /go/src/github.com/rh01/mini-deploy-app/gcd-server


FROM armhf/alpine:latest
COPY --from=build-env /go/src/github.com/rh01/mini-deploy-app/gcd-server /usr/local/bin/gcd
EXPOSE 3000
CMD [ "gcd" ]
```

```dockerfile
# Dockerfile.api
FROM golang AS build-env

WORKDIR /go/src/github.com/rh01/mini-deploy-app/api
COPY api .
COPY pb ../pb
COPY vendor ../vendor



ENV http_proxy http://192.168.1.9:12333
ENV https_proxy http://192.168.1.9:12333

RUN go get -u -v github.com/kardianos/govendor
RUN govendor sync
RUN GOOS=linux GOARCH=arm GOARM=7 go build -v -o /go/src/github.com/rh01/mini-deploy-app/api-server


FROM armhf/alpine:latest
COPY --from=build-env /go/src/github.com/rh01/mini-deploy-app/api-server /usr/local/bin/api
EXPOSE 3000
CMD [ "api" ]
```

然后构建

```bash
$ docker build -t rh02/apiserver:v1.0.0 -f Dockerfile.api . 
$ docker build -t rh02/gcdserver:v1.0.0 -f Dockerfile.gcd .
```

## 0x05 部署到kubernetes

定义两个Deployment和对应的两个Service,并且将gcd服务的名字写成我们api服务调用的名字:gcd-service.

下面是gcd的deployment和service的定义: gcd.yaml

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: gcd-deployment
  labels:
    app: gcd
spec:
  selector:
    matchLabels:
      app: gcd
  replicas: 3
  template:
    metadata:
      labels:
        app: gcd
    spec:
      containers:
      - name: gcd
        image: rh02/gcdserver:v1.0.0
        imagePullPolicy: Always
      ports:
      - name: gcd-service
        containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: gcd-service
spec:
  selector:
    app: gcd
  ports:
  - port: 3000
    targetPort: gcd-service
```

创建api.yaml, service类型设置为NodePort,从而可以在集群外部也可以访问,对于GCD服务,类型设置为ClusterIP即可,只需要在集群内部访问就可以.

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  selector:
    matchLabels:
      app: api
  replicas: 1
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: rh02/apiserver:v1.0.0
        imagePullPolicy: Always
      ports:
      - name: api-service
        containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: NodePort
  selector:
    app: api
  ports:
  - port: 3000
    targetPort: api-service
```

使用kubectl创建两个资源:

```bash
$ kubectl create -f api.yaml
$ kubectl create -f gcd.yaml
```

检查所有的Pod是否正在运行, 可以指定 `-w` 标记,查看启动的过程.

```bash
$ kubectl get pods -w
NAME                             READY     STATUS    RESTARTS   AGE
api-deployment-778049682-3vd0z   1/1       Running   0          3s
gcd-deployment-544390878-0zgc8   1/1       Running   0          2s
gcd-deployment-544390878-p78g0   1/1       Running   0          2s
gcd-deployment-544390878-r26nx   1/1       Running   0          2s
```

## 0x06 尾声 

![截图_2019-03-05_15-42-18.png](https://www.41sh.cn/zb_users/upload/2019/03/201903051551771763579640.png)

![截图_2019-03-05_15-43-02.png](https://www.41sh.cn/zb_users/upload/2019/03/201903051551771802295607.png)