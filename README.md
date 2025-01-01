[![SVG Banners](https://svg-banners.vercel.app/api?type=luminance&text1=COSY-VOICE-NEXT%20🌞&width=800&height=400)](https://github.com/Akshay090/svg-banners)
基于cosyvoice项目作为后端，基于Next.js构建的前端页面，使用websockt技术进行实时流逝语音生成。
支持文本输入、文件上传、实时播放和音频下载等功能。


## 🌟[在线预览地址](https://cosy-voice-next-gyiysg89i-tatertots-projects.vercel.app/)



<video width="100%" controls>
  <source src="demo/demo.mov" type="video/quicktime">
  Your browser does not support the video tag.
</video>

## ✨ 特性

- 🎯 简洁优雅的用户界面
- 🌓 支持深色/浅色主题切换
- 📝 支持文本输入和TXT文件上传
- 🎵 实时语音播放功能
- 💾 支持音频下载为WAV格式
- 💫 流畅的动画过渡效果
- 📱 响应式设计，支持移动端

## 🛠 技术栈

- Next.js
- React
- TypeScript
- WebSocket
- Web Audio API
- Tailwind CSS
- Lucide Icons

## 🚀 前端开发流程

```bash
# 克隆项目
git clone https://github.com/你的用户名/cosy-voice-next.git

# 安装依赖
cd cosy-voice-next
npm install

# 启动开发服务器
npm run dev
```

## 🚀 docker用户流程

```bash
# windows 启动命令
start.bat

# mac/linux 启动命令
sh start.sh

```


## 🔧 网络问题解决方案

修改 `.env.local` 文件，添加以下配置：

```
#用于连接cosyvoice客户端
NEXT_PUBLIC_WS_URL=你的WebSocket服务器地址

#用于下载docker配置文件
HTTPS_PROXY=你的代理地址
HTTP_PROXY=你的代理地址
```

## 📝 使用说明

1. 在文本框中输入要转换的文字，或上传TXT文本文件
2. 点击"开始播放"按钮，即可听到转换后的语音
3. 播放过程中可随时点击"停止播放" 断开连接
4. 点击"下载音频"可将当前音频保存为WAV文件
5. 点击右上角主题切换按钮可切换深色/浅色模式

## 📄 开源协议

[MIT License](LICENSE)