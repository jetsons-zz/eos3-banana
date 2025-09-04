import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GeneratedImage } from './types';
import { geminiService } from './utils/gemini';

function App() {
  const [generatedImages, setGeneratedImages] = useLocalStorage<GeneratedImage[]>('generated-images', []);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

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

  return (
    <ChatInterface
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      generatedImage={currentImage}
      error={error}
      onClearError={() => setError('')}
    />
  );
}

export default App;