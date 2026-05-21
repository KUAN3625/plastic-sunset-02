#說明檔案&備忘錄

避免開發遇到忘記的情況
順便記錄遇到問題
按照順序排列開發頁面順序

Routes 路由器，管理並集成所有頁面
<Routes>

<Route path="/" element={ } />

<Routes/>

注意，路由器一定要包含在APP.JSX中


Home 包含所有程式頁面

Entry 主標題首頁畫面


Login 登入

Core 核心頁面

Todolist 

Settings 設定

About 收尾 


音樂播放器使用指南

 title

顯示在播放器畫面上的名稱。

通常是「歌曲名稱 + 演出者」。

artist

表示歌手／製作者，主要給 UI 顯示。

也可以用於排序、分類等功能。
coverUrl

封面圖片的位置。

可以是相對路徑（像 /covers/drake.jpg）或遠端網址。

在 React 中通常用於 <img src={coverUrl} /> 顯示。

4️⃣ url

真正的音樂檔案路徑。

這裡是 Amazon S3 物件儲存伺服器 的連結。

播放時會被傳入 Howler.js：