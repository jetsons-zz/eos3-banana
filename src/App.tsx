import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { InviteCodeModal } from './components/InviteCodeModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GeneratedImage } from './types';
import { geminiService } from './utils/gemini';

function App() {
  const [generatedImages, setGeneratedImages] = useLocalStorage<GeneratedImage[]>('generated-images', []);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  
  // 邀请码验证状态 - 强制重置为false确保显示邀请码窗口
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('invite-authenticated', false);
  const [inviteError, setInviteError] = useState<string>('');

  // 强制清除认证状态，确保邀请码窗口显示
  useEffect(() => {
    localStorage.removeItem('invite-authenticated');
    setIsAuthenticated(false);
  }, []);

  const handleGenerate = async (prompt: string, file?: File) => {
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
      setError(err instanceof Error ? err.message : 'Generation failed, please try again');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInviteCodeSubmit = (code: string) => {
    const validCodes = [
      'NANO-BANANA-2025',
      'FIGURE-MASTER',
      'ANIME-COLLECTOR',
      'BANDAI-PRO',
      'OTAKU-VIP'
    ];

    if (validCodes.includes(code.toUpperCase().trim())) {
      setIsAuthenticated(true);
      setInviteError('');
    } else {
      setInviteError('邀请码无效，请检查后重试');
    }
  };

  return (
    <>
      <InviteCodeModal
        isOpen={!isAuthenticated}
        onSubmit={handleInviteCodeSubmit}
        error={inviteError}
      />
      
      {isAuthenticated && (
        <ChatInterface
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          generatedImage={currentImage}
          error={error}
          onClearError={() => setError('')}
          onResetAuth={() => {
            setIsAuthenticated(false);
            setInviteError('');
          }}
        />
      )}
    </>
  );
}

export default App;