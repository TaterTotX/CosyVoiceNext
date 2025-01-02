# CosyVoiceNext

[![SVG Banners](https://svg-banners.vercel.app/api?type=luminance&text1=COSY-VOICE-NEXT%20🌞&width=800&height=400)](https://github.com/Akshay090/svg-banners)

A real-time streaming text-to-speech web application built with Next.js, using the CosyVoice project as the backend.

[中文文档](README_CN.md) | [Online Preview](https://cosy-voice-next.vercel.app/)

## ✨ Features

- 🎯 Clean and elegant user interface
- 🌓 Dark/Light theme support
- 📝 Text input and TXT file upload
- 🎵 Real-time voice streaming
- 💾 Audio download (WAV format)
- 💫 Smooth transition animations
- 📱 Responsive design

## 🎥 Demo

Check out our video demonstration (please turn on sound):

[Video Demo](https://private-user-images.githubusercontent.com/102522568/399543480-dc1aed67-8947-45e7-876a-cd2dfc52aa6a.mp4)

## 📱 Mobile View
<img src="demo/img.png" style="border-radius: 20px" alt="Mobile View">

## 🛠 Tech Stack

- Next.js
- React
- TypeScript
- WebSocket
- Web Audio API
- Tailwind CSS
- Lucide Icons

## 🚀 Getting Started

### Development Setup

```bash
# Clone the repository
git clone https://github.com/TaterTotX/CosyVoiceNext.git

# Install dependencies
cd cosy-voice-next
npm install

# Start development server
npm run dev
```

### Docker Setup

```bash
# Windows
start.bat

# Mac/Linux
sh start.sh
```

## 🔧 Network Configuration

Edit `.env.local` file and add:

```env
# CosyVoice client connection
NEXT_PUBLIC_WS_URL=your-websocket-server-address

# Docker configuration downloads
HTTPS_PROXY=your-proxy-address
HTTP_PROXY=your-proxy-address
```

## 📝 Usage Guide

1. Enter text in the input box or upload a TXT file
2. Click "Play" to hear the voice conversion
3. Click "Stop" at any time to disconnect
4. Click "Download" to save the audio as WAV
5. Toggle theme using the button in top-right corner

## 📄 License

[MIT License](LICENSE)