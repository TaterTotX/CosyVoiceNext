'use client'
import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadButtonProps {
    onTextLoad: (text: string) => void;
    isDarkMode: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onTextLoad, isDarkMode }) => {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // 检查文件大小 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('文件大小不能超过10MB');
            return;
        }

        // 检查文件类型
        if (file.type !== 'text/plain') {
            alert('只支持txt文件');
            return;
        }

        const text = await file.text();
        onTextLoad(text);

        // 重置input以允许重复上传相同文件
        event.target.value = '';
    };

    return (
        <label className={`flex items-center justify-center px-6 py-2.5 rounded-lg font-medium cursor-pointer
            transition-all duration-500 ease-in-out transform hover:scale-105
            ${isDarkMode
            ? 'btn-base-dark'
            : 'btn-base-light'
        }`}
        >
            <Upload size={18} className="mr-2" />
            上传文本
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
            />
        </label>
    );
};

export default FileUploadButton;