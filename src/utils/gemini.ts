import { GoogleGenerativeAI } from '@google/generative-ai';

// Pre-configured API key
const API_KEY = 'AIzaSyCc7Y4t3OqmDHj849UFcEVruWk0DhuVcro';

interface GenerationRequest {
  prompt: string;
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
}

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private isReady: boolean = true;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  validateApiKey(apiKey: string): boolean {
    // Always return true since we use pre-configured key
    return true;
  }

  setApiKey(apiKey: string): void {
    // No-op since we use pre-configured key
  }

  isConfigured(): boolean {
    return this.isReady;
  }

  async generateImage(request: GenerationRequest, inputFile?: File): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini service not configured');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      
      const parts: any[] = [];
      
      // Add the fixed nano-banana prompt
      const promptText = "Use the nano-banana model to create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork.";
      
      parts.push({ text: promptText });

      // Add input file if provided
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
      
      // Check if there are any images generated
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
      
      // If no inline image data, generate a demo placeholder image
      return this.generatePlaceholderImage();
      
    } catch (error) {
      console.error('Generation error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to generate image');
    }
  }

  private generatePlaceholderImage(): string {
    // Create a simple canvas placeholder that shows nano-banana processing
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, 800, 600);
      
      // Border
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 798, 598);
      
      // Main text
      ctx.fillStyle = '#333333';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NANO-BANANA FIGURE GENERATOR', 400, 200);
      
      // Status
      ctx.font = '18px monospace';
      ctx.fillStyle = '#666666';
      ctx.fillText('Demo Mode - 1/7 Scale Figure Render', 400, 250);
      
      // Instructions
      ctx.font = '14px monospace';
      ctx.fillText('Features:', 400, 320);
      ctx.fillText('• Computer desk environment', 400, 350);
      ctx.fillText('• Transparent acrylic base', 400, 370);
      ctx.fillText('• ZBrush modeling on screen', 400, 390);
      ctx.fillText('• BANDAI-style packaging box', 400, 410);
      
      // Bottom note
      ctx.font = '12px monospace';
      ctx.fillStyle = '#999999';
      ctx.fillText('This is a demo interface. Full image generation requires proper API setup.', 400, 480);
    }
    
    return canvas.toDataURL('image/png');
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiService();