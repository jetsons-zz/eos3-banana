import React, { useState } from 'react';

interface InviteCodeModalProps {
  isOpen: boolean;
  onSubmit: (code: string) => void;
  error?: string;
}

// 预设的邀请码列表
const VALID_INVITE_CODES = [
  'NANO-BANANA-2025',
  'FIGURE-MASTER',
  'ANIME-COLLECTOR',
  'BANDAI-PRO',
  'OTAKU-VIP'
];

export const InviteCodeModal: React.FC<InviteCodeModalProps> = ({
  isOpen,
  onSubmit,
  error
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setIsValidating(true);
    
    // 模拟验证延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = VALID_INVITE_CODES.includes(inviteCode.toUpperCase().trim());
    
    setIsValidating(false);
    
    if (isValid) {
      onSubmit(inviteCode);
    } else {
      // 错误会通过props传入
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(40, 44, 51, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1e2127',
        border: '1px solid #c778dd',
        padding: '32px',
        maxWidth: '500px',
        width: '90%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: '24px', 
            marginBottom: '8px',
            fontFamily: "'Fira Code', monospace"
          }}>
            <span style={{ color: '#c778dd' }}>Nano-Banana</span> Figure Generator
          </h1>
          <p style={{ color: '#abb2bf', fontSize: '14px', margin: 0 }}>
            请输入邀请码以使用此服务
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#c778dd',
              fontSize: '14px',
              marginBottom: '8px',
              fontFamily: "'Fira Code', monospace"
            }}>
              邀请码:
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="请输入邀请码"
              disabled={isValidating}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontFamily: "'Fira Code', monospace",
                backgroundColor: '#282c33',
                border: '1px solid #abb2bf',
                color: '#ffffff',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c778dd'}
              onBlur={(e) => e.target.style.borderColor = '#abb2bf'}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '12px',
              marginBottom: '16px',
              padding: '8px',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid #ff6b6b'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inviteCode.trim() || isValidating}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontFamily: "'Fira Code', monospace",
              backgroundColor: isValidating ? '#666' : 'transparent',
              border: '1px solid #c778dd',
              color: isValidating ? '#999' : '#ffffff',
              cursor: isValidating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isValidating) {
                e.currentTarget.style.backgroundColor = '#c778dd';
                e.currentTarget.style.color = '#282c33';
              }
            }}
            onMouseLeave={(e) => {
              if (!isValidating) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
          >
            {isValidating ? '验证中...' : '验证邀请码'}
          </button>
        </form>

        {/* Help Text */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center',
          color: '#abb2bf',
          fontSize: '12px',
          fontFamily: "'Fira Code', monospace"
        }}>
          <p style={{ margin: '4px 0' }}>需要邀请码？联系管理员获取</p>
        </div>
      </div>
    </div>
  );
};