import React, { useState, useRef } from 'react';
import { FileUpload } from './FileUpload';
import { GeneratedImage } from '../types';

interface ChatInterfaceProps {
  onGenerate: (prompt: string, file?: File) => Promise<void>;
  isGenerating: boolean;
  generatedImage?: GeneratedImage | null;
  onOpenSettings: () => void;
  error?: string;
  onClearError?: () => void;
}

const DEFAULT_PROMPT = "Use the nano-banana model to create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork.";

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onGenerate,
  isGenerating,
  generatedImage,
  onOpenSettings,
  error,
  onClearError
}) => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    await onGenerate(prompt.trim(), selectedFile);
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
        <p>Nano-Banana Model Figure Generator | <a href="#" onClick={onOpenSettings}>Settings</a></p>
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
              <th>Generation Time</th>
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
              alt="Generated figure"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="kernel-section">
          <h2>Generating...</h2>
          <div className="loading">
            Status: Creating nano-banana figure<br/>
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
            [FIGURE GENERATING...]
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="kernel-section">
        <h2>Generate Figure</h2>
        <form onSubmit={handleSubmit} className="kernel-form">
          <div className="kernel-form-row">
            <span className="kernel-form-label">Upload Image:</span>
            <input
              type="checkbox"
              checked={showFileUpload}
              onChange={(e) => setShowFileUpload(e.target.checked)}
            />
            <label style={{ marginLeft: '4px', fontSize: '12px' }}>Enable image upload</label>
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
            <span className="kernel-form-label">Prompt:</span>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: '500px', height: '120px' }}
              disabled={isGenerating}
            />
          </div>
          
          <div className="kernel-form-row">
            <span className="kernel-form-label"></span>
            <button type="submit" disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Figure'}
            </button>
            <button 
              type="button" 
              onClick={() => setPrompt(DEFAULT_PROMPT)} 
              style={{ marginLeft: '8px' }}
            >
              Reset to Default
            </button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="kernel-section">
        <h2>Instructions</h2>
        <ul>
          <li>Upload a character illustration (optional)</li>
          <li>Modify the prompt if needed (default creates 1/7 scale figure)</li>
          <li>Click "Generate Figure" to create the image</li>
          <li>Download the result when ready</li>
        </ul>
      </div>
    </div>
  );
};