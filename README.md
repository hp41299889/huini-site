# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## 開發哲學與架構準則

本專案的所有 Demo 均遵循 **「Demo 即產品 (Demo as a Product)」** 的原則：

1.  **應用程式容器化**: `Topbar` 下方的 Content 區域被視為一個未來會真正獨立部署的應用程式空間。
2.  **完整系統體驗**: 每個 Demo 不僅僅是功能展示，而必須是一個完整的系統。這包括：
    - **自主導覽**: 每個系統視需求實施自己的 `Sidebar` 或內部導航機制。
    - **業務閉環**: 具備完整的資料管理、狀態切換與使用者流程。
    - **獨立性**: 應用層與平台層（外層 Topbar）職責分離。

## Demo 系統狀態與優化清單 (TODOs)

以下是各 Demo 系統目前的狀態與已完成的調整：

### 核心優化項目
1.  **全局品牌統一**: ✅ 已完成。將所有中文字符「惠妮/慧妮/慧霓」統一更名為「惠尼」。
2.  **i18n 多語言支持**: ✅ 已完成。補全中英文翻譯文件，涵蓋導航、關於頁面及 AI 助手相關字串。
3.  **光暗模式優化**: ✅ 已完成。針對所有 Demo 頁面進行色彩對比度調整，確保在不同主題下均有優質視覺體驗。
4.  **關於頁面 (About)**: ✅ 已完成。實作包含願景、使命與聯絡方式的現代化關於頁面。
5.  **Topbar 調整**: ✅ 已完成。精簡頂部導航欄，移除冗餘連結，聚焦品牌展示。
6.  **情境化 AI 助手**: ✅ 已完成。在各 Demo 中整合專屬 AI 組件（如 ERP 顧問、LMS 導師、電商助手等），提供一致且具備情境感知能力的 AI 互動界面。

### Demo 系統調整 (已完成)
1.  **ERP 系統**: 模組化分頁與企業資料。
2.  **預定系統**: 多步驟預約流。
3.  **專案管理工具**: 任務 CRUD 與看板強化。
4.  **LMS 系統**: 側邊導覽與課程播放器優化。
5.  **CMS 系統**: 文章管理與預覽模式。
6.  **部落格平台**: 專業排版與閱讀進度條。
7.  **社群媒體動態**: 三欄式佈局與動態發布。
8.  **一頁式購物網站**: 敘事性佈局與快速結帳。
9.  **購物平台**: 篩選功能與購物車抽屜。
10. **論壇/社群**: 技術討論優化與活躍度展示。
11. **個人作品集**: 現代極簡風格與職涯時間軸。

### 未來擴充計畫 (Future Enhancements)
1.  **真實圖片替換**: 將目前的 Placeholder 替換為真實、具吸引力的圖片。
2.  **AI 實質串接**: 目前已完成 AI 組件介面，下一步將規劃串接實際的大模型服務。
