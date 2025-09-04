import { PromptCategory } from '../types';

// 示例图片URL（实际项目中应该使用真实的图片）
const getImageUrl = (category: string, index: number) => {
  return `https://picsum.photos/400/200?random=${category}-${index}`;
};

export const promptCategories: PromptCategory[] = [
  {
    id: 'character',
    name: '人物角色',
    description: '各种风格的人物角色生成',
    prompts: [
      {
        id: 'anime-girl',
        title: '二次元少女',
        content: 'cute anime girl, big eyes, colorful hair, school uniform, soft lighting, detailed face, high quality, 4k',
        tags: ['二次元', '少女', '可爱'],
        category: 'character',
        popularity: 95,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
      },
      {
        id: 'cyberpunk-warrior',
        title: '赛博朋克战士',
        content: 'cyberpunk warrior, neon lights, futuristic armor, glowing eyes, city background, rain, dramatic lighting',
        tags: ['赛博朋克', '战士', '未来'],
        category: 'character',
        popularity: 88,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop'
      },
      {
        id: 'fantasy-mage',
        title: '奇幻法师',
        content: 'fantasy wizard, magical staff, flowing robes, mystical aura, ancient library, spell casting, detailed',
        tags: ['奇幻', '法师', '魔法'],
        category: 'character',
        popularity: 82,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'landscape',
    name: '风景场景',
    description: '美丽的自然和城市风景',
    prompts: [
      {
        id: 'sunset-mountain',
        title: '山脉日落',
        content: 'majestic mountain range at sunset, golden hour, dramatic clouds, reflection in lake, peaceful, ultra HD',
        tags: ['山脉', '日落', '自然'],
        category: 'landscape',
        popularity: 92,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
      },
      {
        id: 'cyberpunk-city',
        title: '赛博朋克城市',
        content: 'cyberpunk cityscape, neon signs, flying cars, towering skyscrapers, rain, night scene, detailed',
        tags: ['赛博朋克', '城市', '霓虹'],
        category: 'landscape',
        popularity: 89,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop'
      },
      {
        id: 'cherry-blossom',
        title: '樱花小径',
        content: 'cherry blossom path, pink petals falling, traditional Japanese garden, peaceful, spring, soft lighting',
        tags: ['樱花', '日式', '春天'],
        category: 'landscape',
        popularity: 85,
        imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'art-style',
    name: '艺术风格',
    description: '不同艺术风格的创作',
    prompts: [
      {
        id: 'oil-painting',
        title: '油画风格',
        content: 'oil painting style, brush strokes visible, classic composition, warm colors, museum quality',
        tags: ['油画', '经典', '艺术'],
        category: 'art-style',
        popularity: 78,
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop'
      },
      {
        id: 'watercolor',
        title: '水彩画风',
        content: 'watercolor painting, soft edges, transparent colors, paper texture, delicate, artistic',
        tags: ['水彩', '柔和', '艺术'],
        category: 'art-style',
        popularity: 75,
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop'
      },
      {
        id: 'pixel-art',
        title: '像素艺术',
        content: '8-bit pixel art style, retro gaming, vibrant colors, blocky design, nostalgic',
        tags: ['像素', '复古', '游戏'],
        category: 'art-style',
        popularity: 73,
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'animals',
    name: '动物世界',
    description: '各种可爱和威猛的动物',
    prompts: [
      {
        id: 'cute-cat',
        title: '可爱小猫',
        content: 'adorable kitten, fluffy fur, big eyes, playing, soft lighting, high detail, kawaii style',
        tags: ['小猫', '可爱', '毛茸茸'],
        category: 'animals',
        popularity: 94,
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=200&fit=crop'
      },
      {
        id: 'majestic-dragon',
        title: '威严巨龙',
        content: 'majestic dragon, detailed scales, breathing fire, mountain lair, epic, fantasy art style',
        tags: ['巨龙', '奇幻', '威严'],
        category: 'animals',
        popularity: 87,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
      },
      {
        id: 'ocean-whale',
        title: '深海鲸鱼',
        content: 'blue whale in deep ocean, underwater, sunbeams, peaceful, realistic, marine life',
        tags: ['鲸鱼', '海洋', '深海'],
        category: 'animals',
        popularity: 81,
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'food',
    name: '美食料理',
    description: '诱人的美食和料理',
    prompts: [
      {
        id: 'japanese-ramen',
        title: '日式拉面',
        content: 'steaming bowl of ramen, rich broth, perfectly cooked egg, green onions, food photography, delicious',
        tags: ['拉面', '日式', '美食'],
        category: 'food',
        popularity: 86,
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=200&fit=crop'
      },
      {
        id: 'chocolate-cake',
        title: '巧克力蛋糕',
        content: 'decadent chocolate cake, layers, rich frosting, berries on top, professional food photography',
        tags: ['巧克力', '蛋糕', '甜品'],
        category: 'food',
        popularity: 83,
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=200&fit=crop'
      },
      {
        id: 'sushi-platter',
        title: '寿司拼盘',
        content: 'elegant sushi platter, fresh fish, perfect rice, artistic presentation, Japanese cuisine',
        tags: ['寿司', '日料', '精致'],
        category: 'food',
        popularity: 80,
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=200&fit=crop'
      }
    ]
  }
];

export const getPopularPrompts = (limit = 10) => {
  const allPrompts = promptCategories.flatMap(category => category.prompts);
  return allPrompts
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const searchPrompts = (query: string) => {
  const allPrompts = promptCategories.flatMap(category => category.prompts);
  return allPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(query.toLowerCase()) ||
    prompt.content.toLowerCase().includes(query.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};