# AI 加密貨幣交易系統 (AI Crypto Trading System)

一個基於 React + TypeScript 的現代化 AI 加密貨幣交易管理平台，提供完整的交易監控、代理管理和成本分析功能。

## 專案特色

- 🤖 **AI 代理管理** - 智慧交易代理設計和監控
- 📊 **即時交易儀表板** - 完整的投資組合分析和交易記錄
- 💰 **API 成本監控** - 多維度的 AI 服務成本分析
- 🌍 **多語言支援** - 支援繁中、簡中、英文、日文、韓文
- 🔐 **企業級安全** - 加密的 API 金鑰管理和身份驗證
- 🎨 **現代化介面** - Tailwind CSS + 深色模式支援

## 技術棧

### 核心技術
- ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react) 前端框架
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?logo=typescript) 類型安全
- ![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite) 構建工具
- ![React Router](https://img.shields.io/badge/React_Router-6.26.2-CA4245?logo=react-router) 路由管理

### UI/UX 相關
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss) 樣式框架
- ![Recharts](https://img.shields.io/badge/Recharts-2.12.7-FF6C37) 圖表組件
- ![ReactFlow](https://img.shields.io/badge/ReactFlow-12.3.0-FF0072) 流程圖編輯器
- ![Lucide React](https://img.shields.io/badge/Lucide-0.441.0-000000) 圖標庫

## 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```
應用將在 `http://localhost:3000` 啟動

### 其他指令
```bash
npm run build    # 建置生產版本
npm run lint     # 代碼檢查
npm run preview  # 預覽建置結果
```

## 功能架構

### 🏠 交易儀表板 (Trading Dashboard)
- **帳戶總覽**: 總餘額、保證金使用率、日損益統計
- **視覺化分析**: 
  - 投資組合配置圓餅圖 (BTC, ETH, SOL, ADA)
  - 帳戶餘額歷史趨勢
  - 損益分析柱狀圖
- **交易記錄**: 即時交易記錄表格，支援狀態標籤

### 💳 API 成本監控 (API Cost Monitoring)
- **成本統計**: 月度總成本、LLM API 占比、每筆交易成本
- **多維度分析**:
  - 按供應商的成本分布堆疊圖
  - 模型使用分布圓餅圖
  - 日使用量趨勢 (代幣數 vs 成本)
- **支援服務商**: 
  - OpenAI (GPT-4o, GPT-4.1, GPT-o3)
  - Anthropic (Sonnet 4, Opus 4, Haiku 3.5)
  - Deepseek (R1, V3)
  - Gemini (2.5 Pro, 2.5 Flash)
  - Ollama (本地模型，零成本)
- **進階功能**: 日期篩選、服務篩選、數據導出

### 🤖 代理管理 (Agent Management)
- **AI 代理清單**: BTC/ETH/SOL 分析師、市場情緒分析器、風險管理器
- **視覺化流程編輯器**: 基於 ReactFlow 的拖拽式工作流程設計
- **代理配置**:
  - AI 模型選擇 (GPT-4, LLaMA, Mistral)
  - 運行排程 (1分鐘到每日)
  - 權限控制 (數據讀取、分析運行、交易執行)

### ⚙️ 設置中心 (Settings)
#### 一般設置
- 用戶個人資料、交易偏好、通知設定、安全認證

#### API 金鑰管理
- **多類別支援**: 交易所 API、AI 模型 API、數據來源 API
- **安全機制**: 密碼驗證、金鑰加密存儲、顯示/隱藏切換
- **支援交易所**: Binance, OKX, BingX, Bitget, Pionex

#### 模型管理
- **雲端模型**: API 基礎的雲端 AI 模型配置
- **本地模型**: Ollama 本地運行模型管理

#### 外觀設置
- 主題模式 (淺色/深色)、字體排版、圖表樣式、動畫效果

## 專案結構

```
src/
├── components/           # 可重用組件
│   ├── Layout.tsx       # 主佈局組件
│   └── settings/        # 設置相關組件
│       ├── api-keys.tsx
│       ├── models.tsx
│       ├── flows.tsx
│       ├── appearance.tsx
│       └── PasswordAuthModal.tsx
├── contexts/            # React Context
│   └── LanguageContext.tsx
├── pages/              # 頁面組件
│   ├── TradingDashboard.tsx
│   ├── ApiCostMonitoring.tsx
│   ├── AgentManagement.tsx
│   └── Settings.tsx
├── App.tsx             # 應用程式入口
├── index.tsx           # React 渲染入口
└── index.css           # 全域樣式
```

## 國際化支援

系統支援以下語言：
- 🇺🇸 English (en)
- 🇹🇼 繁體中文 (zh)
- 🇨🇳 簡體中文 (zh-cn)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)

語言切換無需重新載入頁面，所有 UI 元素均已完整翻譯。

## 開發特點

- ✅ **TypeScript 嚴格模式** - 完整的類型檢查和智能提示
- ✅ **ESLint 配置** - 統一的代碼風格和最佳實踐
- ✅ **響應式設計** - 支援桌面端和移動端
- ✅ **模組化架構** - 清晰的組件分離和可重用性
- ✅ **安全性考量** - API 金鑰加密和用戶認證機制

## 瀏覽器支援

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## 授權條款

本專案採用 MIT 授權條款。

---

基於 [Magic Patterns](https://magicpatterns.com) 設計模板開發，專為金融科技和交易管理場景優化。
