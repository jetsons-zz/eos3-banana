import React, { useState, useRef } from 'react';
import { FileUpload } from './FileUpload';
import { PromptSuggestions } from './PromptSuggestions';
import { GeneratedImage } from '../types';

interface ChatInterfaceProps {
  onGenerate: (prompt: string, file?: File) => Promise<void>;
  isGenerating: boolean;
  generatedImage?: GeneratedImage | null;
  onOpenSettings: () => void;
  error?: string;
  onClearError?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onGenerate,
  isGenerating,
  generatedImage,
  onOpenSettings,
  error,
  onClearError
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    await onGenerate(prompt.trim(), selectedFile);
    setPrompt('');
    setSelectedFile(undefined);
    setShowSuggestions(false);
    setShowFileUpload(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage.imageUrl;
    link.download = `eos3-banana-${generatedImage.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header */}
      <div className="kernel-header">
        <h1>EOS3 Banana</h1>
        <p>Powered by EOS3 | <a href="#" onClick={onOpenSettings}>设置</a></p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error">
          错误: {error}
          {onClearError && (
            <button onClick={onClearError} style={{ marginLeft: '8px', fontSize: '11px' }}>
              清除
            </button>
          )}
        </div>
      )}

      {/* Generated Image */}
      {generatedImage && (
        <div className="kernel-section">
          <h2>生成结果</h2>
          <table className="kernel-table">
            <tr>
              <th>提示词</th>
              <td>{generatedImage.prompt}</td>
            </tr>
            <tr>
              <th>生成时间</th>
              <td>{new Date(generatedImage.timestamp).toLocaleString('zh-CN')}</td>
            </tr>
            <tr>
              <th>操作</th>
              <td>
                <button onClick={handleDownload}>下载图片</button>
              </td>
            </tr>
          </table>
          
          <div style={{ marginTop: '8px', border: '1px solid #cccccc', padding: '4px' }}>
            <img
              src={generatedImage.imageUrl}
              alt={generatedImage.prompt}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="kernel-section">
          <h2>生成中...</h2>
          <div className="loading">
            Status: Generating image with EOS3<br/>
            Est. time: 10-30 seconds<br/>
            Please wait...
          </div>
          <div style={{ 
            width: '100%', 
            height: '200px', 
            backgroundColor: '#f8f8f8', 
            border: '1px solid #cccccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#666666'
          }}>
            [IMAGE GENERATING...]
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="kernel-section">
        <h2>图像生成</h2>
        <form onSubmit={handleSubmit} className="kernel-form">
          <div className="kernel-form-row">
            <span className="kernel-form-label">提示词:</span>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="描述你想要生成的图片..."
              style={{ width: '400px', height: '80px' }}
              disabled={isGenerating}
            />
          </div>
          
          <div className="kernel-form-row">
            <span className="kernel-form-label">上传图片:</span>
            <input
              type="checkbox"
              checked={showFileUpload}
              onChange={(e) => setShowFileUpload(e.target.checked)}
            />
            <label style={{ marginLeft: '4px', fontSize: '12px' }}>启用图片上传</label>
          </div>

          {showFileUpload && (
            <div className="kernel-form-row">
              <span className="kernel-form-label"></span>
              <FileUpload
                onFileSelect={setSelectedFile}
                onRemove={() => setSelectedFile(undefined)}
                selectedFile={selectedFile}
              />
            </div>
          )}

          <div className="kernel-form-row">
            <span className="kernel-form-label"></span>
            <button type="submit" disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? '生成中...' : '生成图片'}
            </button>
            <button type="button" onClick={() => setShowSuggestions(!showSuggestions)} style={{ marginLeft: '8px' }}>
              {showSuggestions ? '隐藏' : '显示'}提示词库
            </button>
          </div>
        </form>
      </div>

      {/* Prompt Suggestions */}
      {showSuggestions && !generatedImage && !isGenerating && (
        <div className="kernel-section">
          <h2>预设提示词</h2>
          <PromptSuggestions onSelectPrompt={handlePromptSelect} />
        </div>
      )}
    </div>
  );
};