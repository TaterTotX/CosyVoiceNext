'use client'
import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import FileUploadButton from "@/app/components/AudioPlayer/FileUploadButton";
import PlayButton from "@/app/components/AudioPlayer/PlayButton";
import ThemeToggle from "@/app/components/AudioPlayer/ThemeToggle";
import TextInput from "@/app/components/AudioPlayer/TextInput";
import DownloadButton from "@/app/components/AudioPlayer/DownloadButton";

const AudioPlayer = () => {
    const {
        text,
        setText,
        isPlaying,
        isConnecting,
        handlePlay,
        handleStop,
        handleDownload
    } = useAudioPlayer();

    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleTogglePlay = () => {
        if (isPlaying) {
            handleStop();
        } else {
            handlePlay();
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ease-in-out ${
            isDarkMode ? 'dark bg-neutral-900' : 'bg-neutral-50'
        }`}>
            <div className="w-full max-w-xl">
                <div className={`rounded-2xl backdrop-blur-sm transition-all duration-700 ease-in-out ${
                    isDarkMode
                        ? 'bg-neutral-800/90 shadow-lg shadow-neutral-900/50'
                        : 'bg-black/90 shadow-lg shadow-neutral-200/50'
                }`}>
                    <div className="flex flex-col items-center p-6 transition-all duration-500">
                        <h1 className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${
                            isDarkMode ? 'text-neutral-200' : 'text-white'
                        }`}>
                            cosy-voice-next
                        </h1>

                        <ThemeToggle
                            isDarkMode={isDarkMode}
                            onToggle={toggleDarkMode}
                        />

                        <TextInput
                            text={text}
                            setText={setText}
                            isDarkMode={isDarkMode}
                            isPlaying={isPlaying}
                        />

                        <div
                            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6 w-full">
                            <FileUploadButton
                                onTextLoad={setText}
                                isDarkMode={isDarkMode}
                            />
                            <PlayButton
                                isPlaying={isPlaying}
                                isConnecting={isConnecting}
                                text={text}
                                isDarkMode={isDarkMode}
                                onTogglePlay={handleTogglePlay}
                            />

                            <DownloadButton
                                isConnecting={isConnecting}
                                isDarkMode={isDarkMode}
                                onDownload={handleDownload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;