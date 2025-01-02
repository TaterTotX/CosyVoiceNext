import React from 'react';
import { Square, Play } from 'lucide-react';

interface PlayButtonProps {
    isPlaying: boolean;
    isConnecting: boolean;
    text: string;
    isDarkMode: boolean;
    onTogglePlay: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
                                                   isPlaying,
                                                   isConnecting,
                                                   text,
                                                   isDarkMode,
                                                   onTogglePlay
                                               }) => {
    return (
        <button
            onClick={onTogglePlay}
            disabled={!isPlaying && !text.trim() }
            className={`flex items-center justify-center px-6 py-2.5 rounded-lg font-medium 
                transition-all duration-500 ease-in-out transform hover:scale-105
                ${(!isPlaying && !text.trim())
                ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
                : isDarkMode
                    ? 'btn-base-dark'
                    : 'btn-base-light'
            }`}
        >
            {isPlaying ? (
                <>
                    <Square size={18} className="mr-2" />
                    停止播放
                </>
            ) : (
                <>
                    <Play size={18} className="mr-2" />
                    {isConnecting ? '正在关闭连接...' : '开始播放'}
                </>
            )}
        </button>
    );
};

export default PlayButton;