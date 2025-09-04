import React, { useState } from 'react';
import { geminiService } from '../utils/gemini';

interface ApiKeyConfigProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({
  apiKey,
  onApiKeyChange
}) => {
  const [inputValue, setInputValue] = useState(apiKey);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const valid = geminiService.validateApiKey(value);
      setIsValid(valid);
      if (valid) {
        onApiKeyChange(value);
      }
    } else {
      setIsValid(null);
    }
  };

  const getValidationMessage = () => {
    if (isValid === null) return '';
    if (isValid) return '✓ API Key 格式正确';
    return '✗ API Key 格式无效 (应以 AIza 开头)';
  };

  return (
    <div>
      <div className="kernel-form-row">
        <span className="kernel-form-label">API Key:</span>
        <input
          type="password"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入你的 Gemini API Key (AIzaSy...)"
          style={{ width: '300px' }}
        />
      </div>
      
      {isValid !== null && (
        <div className="kernel-form-row">
          <span className="kernel-form-label"></span>
          <span style={{ 
            fontSize: '11px', 
            fontFamily: 'monospace',
            color: isValid ? '#006600' : '#cc0000' 
          }}>
            {getValidationMessage()}
          </span>
        </div>
      )}

      <div className="kernel-form-row" style={{ marginTop: '8px' }}>
        <span className="kernel-form-label"></span>
        <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.3' }}>
          获取 API Key: 
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
            https://aistudio.google.com/app/apikey
          </a>
          <br/>
          选择 "Create API Key" → "Create API Key in new project"
        </div>
      </div>
    </div>
  );
};