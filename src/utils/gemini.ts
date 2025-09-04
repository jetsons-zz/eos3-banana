import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerationRequest } from '../types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string = '';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateImage(request: GenerationRequest, inputFile?: File): Promise<string> {
    if (!this.genAI || !this.apiKey) {
      throw new Error('请先设置 Gemini API Key');
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: request.model || 'gemini-2.5-flash-image-preview' 
      });

      const parts: any[] = [];

      // Add the text prompt
      const promptText = `Generate a high-quality image based on this description: ${request.prompt}

Style: ${request.style || 'natural'}
Quality: ${request.quality || 'standard'}

${inputFile ? 'Use the uploaded image as reference for style, composition, or inspiration while creating something new based on the text prompt.' : ''}`;

      parts.push({ text: promptText });

      // If there's an input file, add it directly to the model
      if (inputFile) {
        const base64Data = await this.fileToBase64(inputFile);
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: inputFile.type
          }
        });
      }

      const result = await model.generateContent(parts);
      const response = await result.response;
      
      if (response.candidates && response.candidates[0]) {
        const candidate = response.candidates[0];
        
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData?.data) {
              const base64Data = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              return `data:${mimeType};base64,${base64Data}`;
            }
          }
        }
      }
      
      throw new Error('未能生成图片，请检查提示词或稍后重试');
    } catch (error) {
      console.error('图片生成失败:', error);
      if (error instanceof Error) {
        throw new Error(`图片生成失败: ${error.message}`);
      } else {
        throw new Error('图片生成失败，请稍后重试');
      }
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (data:image/jpeg;base64,)
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.trim().length > 0 && apiKey.startsWith('AIza');
  }

  isConfigured(): boolean {
    return this.genAI !== null && this.apiKey.length > 0;
  }
}

export const geminiService = new GeminiService();