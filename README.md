# EOS3 Banana 🍌

基于 Google Gemini 2.5 Flash Image Preview 的极简 AI 图像生成工具

## 特性

- **极简设计** - 采用 kernel.org 风格的极简主义界面
- **多模态输入** - 支持纯文本和图片参考生成
- **内置提示词库** - 包含 nano-banana 热门创意提示词
- **表格化展示** - 信息密集的开发者友好界面
- **快速加载** - 无复杂依赖，纯净轻量

## 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS (极简 kernel.org 风格)
- **AI模型**: Google Gemini 2.5 Flash Image Preview
- **部署**: Vercel

## 快速开始

1. **获取 API Key**
   - 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 创建新的 API Key

2. **本地运行**
   ```bash
   git clone <repository-url>
   cd eos3-banana
   npm install
   npm run dev
   ```

3. **配置 API Key**
   - 在设置页面输入 Gemini API Key
   - 开始生成图像

## 项目结构

```
src/
├── components/          # React 组件
│   ├── ApiKeyConfig.tsx    # API Key 配置
│   ├── ChatInterface.tsx   # 主界面
│   ├── FileUpload.tsx      # 文件上传
│   └── PromptSuggestions.tsx # 提示词建议
├── data/
│   └── prompts.ts         # 提示词数据
├── utils/
│   └── gemini.ts          # Gemini API 集成
└── types/
    └── index.ts           # TypeScript 类型定义
```

## 功能说明

### 图像生成
- 输入文本描述生成图片
- 上传参考图片进行风格迁移
- 支持多种图像质量选项

### 提示词库
- **热门推荐** - 基于使用频率排序
- **分类浏览** - 角色、风景、艺术风格等
- **一键使用** - 快速填入提示词

### 存储功能
- 本地存储生成历史
- API Key 安全保存
- 支持图片下载

## 设计理念

借鉴 kernel.org 的极简主义设计哲学：
- 信息密集，功能优先
- 黑白配色，蓝色链接
- 表格化数据展示
- 无装饰元素，纯功能界面

## 开发

```bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 部署

支持一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

## License

MIT License

## 致谢

- Google Gemini API
- nano-banana 提示词库
- kernel.org 设计灵感

---

**Powered by EOS3** | 🤖 Generated with [Claude Code](https://claude.ai/code)