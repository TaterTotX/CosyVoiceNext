#!/bin/bash

# 读取.env.local文件中的代理设置
if [ -f .env.local ]; then
    # 使用grep提取HTTP_PROXY值,移除双引号并过滤空值
    HTTP_PROXY=$(grep -v '^#' .env.local | grep 'HTTP_PROXY=' | cut -d '=' -f2 | tr -d '"' | tr -d "'" | grep .)
    HTTPS_PROXY=$(grep -v '^#' .env.local | grep 'HTTPS_PROXY=' | cut -d '=' -f2 | tr -d '"' | tr -d "'" | grep .)

    # 如果找到代理设置则使用它们
    if [ ! -z "$HTTP_PROXY" ]; then
        export http_proxy="$HTTP_PROXY"
        echo "已从.env.local设置HTTP代理: $http_proxy"
    fi

    if [ ! -z "$HTTPS_PROXY" ]; then
        export https_proxy="$HTTPS_PROXY"
        echo "已从.env.local设置HTTPS代理: $https_proxy"
    fi
else

    echo "未找到.env.local文件,无法使用代理设置"
fi

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# 寻找可用端口
port=3000
while [ -n "$(lsof -i:$port)" ]; do
   echo "端口 $port 已被占用，尝试下一个端口..."
   ((port++))
done
echo "将使用端口: $port"

# 构建docker镜像
echo "开始构建 Docker 镜像..."
if docker build -t cosy-voice-next . ; then
   echo -e "${GREEN}Docker 镜像构建成功${NC}"
else
   echo -e "${RED}Docker 镜像构建失败${NC}"
   exit 1
fi

# 运行docker容器
echo "开始运行 Docker 容器..."
CONTAINER_ID=$(docker run -d -p $port:3000 cosy-voice-next)
if [ $? -eq 0 ]; then
   echo -e "${GREEN}容器启动成功，容器ID: $CONTAINER_ID${NC}"
   echo "等待应用启动..."
   sleep 3  # 等待应用启动

   # 检查应用是否成功启动
   if curl -s http://localhost:$port > /dev/null; then
       echo -e "${GREEN}应用成功启动${NC}"
       # 根据操作系统打开浏览器
       if [[ "$OSTYPE" == "darwin"* ]]; then
           open "http://localhost:$port"
       elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
           xdg-open "http://localhost:$port"
       fi
   else
       echo -e "${RED}应用启动失败，请检查日志${NC}"
       echo "查看容器日志："
       docker logs $CONTAINER_ID
   fi
else
   echo -e "${RED}容器启动失败${NC}"
   exit 1
fi

echo -e "\n使用以下命令可以查看容器日志："
echo "docker logs $CONTAINER_ID"
echo -e "\n使用以下命令可以停止容器："
echo "docker stop $CONTAINER_ID"