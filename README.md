# EOS3 Banana 🍌

基于 Google Gemini 2.5 Flash Image Preview 的 Nano-Banana 手办生成工具

## 特性

- **极简设计** - 采用 kernel.org 风格的极简主义界面
- **专业手办生成** - 专门用于生成 1/7 比例商业化手办
- **图片参考输入** - 上传角色插画作为参考
- **预设专业提示词** - 内置优化的 nano-banana 模型提示词
- **快速生成** - 10-30秒生成专业级手办效果图

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
   git clone https://github.com/jetsons-zz/eos3-banana.git
   cd eos3-banana
   npm install
   npm run dev
   ```

3. **使用步骤**
   - 在设置页面输入 Gemini API Key
   - 可选：上传角色插画作为参考
   - 点击"Generate Figure"生成手办
   - 下载生成的图片

## 默认生成效果

应用使用专业的 nano-banana 提示词，生成包含：
- **1/7 比例商业化手办**
- **现实感的桌面环境**
- **透明亚克力圆形底座**
- **电脑屏幕显示 ZBrush 建模过程**
- **万代风格包装盒与原画**

## 项目结构

```
src/
├── components/          # React 组件
│   ├── ApiKeyConfig.tsx    # API Key 配置
│   ├── ChatInterface.tsx   # 简化主界面
│   └── FileUpload.tsx      # 图片上传
├── utils/
│   └── gemini.ts          # Gemini API 集成
└── types/
    └── index.ts           # TypeScript 类型定义
```

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jetsons-zz/eos3-banana)

## 在线访问

- **生产环境**: https://banana.eos3.ai
- **GitHub仓库**: https://github.com/jetsons-zz/eos3-banana

## License

MIT License

## 致谢

- Google Gemini API
- nano-banana 模型技术
- kernel.org 设计灵感

---

**Powered by EOS3** | 🤖 Generated with [Claude Code](https://claude.ai/code)