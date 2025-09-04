# Nano-Banana Figure Generator 🍌

专业的1/7比例手办渲染工具，基于 Google Gemini 和 nano-banana 模型技术

## 特性

- **一键生成** - 无需配置，即开即用
- **专业手办渲染** - 专门优化的 nano-banana 模型
- **1/7 比例输出** - 标准商业化手办尺寸
- **场景化展示** - 电脑桌场景 + ZBrush建模过程 + 万代包装盒
- **极简界面** - kernel.org 风格，纯功能设计

## 使用方法

1. **上传角色插画** - 支持 JPG, PNG, WebP, GIF 格式
2. **点击生成** - 自动使用 nano-banana 专业提示词
3. **等待处理** - 10-30秒生成时间
4. **下载结果** - 高质量手办渲染图

## 生成效果

每次生成都包含：
- **1/7 比例商业化手办**放置在电脑桌上
- **透明亚克力圆形底座**（无文字）
- **电脑屏幕显示** ZBrush 建模过程
- **万代风格包装盒**印有原画作品
- **现实感环境渲染**

## 技术规格

- **AI模型**: Google Gemini 2.0 Flash Exp
- **处理模式**: nano-banana 专业手办生成
- **前端技术**: React + TypeScript + Vite
- **设计风格**: kernel.org 极简主义
- **部署平台**: Vercel

## 在线访问

🌐 **https://banana.eos3.ai**

## 本地开发

```bash
# 克隆项目
git clone https://github.com/jetsons-zz/eos3-banana.git
cd eos3-banana

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173/
```

## 项目结构

```
src/
├── components/
│   ├── ChatInterface.tsx    # 主界面（上传+生成）
│   └── FileUpload.tsx       # 图片上传组件
├── utils/
│   └── gemini.ts            # Gemini API集成
└── types/
    └── index.ts             # TypeScript类型
```

## 核心提示词

```
Use the nano-banana model to create a 1/7 scale commercialized figure 
of the character in the illustration, in a realistic style and environment. 
Place the figure on a computer desk, using a circular transparent acrylic 
base without any text. On the computer screen, display the ZBrush modeling 
process of the figure. Next to the computer screen, place a BANDAI-style 
toy packaging box printed with the original artwork.
```

## 部署

支持一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jetsons-zz/eos3-banana)

## License

MIT License

## 技术致谢

- Google Gemini API
- nano-banana 模型技术
- kernel.org 设计理念

---

**Powered by EOS3** | 🤖 Generated with [Claude Code](https://claude.ai/code)