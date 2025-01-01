import { useRef } from 'react';
import {AudioData} from './types'



export const useWebSocket = (
    onMessage: (data: AudioData) => void,
    onError: () => void,
    onClose: () => void
) => {
    const websocketRef = useRef<WebSocket | null>(null);

    const connect = (text: string) => {
        try {
            websocketRef.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

            websocketRef.current.onopen = () => {
                console.log('WebSocket连接已建立');
                if (websocketRef.current) {
                    websocketRef.current.send(text);
                }
            };

            websocketRef.current.onmessage = async (event) => {
                const data: AudioData = JSON.parse(event.data);
                onMessage(data);
            };

            websocketRef.current.onerror = (error) => {
                console.error('WebSocket错误:', error);
                onError();
            };

            websocketRef.current.onclose = () => {
                console.log('WebSocket连接已关闭');
                onClose();
            };
        } catch (error) {
            console.error('连接错误:', error);
            onError();
        }
    };

    const disconnect = () => {
        if (websocketRef.current) {
            websocketRef.current.close();
            // 直接刷新页面
            window.location.reload();
        }
    };

    return {
        connect,
        disconnect,
        websocketRef
    };
};