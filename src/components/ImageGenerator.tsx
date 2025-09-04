import React, { useState } from 'react';
import { Wand2, Download, Copy, Loader2, RefreshCw } from 'lucide-react';
import { geminiService } from '../utils/gemini';
import { GeneratedImage } from '../types';

interface ImageGeneratorProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onImageGenerated: (image: GeneratedImage) => void;
  className?: string;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  prompt,
  onPromptChange,
  onImageGenerated,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入提示词');
      return;
    }

    if (!geminiService.isConfigured()) {
      setError('请先配置 Gemini API Key');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await geminiService.generateImage({
        prompt: prompt.trim(),
        quality: 'standard',
        style: 'natural'
      });

      setGeneratedImage(imageUrl);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        imageUrl,
        timestamp: Date.now()
      };
      
      onImageGenerated(newImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `banana-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            图片描述提示词
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="描述您想要生成的图片，越详细越好..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleCopyPrompt}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
              title="复制提示词"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                生成图片
              </>
            )}
          </button>
          
          {generatedImage && (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              title="重新生成"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {generatedImage && (
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={generatedImage}
                alt={prompt}
                className="w-full rounded-lg shadow-md"
                style={{ maxHeight: '512px', objectFit: 'contain' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg" />
              <button
                onClick={handleDownload}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-white rounded-lg shadow-md transition-colors opacity-0 group-hover:opacity-100"
                title="下载图片"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <strong>提示词:</strong> {prompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};