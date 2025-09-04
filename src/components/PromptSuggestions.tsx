import React, { useState } from 'react';
import { promptCategories, getPopularPrompts } from '../data/prompts';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  className?: string;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  onSelectPrompt,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  
  const getDisplayPrompts = () => {
    if (selectedCategory === 'popular') {
      return getPopularPrompts(10);
    }
    return promptCategories.find(cat => cat.id === selectedCategory)?.prompts.slice(0, 10) || [];
  };

  const displayPrompts = getDisplayPrompts();

  return (
    <div className={className}>
      {/* Category Selection */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>分类:</span>
        <button
          onClick={() => setSelectedCategory('popular')}
          style={{
            marginRight: '4px',
            backgroundColor: selectedCategory === 'popular' ? '#f0f0f0' : '#ffffff'
          }}
        >
          热门推荐
        </button>
        
        {promptCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              marginRight: '4px',
              backgroundColor: selectedCategory === category.id ? '#f0f0f0' : '#ffffff'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Prompts Table */}
      <table className="kernel-table">
        <thead>
          <tr>
            <th style={{ width: '30px' }}>#</th>
            <th style={{ width: '150px' }}>标题</th>
            <th>提示词内容</th>
            <th style={{ width: '100px' }}>标签</th>
            {selectedCategory === 'popular' && <th style={{ width: '60px' }}>热度</th>}
            <th style={{ width: '80px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {displayPrompts.map((prompt, index) => (
            <tr key={prompt.id}>
              <td>{index + 1}</td>
              <td style={{ fontWeight: 'bold' }}>{prompt.title}</td>
              <td>
                <div className="kernel-code" style={{ 
                  maxWidth: '300px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {prompt.content}
                </div>
              </td>
              <td>
                <div style={{ fontSize: '11px' }}>
                  {prompt.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} style={{ marginRight: '4px', color: '#666666' }}>
                      {tag}
                    </span>
                  ))}
                  {prompt.tags.length > 2 && (
                    <span style={{ color: '#999999' }}>+{prompt.tags.length - 2}</span>
                  )}
                </div>
              </td>
              {selectedCategory === 'popular' && (
                <td style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                  {prompt.popularity}
                </td>
              )}
              <td>
                <button 
                  onClick={() => onSelectPrompt(prompt.content)}
                  style={{ fontSize: '11px', padding: '2px 6px' }}
                >
                  使用
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stats */}
      <div className="kernel-status">
        Total prompts in {selectedCategory === 'popular' ? '热门推荐' : promptCategories.find(c => c.id === selectedCategory)?.name}: {displayPrompts.length}
      </div>

      {/* Empty State */}
      {displayPrompts.length === 0 && (
        <div style={{ padding: '16px', textAlign: 'center', color: '#666666' }}>
          No prompts available in this category.
        </div>
      )}
    </div>
  );
};