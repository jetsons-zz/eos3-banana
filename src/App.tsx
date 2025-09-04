import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { ApiKeyConfig } from './components/ApiKeyConfig';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GeneratedImage } from './types';
import { geminiService } from './utils/gemini';

function App() {
  const [apiKey, setApiKey] = useLocalStorage('gemini-api-key', '');
  const [generatedImages, setGeneratedImages] = useLocalStorage<GeneratedImage[]>('generated-images', []);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (apiKey && geminiService.validateApiKey(apiKey)) {
      geminiService.setApiKey(apiKey);
    }
  }, [apiKey]);

  const handleGenerate = async (prompt: string, file?: File) => {
    if (!geminiService.isConfigured()) {
      setShowSettings(true);
      setError('请先配置 Gemini API Key');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const imageUrl = await geminiService.generateImage({
        prompt,
        quality: 'standard',
        style: 'natural'
      }, file);

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        imageUrl,
        timestamp: Date.now()
      };

      setCurrentImage(newImage);
      setGeneratedImages(prev => [newImage, ...prev.slice(0, 49)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    if (geminiService.validateApiKey(newApiKey)) {
      geminiService.setApiKey(newApiKey);
      setShowSettings(false);
      setError('');
    }
  };

  useEffect(() => {
    if (!apiKey || !geminiService.validateApiKey(apiKey)) {
      setShowSettings(true);
    }
  }, []);

  if (showSettings) {
    return (
      <div>
        <div className="kernel-header">
          <h1>EOS3 Banana - AI 图像生成工具</h1>
          <p>基于 Google Gemini 2.5 Flash 模型驱动</p>
        </div>

        <div className="kernel-section">
          <h2>配置 API Key</h2>
          <div className="kernel-form">
            <ApiKeyConfig
              apiKey={apiKey}
              onApiKeyChange={handleApiKeyChange}
            />
          </div>
          
          {error && (
            <div className="error">{error}</div>
          )}

          {geminiService.isConfigured() && (
            <div style={{ marginTop: '8px' }}>
              <button onClick={() => setShowSettings(false)}>
                开始使用
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ChatInterface
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        generatedImage={currentImage}
        onOpenSettings={() => setShowSettings(true)}
        error={error}
        onClearError={() => setError('')}
      />
    </div>
  );
}

export default App;