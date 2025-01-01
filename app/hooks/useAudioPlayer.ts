import {useRef, useState} from 'react';
import { useAudioContext } from './useAudioContext';
import { useWebSocket } from './useWebSocket';
import {AudioChunk, AudioData} from './types'
export const useAudioPlayer = () => {
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const allAudioDataRef = useRef<AudioChunk[]>([]);

    const {
        audioContextRef,
        gainNodeRef,
        nextPlayTimeRef,
        currentSourceRef
    } = useAudioContext();

    const playAudioChunk = (audioData: number[], sampleRate: number) => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        try {
            const currentTime = audioContextRef.current.currentTime;
            const audioBuffer = audioContextRef.current.createBuffer(1, audioData.length, sampleRate);
            const channelData = audioBuffer.getChannelData(0);
            allAudioDataRef.current.push({
                data: channelData,
                sampleRate: sampleRate
            });
            channelData.set(audioData);

            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(gainNodeRef.current);

            const startTime = Math.max(currentTime, nextPlayTimeRef.current);
            source.start(startTime);

            nextPlayTimeRef.current = startTime + audioBuffer.duration;
            currentSourceRef.current = source;

            source.onended = () => {
                if (currentSourceRef.current === source) {
                    currentSourceRef.current = null;
                }
            };
        } catch (error) {
            console.error('Error playing audio chunk:', error);
        }
    };

    const handleMessage = (data: AudioData) => {
        if (data.status === 'done') {
            setIsConnecting(false);
            if (currentSourceRef.current) {
                currentSourceRef.current.onended = () => {
                    setIsPlaying(false);
                };
            }
            return;
        }

        if (!data.audio_data || !data.sample_rate) {
            console.error('Invalid audio data received');
            return;
        }

        playAudioChunk(data.audio_data, data.sample_rate);
    };

    const { connect, disconnect } = useWebSocket(
        handleMessage,
        () => {

            setIsConnecting(false);
        },
        () => {

            setIsConnecting(false);
        }
    );

    const handlePlay = async () => {
        if (!text.trim()) {
            alert('请输入要转换的文本');
            return;
        }

        if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        allAudioDataRef.current = [];
        nextPlayTimeRef.current = 0;
        setIsPlaying(true);
        setIsConnecting(true);
        connect(text);
    };

    const handleStop = () => {
        disconnect();


        if (currentSourceRef.current) {
            currentSourceRef.current.stop();
            currentSourceRef.current.onended = () => {
                setIsPlaying(false);
                currentSourceRef.current = null;
            };
        } else {
            setIsPlaying(false);
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().then(() => {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContextClass();
                gainNodeRef.current = audioContextRef.current.createGain();
                gainNodeRef.current.connect(audioContextRef.current.destination);
                nextPlayTimeRef.current = 0;
            });
        }

        setIsPlaying(false);
    };

    const handleDownload = () => {
        if (allAudioDataRef.current.length === 0) {
            alert('没有可下载的音频数据');
            return;
        }

        // 假设所有chunk使用相同的采样率，取第一个chunk的采样率
        const sampleRate = allAudioDataRef.current[0].sampleRate;

        // 合并音频数据
        const mergedData = new Float32Array(
            allAudioDataRef.current.reduce((sum, chunk) => sum + chunk.data.length, 0)
        );

        let offset = 0;
        for (const chunk of allAudioDataRef.current) {
            mergedData.set(chunk.data, offset);
            offset += chunk.data.length;
        }

        // 创建 WAV 文件头
        const createWavHeader = (dataLength: number) => {
            const buffer = new ArrayBuffer(44);
            const view = new DataView(buffer);

            // "RIFF" chunk descriptor
            view.setUint8(0, 0x52); // R
            view.setUint8(1, 0x49); // I
            view.setUint8(2, 0x46); // F
            view.setUint8(3, 0x46); // F

            // 文件大小
            view.setUint32(4, 36 + dataLength * 2, true);

            // "WAVE" format
            view.setUint8(8, 0x57);  // W
            view.setUint8(9, 0x41);  // A
            view.setUint8(10, 0x56); // V
            view.setUint8(11, 0x45); // E

            // "fmt " sub-chunk
            view.setUint8(12, 0x66); // f
            view.setUint8(13, 0x6D); // m
            view.setUint8(14, 0x74); // t
            view.setUint8(15, 0x20); // space

            view.setUint32(16, 16, true);           // Sub-chunk size
            view.setUint16(20, 1, true);            // Audio format (1 = PCM)
            view.setUint16(22, 1, true);            // Number of channels
            view.setUint32(24, sampleRate, true);   // Sample rate
            view.setUint32(28, sampleRate * 2, true); // Byte rate
            view.setUint16(32, 2, true);            // Block align
            view.setUint16(34, 16, true);           // Bits per sample

            // "data" sub-chunk
            view.setUint8(36, 0x64); // d
            view.setUint8(37, 0x61); // a
            view.setUint8(38, 0x74); // t
            view.setUint8(39, 0x61); // a

            view.setUint32(40, dataLength * 2, true); // Data size

            return buffer;
        };

        // 将Float32Array转换为Int16Array (16位PCM)
        const samples = new Int16Array(mergedData.length);
        for (let i = 0; i < mergedData.length; i++) {
            const s = Math.max(-1, Math.min(1, mergedData[i]));
            samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        // 合并头部和音频数据
        const wavHeader = createWavHeader(samples.length);

        // 下载文件
        const blob = new Blob([wavHeader, samples], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'audio.wav';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        text,
        setText,
        isPlaying,
        isConnecting,
        handlePlay,
        handleStop,
        handleDownload
    };
};