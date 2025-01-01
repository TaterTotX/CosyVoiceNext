import React, { useEffect, useRef } from 'react';

interface TextInputProps {
    text: string;
    setText: (text: string) => void;
    isDarkMode: boolean;
    isPlaying: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 text,
                                                 setText,
                                                 isDarkMode,
                                                 isPlaying
                                             }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const STORAGE_KEY = 'textInput';

    // 初始化时从 localStorage 加载文本
    useEffect(() => {
        const savedText = localStorage.getItem(STORAGE_KEY);
        if (savedText && !text) {
            setText(savedText);
        }
    }, []);

    // 当文本变化时保存到 localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, text);
    }, [text]);

    useEffect(() => {
        if (!textareaRef.current) return;

        if (isPlaying) {
            textareaRef.current.scrollTop = 0;
            const scrollStep = () => {
                if (textareaRef.current) {
                    textareaRef.current.scrollTop += 0.1;
                }
            };
            const intervalId = setInterval(scrollStep, 16);
            return () => clearInterval(intervalId);
        } else {
            textareaRef.current.scrollTop = 0;
        }
    }, [isPlaying]);

    const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file) return;

        if (file.type === 'text/plain') {
            const text = await file.text();
            setText(text);
        } else {
            setText('不支持的文件类型，请拖入txt文件');
        }
    };

    return (
        <textarea
            ref={textareaRef}
            placeholder="请输入要转换为语音的文本...或拖拽txt文件到此处"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`w-full h-40 px-4 py-3 rounded-xl transition-all duration-500 ease-in-out
                resize-none outline-none ring-2 ring-transparent focus:ring-neutral-400
                ${isDarkMode
                ? 'bg-neutral-700 text-neutral-200 placeholder-neutral-500 border-neutral-600'
                : 'bg-neutral-700 text-white placeholder-neutral-400 border-neutral-200'
            } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isPlaying}
        />
    );
};

export default TextInput;