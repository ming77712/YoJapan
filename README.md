# 遊日本 - 電商網站

https://yo-japan.vercel.app/#/

本專案僅為學習用途，不做任何商業使用

## 專案介紹

以販售旅遊行程、景點票券為主的電商平台，亦透過文章推廣及分享相關的旅遊資訊。

## 開發工具

- `Vite` 建構開發環境
- `Vue 3` 框架開發
- `Bootstrap 5` 搭配 `Sass` 進行網頁切版
- 使用 `Pinia` 作狀態管理
- `ESLint Airbnb` ESLint Airbnb 程式碼品質控制

### 首頁

- 熱門地區，透過路由控制切換不同地區的商品
- 行程瀏覽，透過 Swiper 以卡片形式瀏覽商品
- 最新文章，以左右交錯方式呈現旅遊文章
  ![首頁](https://imgur.com/ADjVB2r.png)![首頁Mobile](https://imgur.com/5oM09Vu.png)

### 推薦行程

- 可依分類篩選商品
  ![推薦行程](https://imgur.com/2tbqrZe.png)

### 商品介紹

- 將商品加入購物車
- 隨機推薦相同分類商品
  ![商品介紹](https://imgur.com/Gp9rOuU.png)![商品介紹Mobile](https://imgur.com/kYyIooG.png)

### 最新文章

- 可觀看旅遊相關文章
  ![最新文章](https://imgur.com/FE2YybQ.png)

### 後台管理

- 可管理商品、訂單、文章
  ![後台管理](https://imgur.com/Lgd2c0J.png)

## 安裝與使用

以下將會引導你如何安裝此專案到你的電腦上。

### 安裝套件

```bash
npm install
```

### 啟動開發環境

```bash
npm run dev
```
