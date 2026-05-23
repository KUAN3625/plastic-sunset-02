# Plastic Sunset — 02

> Y2K × Lo-Fi 風格的專注工作空間，以 React + Three.js 打造。

## 專案簡介

Plastic Sunset 是一個沉浸式數位工作空間，融合 Y2K 美學與 Lo-Fi 氛圍。  
本版本（**02**）為精修迭代版，著重於 UI 清晰度、效能選項與互動細節優化。

## 功能特色

- **3D 場景** — 使用 React Three Fiber 渲染的日落環境，搭配 HDR 光照與後製特效
- **番茄鐘計時器** — 專注／休息循環，支援自訂時長與循環次數指示
- **音樂播放器** — Lo-Fi 背景音樂播放清單，跨頁面持續播放
- **待辦清單** — 可拖曳、編輯及切換顏色的便利貼
- **貼紙** — 可拖曳的單色圖示貼紙，雙擊可刪除
- **設定** — 音樂音量、音效音量、像素化程度及特效品質（調整 3D 效能）

## v02 更新內容

- 新增**特效品質**滑桿 — 控制 Bloom 泛光、像素化、暗角、鏡頭晃動及陰影解析度
- 像素化滑桿即時連動 3D 場景
- 情緒面板改為**圖示貼紙系統**（12 種 Lucide 圖示，支援拖曳及雙擊刪除）
- 待辦清單清除按鈕需二次確認，同時清除貼紙
- 音樂播放器控制按鈕改用 Lucide 圖示
- 番茄鐘循環指示器重新設計為點狀進度列
- 番茄鐘狀態標籤加入色點顯示（綠色／藍色／琥珀色）
- 全域捲軸樣式改為玻璃擬態 UI 風格
- 設定頁面 RWD 修正 — 完整可捲動，填滿視窗高度
- 光照改善：半球光、補光反射光、陰影截錐調校

## 技術架構

| | |
|---|---|
| 框架 | React 18 + Vite |
| 3D | React Three Fiber · Three.js · @react-three/drei |
| 後製特效 | @react-three/postprocessing |
| 狀態管理 | Zustand |
| 音訊 | Howler.js |
| 圖示 | Lucide React |
| 樣式 | Tailwind CSS v4 |
| 部署 | Firebase Hosting |

## 快速開始

```bash
npm install
npm run dev
```

## 版權聲明

音樂：[HoliznaCC0](https://freemusicarchive.org/music/holiznacc0/) — CC0 授權
