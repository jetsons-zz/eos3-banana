import React, { useState } from 'react';
import { Search, Tag, Heart, Star } from 'lucide-react';
import { promptCategories, getPopularPrompts, searchPrompts } from '../data/prompts';
import { Prompt } from '../types';

interface PromptSelectorProps {
  onSelectPrompt: (prompt: string) => void;
  className?: string;
}

export const PromptSelector: React.FC<PromptSelectorProps> = ({
  onSelectPrompt,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Prompt[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchResults(searchPrompts(query));
      setSelectedCategory('search');
    } else {
      setSelectedCategory('popular');
    }
  };

  const getDisplayPrompts = () => {
    if (selectedCategory === 'search') {
      return searchResults;
    }
    if (selectedCategory === 'popular') {
      return getPopularPrompts();
    }
    return promptCategories.find(cat => cat.id === selectedCategory)?.prompts || [];
  };

  const displayPrompts = getDisplayPrompts();

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索提示词..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory('popular');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'popular'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Star className="w-4 h-4 inline mr-1" />
            热门推荐
          </button>
          {promptCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {displayPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onSelectPrompt(prompt.content)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">{prompt.title}</h4>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="w-4 h-4 mr-1 text-red-400" />
                {prompt.popularity}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {prompt.content}
            </p>
            <div className="flex flex-wrap gap-1">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {displayPrompts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {selectedCategory === 'search' ? '未找到相关提示词' : '暂无提示词'}
        </div>
      )}
    </div>
  );
};