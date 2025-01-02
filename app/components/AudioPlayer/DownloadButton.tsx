import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    isConnecting: boolean;
    isDarkMode: boolean;
    onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
                                                           isConnecting,
                                                           isDarkMode,
                                                           onDownload
                                                       }) => {
    return (
        <button
            onClick={onDownload}
            disabled={isConnecting}
            className={`flex items-center justify-center px-6 py-2.5 rounded-lg font-medium 
                transition-all duration-500 ease-in-out transform hover:scale-105
                ${isConnecting
                ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
                : isDarkMode
                    ? 'btn-base-dark'
                    : 'btn-base-light'
            }`}
        >
            <Download size={18} className="mr-2" />
            {isConnecting ? '正在接收音频...' : '下载音频'}
        </button>
    );
};

export default DownloadButton;