import React, { useState } from 'react';
import { History, Download, Copy, Trash2, Eye } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageHistoryProps {
  images: GeneratedImage[];
  onSelectImage: (image: GeneratedImage) => void;
  onDeleteImage: (imageId: string) => void;
  className?: string;
}

export const ImageHistory: React.FC<ImageHistoryProps> = ({
  images,
  onSelectImage,
  onDeleteImage,
  className = ''
}) => {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `banana-ai-${image.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  if (images.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <History className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">生成历史</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p>还没有生成过图片</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">生成历史</h3>
        </div>
        <span className="text-sm text-gray-500">{images.length} 张图片</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => {
                  setSelectedImageId(image.id);
                  onSelectImage(image);
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageId(image.id);
                    onSelectImage(image);
                  }}
                  className="p-1 bg-white bg-opacity-90 hover:bg-white rounded text-gray-700"
                  title="查看大图"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image);
                  }}
                  className="p-1 bg-white bg-opacity-90 hover:bg-white rounded text-gray-700"
                  title="下载"
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(image.id);
                  }}
                  className="p-1 bg-white bg-opacity-90 hover:bg-white rounded text-red-600"
                  title="删除"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-600 mb-1">
                {formatTimestamp(image.timestamp)}
              </p>
              <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                {image.prompt}
              </p>
              <button
                onClick={() => handleCopyPrompt(image.prompt)}
                className="w-full flex items-center justify-center px-2 py-1 text-xs text-purple-600 border border-purple-200 rounded hover:bg-purple-50 transition-colors"
              >
                <Copy className="w-3 h-3 mr-1" />
                复制提示词
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImageId && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImageId(null)}
        >
          <div className="max-w-4xl max-h-full">
            {(() => {
              const selectedImage = images.find(img => img.id === selectedImageId);
              if (!selectedImage) return null;
              
              return (
                <div className="bg-white rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.prompt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {formatTimestamp(selectedImage.timestamp)}
                    </p>
                    <p className="text-gray-800">{selectedImage.prompt}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};