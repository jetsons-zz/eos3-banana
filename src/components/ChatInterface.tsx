import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { GeneratedImage } from '../types';

interface ChatInterfaceProps {
  onGenerate: (prompt: string, file?: File) => Promise<void>;
  isGenerating: boolean;
  generatedImage?: GeneratedImage | null;
  error?: string;
  onClearError?: () => void;
}

const FIXED_PROMPT = "Use the nano-banana model to create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork.";

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onGenerate,
  isGenerating,
  generatedImage,
  error,
  onClearError
}) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    await onGenerate(FIXED_PROMPT, selectedFile);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage.imageUrl;
    link.download = `nano-banana-figure-${generatedImage.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header */}
      <div className="kernel-header">
        <h1>Nano-Banana Figure Generator</h1>
        <p>Creates 1/7 scale commercialized figure renders from character illustrations</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error">
          Error: {error}
          {onClearError && (
            <button onClick={onClearError} style={{ marginLeft: '8px', fontSize: '11px' }}>
              Clear
            </button>
          )}
        </div>
      )}

      {/* Generated Image */}
      {generatedImage && (
        <div className="kernel-section">
          <h2>Generated Figure</h2>
          <table className="kernel-table">
            <tr>
              <th>Generated</th>
              <td>{new Date(generatedImage.timestamp).toLocaleString('en-US')}</td>
            </tr>
            <tr>
              <th>Actions</th>
              <td>
                <button onClick={handleDownload}>Download Image</button>
              </td>
            </tr>
          </table>
          
          <div style={{ marginTop: '8px', border: '1px solid #cccccc', padding: '4px' }}>
            <img
              src={generatedImage.imageUrl}
              alt="Generated nano-banana figure"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="kernel-section">
          <h2>Generating Figure...</h2>
          <div className="loading">
            Status: Processing with nano-banana model<br/>
            Creating: 1/7 scale commercialized figure<br/>
            Est. time: 10-30 seconds
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
            [NANO-BANANA PROCESSING...]
          </div>
        </div>
      )}

      {/* Upload and Generate Form */}
      <div className="kernel-section">
        <h2>Upload & Generate</h2>
        <form onSubmit={handleSubmit} className="kernel-form">
          <div className="kernel-form-row">
            <span className="kernel-form-label">Character Image:</span>
            <div>
              <FileUpload
                onFileSelect={setSelectedFile}
                onRemove={() => setSelectedFile(undefined)}
                selectedFile={selectedFile}
              />
            </div>
          </div>
          
          <div className="kernel-form-row">
            <span className="kernel-form-label"></span>
            <button type="submit" disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Figure'}
            </button>
            {selectedFile && (
              <button 
                type="button" 
                onClick={() => setSelectedFile(undefined)}
                style={{ marginLeft: '8px' }}
              >
                Clear Image
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Fixed Prompt Display */}
      <div className="kernel-section">
        <h2>Processing Instructions</h2>
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: '11px', 
          backgroundColor: '#f8f8f8', 
          padding: '8px',
          border: '1px solid #cccccc',
          lineHeight: '1.4'
        }}>
          {FIXED_PROMPT}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="kernel-section">
        <h2>Usage</h2>
        <ol>
          <li>Upload a character illustration image (JPG, PNG, WebP, or GIF)</li>
          <li>Click "Generate Figure" to process with nano-banana model</li>
          <li>Wait 10-30 seconds for generation to complete</li>
          <li>Download the resulting 1/7 scale figure render</li>
        </ol>
        
        <h3>Output Features</h3>
        <ul>
          <li>1/7 scale commercialized figure on computer desk</li>
          <li>Circular transparent acrylic base</li>
          <li>ZBrush modeling process displayed on screen</li>
          <li>BANDAI-style packaging box with original artwork</li>
        </ul>
      </div>
    </div>
  );
};