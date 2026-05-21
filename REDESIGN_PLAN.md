# World Cup 2026 AI Hub — 完整修改计划书 v3.0

> 给 Manus / AI 开发工具执行的详细修改指令  
> 基于用户深度浏览后的反馈 | 2026-05-21

---

## 设计哲学（执行前必读）

**核心原则五个：**

1. **做减法，不做加法** — FIFA 官网信息过载，用户来找的是"比赛时间、地点、对战双方、球队球员信息"。精确到每一个像素都要问"这能帮用户做决定吗？"
2. **白底设计** — 全局白色背景，干净编辑风格，不要暗色主题
3. **互动即情绪** — 每场比赛都可以投票"谁会赢"，每个预测入口都有"让AI来预测"按钮
4. **AI 作为辅助入口，不是主界面** — AI 预测是小按钮/小卡片，不是整页
5. **产品先于文案** — Fan Shop 第一眼看到的是产品图片，不是宣传标语

**参考设计风格：** 百度体育（简洁数据展示）、worldcupguide.ai（干净卡片布局）、worldcup-travel.com（旅行攻略信息密度）

---

## 一、全局基础修复

### 1.1 颜色系统 — 白底编辑风格

```
删除所有暗色背景变量，替换为：

--bg-primary:     #ffffff;    /* 主背景：纯白 */
--bg-secondary:   #f8f9fa;    /* 次级背景：极淡灰 */
--bg-card:        #ffffff;    /* 卡片：白 */
--border-color:   #e5e7eb;    /* 所有边框统一此色 */
--text-primary:   #111827;    /* 主文字：近黑 */
--text-secondary: #6b7280;    /* 次要文字：灰 */
--text-link:      #2563eb;    /* 链接蓝 */
--accent:         #dc2626;    /* 强调红：LIVE标签、重要信息 */
--gold:           #b8860b;    /* 金色：用于投票高亮、冠军标识 */
--green:          #16a34a;    /* 绿色：省钱数字、积极状态 */

/* 删除所有渐变、所有 box-shadow glow、所有 oklch 颜色 */
/* 所有圆角统一 8px */
/* 所有边框统一 1px solid #e5e7eb */
```

### 1.2 字体系统

```
--font-display:  'Barlow Condensed', sans-serif;  /* 大标题、比分、倒计时数字 */
--font-body:     'Inter', sans-serif;              /* 正文、导航 */
--font-mono:     'JetBrains Mono', monospace;      /* 数据、时间戳 */

/* 删除 Playfair Display、DM Sans、DM Mono — 全部统一为以上三个字体 */
```

### 1.3 全局 CSS 规则

```
- 删除所有动画（fadeUp、livePulse、tickerScroll 除外，但去掉 scale 变换）
- 删除所有卡片 hover 时的 translateY(-3px) 上浮效果
- 卡片 hover 只改变 border-color：从 #e5e7eb 到 #d1d5db
- 页面最大宽度 1280px，居中
- 移动端（<768px）：所有元素单列堆叠
```

---

## 二、顶部导航栏 — 彻底修复（对应截图1、2）

### 问题诊断
- 顶部"LIVE"滚动条无法滑动，内容显示不全
- WORLD CUP 2026 文字与其他元素叠在一起
- 布局不像一个"网站"，像一个拼凑的组件堆

### 修改指令

```
创建一个全新的 Header 组件，替换现有 FootballSidebarLayout 中的顶部区域：

┌─────────────────────────────────────────────────────────────┐
│ [⚽] WORLD CUP  │  ●LIVE  Jun 11 Mexico vs South Africa ·  │
│ [  ] 2026       │         Jun 12 USA vs Brazil ·           │
│ [  ]            │         Jun 13 France vs Germany  · · ·  │
└─────────────────────────────────────────────────────────────┘

详细规格：
━━━━━━━━━━━━━━━━━━━━━━━━━━━
左侧 Logo 方块：
  - 尺寸：固定 64px × 52px（与顶栏同高）
  - 背景色：#111827（深灰黑，不发光，无渐变）
  - 内容：⚽ 图标（20px）+ "WC" 文字（Barlow Condensed 800, 14px, 白色）
  - 下方小字："2026"（Barlow Condensed 700, 11px, #9ca3af）
  - 这是一个锐利的矩形，不是圆角卡片
  - 绝对不与其他元素重叠

右侧标题区（margin-left: 24px，物理隔离）：
  - "WORLD CUP 2026" 文字（Barlow Condensed 800, 16px, #111827）
  - 下方小字 "AI HUB"（Inter 400, 10px, #9ca3af）

LIVE 跑马灯（紧接标题区右侧，margin-left: 24px）：
  - 红色呼吸圆点（8px, #dc2626, 2秒呼吸周期，仅 opacity 变化）
  - "LIVE" 文字（Inter 700, 10px, #dc2626, 字母间距 0.1em）
  - 滚动内容：日期 + 对战双方，用 · 分隔
  - 字体：Inter 400, 12px, #6b7280
  - 滚动速度：50秒完成一个循环（比现在慢，可读）
  - 左侧有 1px 竖线分隔（#e5e7eb）

移动端（<768px）：
  - Logo 方块保留
  - LIVE 内容缩短为仅显示最近一场比赛
  - 可左右滑动
```

---

## 三、左侧导航栏 — 清理与重命名（对应截图和反馈#7）

### 修改指令

```
删除 "MATCH CENTER" 和 "FAN SURVIVAL GUIDE" 两个分组标签文字。

完整导航结构（从上到下）：

  ⚽ WORLD CUP 2026  Logo区

  🏠  Home
  📅  Match Schedule
  🤖  AI Predictions        [NEW 小徽章]
  ⭐  Player Spotlight
  🗺️  Smart Stay Guide      "Save up to $700/night" 绿色小字
  👕  Shop                  "Only 3 items · No choice paralysis" 灰色小字

导航 active 状态：
  - 左侧 3px 金色竖线（#b8860b）
  - 背景：极淡金色 rgba(184,134,11,0.06)
  - 文字颜色：#111827，字重 600

导航底部保留倒计时：
  - "KICKOFF IN" 小字（Inter 400, 9px, #9ca3af, 字母间距 0.15em）
  - 数字：Barlow Condensed 800, 22px, #b8860b
  - "Jun 11 · Azteca Stadium"（Inter 400, 10px, #9ca3af）

移动端（<768px）：
  - 底部固定 Tab Bar（5个图标：Home/Schedule/AI/Guide/Shop）
  - 白底 + 上边框 1px solid #e5e7eb
  - 当前页金色高亮
```

---

## 四、首页 — 完整重排（对应截图3和反馈#2、#3、#4）

### 布局结构（从上到下）

```
┌──────────────────────────────────────────────────┐
│              HERO BANNER（全宽，~240px高）         │
│  美加墨世界杯宣传图（大图铺满，不要新闻图）          │
│  图片上叠加文字：                                   │
│    "2026 FIFA WORLD CUP"                          │
│    "JUNE 11 – JULY 19"                            │
│    "USA · CANADA · MEXICO"                         │
│  右下角：倒计时模块（22d 16h 41m）                   │
│  左下角：🏟️ Estadio Azteca · Opening Match          │
├────────────────────┬─────────────────────────────┤
│   HOT NEWS (65%)   │   侧边栏 (35%)               │
│                    │                             │
│   "LATEST NEWS"    │  🏆 WHO WINS 2026?          │
│   新闻卡片列表      │  [8个国家国旗图标]             │
│   （自动抓取）      │  [每个国家队名+得票百分比]     │
│   每张卡片：        │  [投票按钮]                  │
│   - 标签（PREVIEW/ │  [让AI预测 →] 入口           │
│     ANALYSIS）     │                             │
│   - 标题           │  📅 NEXT MATCH              │
│   - 摘要           │  两队国旗 + 队名 + 时间       │
│   - 时间戳         │  AI胜率预测进度条             │
│   - 图片（从新闻源  │  [View Match →]             │
│     自动获取）      │                             │
│                    │  🔗 QUICK LINKS             │
│   UPCOMING MATCHES │  · Smart Stay Guide         │
│   对战卡片列表      │  · Fan Shop                 │
│   每张卡片：        │  · AI Predictor             │
│   - 日期 + 时间     │                             │
│   - 两队国旗 + 队名 │                             │
│   - 场地            │                             │
│   - 状态标签        │                             │
│   - [点击进入       │                             │
│      比赛详情页]    │                             │
│                    │                             │
│   FAN TALK         │                             │
│   评论区            │                             │
└────────────────────┴─────────────────────────────┘
```

### 逐个区块修改指令

#### 4.1 Hero Banner

```
❌ 删除：现在的大标题 "YOUR UNFAIR WORLD CUP ADVANTAGE"
❌ 删除：双 CTA 按钮（Ask AI / Find Hotels）
❌ 删除：倒计时在右侧的大数字模块

✅ 改为：
  全宽图片横幅，高度 240px（桌面端）/ 180px（移动端）

  图片：
    使用美加墨世界杯官方宣传图风格
    Unsplash 搜索关键词："world cup stadium aerial"
    推荐图片 URL：
    https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1400&q=80

  图片上叠加半透明遮罩：
    linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)

  左侧文字（绝对定位，左下角）：
    "2026 FIFA WORLD CUP"
    字体：Barlow Condensed 800, 36px, 白色
    "JUNE 11 – JULY 19 · USA · CANADA · MEXICO"
    字体：Inter 400, 14px, rgba(255,255,255,0.8)

  右侧（绝对定位，右下角）：
    倒计时：22d 16h 41m
    数字：Barlow Condensed 800, 48px, 白色
    标签：Inter 400, 10px, rgba(255,255,255,0.6), 字母间距 0.1em
    底部：🏟️ Estadio Azteca · Opening Match
```

#### 4.2 投票区（右侧栏第一模块）

```
❌ 删除：Golden Boot Poll 独立模块
❌ 删除：显示百分比的数字

✅ 改为：只保留 TROPHY PREDICTOR

  标题："🏆 WHO WINS 2026?"
  副标题："Tap a flag to vote"

  布局：2列 × 4行，共8个国家
  每个国家卡片：
    尺寸：约 80px × 90px
    国旗图片：50×35px（用 flagcdn.com 的国旗 API，不要用 emoji）
    国家名称：Inter 500, 11px, #111827
    得票百分比：Inter 600, 12px, #b8860b
    细小进度条在下方（高度 3px）
    
    ❌ 不要用 emoji 国旗（🇧🇷🇫🇷🇦🇷），要用真实国旗图片
    国旗图片 URL 格式：
    https://flagcdn.com/w80/{country_code_lowercase}.png
    例如：https://flagcdn.com/w80/br.png（巴西）
          https://flagcdn.com/w80/fr.png（法国）

  已投票状态：
    用户选择的国旗卡片边框变金色
    左侧 3px 金色竖条

  底部："12,847 fans voted"（种子数据）
  最底部："🤖 Ask AI to predict →"（独立一行，链接到 AI Predictor 页面）
```

#### 4.3 新闻区（左侧主栏）

```
标题："LATEST NEWS"（左侧 3px 金色竖线 + 文字）

新闻卡片（竖排列表）：
  每张卡片：
    - 白底，1px #e5e7eb 边框，8px 圆角
    - 左侧 120px 宽缩略图，右侧文字
    - 标签（PREVIEW / ANALYSIS / TRANSFER）：无背景彩色文字，字体 Inter 600, 9px
    - 标题：Inter 600, 14px, #111827
    - 摘要：Inter 400, 12px, #6b7280，最多 2 行
    - 时间戳：JetBrains Mono 400, 10px, #9ca3af

  新闻来源：
    硬编码 4-6 条模拟新闻（现有数据结构保留）
    图片必须从 Unsplash 获取，确保能正常显示
    每张图片 URL 必须带 ?w=400&q=80&fit=crop 参数确保加载

  图片加载失败处理：
    如果图片加载失败，显示一个灰色的占位块
    fallback 背景色 #f3f4f6，中间一个 ⚽ emoji
```

#### 4.4 对战信息卡片

```
标题："UPCOMING MATCHES"

每张卡片（横排，可点击进入比赛详情页）：
  - 左侧：日期时间（Inter 600, 13px, #111827）
  - 中间：两队国旗图片（25×18px）+ 队名（Barlow Condensed 700, 16px）
  - VS 字样（Inter 400, 11px, #9ca3af）
  - 右侧：场地名（Inter 400, 11px, #6b7280）
  - 状态标签：OPENING / UPCOMING（小标签）
  - 最右侧：→ 箭头，表示可点击进入

  点击行为：
    跳转到 /match/:matchId 比赛详情二级页面（新页面，见第五章）

  卡片 hover：
    border-color 从 #e5e7eb 变为 #d1d5db（只有这个变化！）
```

#### 4.5 评论区

```
标题："FAN TALK"

保留现有评论区功能但改样式：
  - 输入框：白底，1px #e5e7eb 边框，4px 圆角
  - 发送按钮：白底，1px #b8860b 边框，文字金色
  - 评论列表：每条评论白底卡片，1px #e5e7eb 下划线分隔
  - 字体：Inter 400, 13px, #111827
  - 时间戳：JetBrains Mono 400, 10px, #9ca3af
```

---

## 五、比赛详情页 — 全新二级页面（对应反馈#4）

### 路由
```
/match/:matchId

例如：/match/mex-vs-rsa-opening
```

### 页面结构

```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Schedule        MEXICO vs SOUTH AFRICA        │
│                           Opening Match · Jun 11, 20:00  │
├──────────────────────┬──────────────────────────────────┤
│                      │  📺 BROADCAST                    │
│   🇲🇽  MEXICO        │  · FOX Sports (US)               │
│   Team info area    │  · BBC One (UK)                  │
│   (国旗大图)         │  · TSN (Canada)                  │
│                      │  · Televisa (Mexico)             │
│   VS                │                                  │
│                      │  🤖 AI PREDICTION                │
│   🇿🇦  SOUTH AFRICA  │  "Mexico 62% — Draw 28% — SA 10%"│
│   Team info area    │  [三段式进度条]                    │
│                      │  [Ask AI →]                      │
├──────────────────────┤                                  │
│                       │  📊 MATCH INFO                   │
│  ┌─ MEXICO SQUAD ──┐ │  · Venue: Estadio Azteca         │
│  │ 球员1 球员2 球员3 │ │  · Capacity: 87,523              │
│  │ [可点击]         │ │  · Referee: TBD                  │
│  │ 球员4 球员5 ...   │ │                                  │
│  │                  │ │  🗳️ WHO WILL WIN?                │
│  │ Coach: xxx       │ │  [Mexico] [Draw] [South Africa]  │
│  │ Formation: 4-3-3 │ │  投票后显示实时结果               │
│  └─────────────────┘ │                                  │
│                       │                                  │
│  ┌─ S.AFRICA SQUAD ┐│                                  │
│  │ 球员列表...       │ │                                  │
│  │ Coach: xxx       │ │                                  │
│  └─────────────────┘ │                                  │
└──────────────────────┴──────────────────────────────────┘
```

### 修改指令

```
1. 顶部：
   - ← Back to Schedule 链接（Inter 400, 12px, #2563eb）
   - 大标题：两队名 + VS（Barlow Condensed 800, 36px）
   - 副标题：赛事类型 + 日期时间（Inter 400, 13px, #6b7280）

2. 左侧（60%）：
   - 两队国旗大图（flagcdn.com 国旗 API，120×80px）
   - 队名（Barlow Condensed 700, 24px）
   - VS 标识（Barlow Condensed 800, 48px, #9ca3af）

3. 球员区（左侧下方）：
   - 每个球员是一个可点击的卡片
   - 卡片内容：球员头像（50×50px 圆形）+ 姓名 + 号码 + 位置
   - 点击球员 → 展开球员详情弹窗（Modal）
     弹窗内容：
       - 球员大图
       - 姓名、年龄、俱乐部、国家队出场次数
       - 位置、身高、体重
       - 世界杯历史进球数

4. 教练信息：
   - 教练姓名 + 国籍 + 执教战绩

5. 阵型显示：
   - 简易文本显示阵型（如 4-3-3, 4-2-3-1）
   - 不需要复杂的战术板

6. 右侧（40%）：

   模块1：📺 BROADCAST（播出信息）
     - 列出该比赛在各国的播出平台
     - 格式：平台名字 + 国家标签
     - 白底卡片，每行一个平台

   模块2：🤖 AI PREDICTION
     - AI 胜率预测（主胜-平-客胜）
     - 三段式进度条（金-灰-灰）
     - [Ask AI for detailed analysis →] 按钮
     - 小免责声明："For entertainment only"

   模块3：🗳️ FAN VOTE
     - "Who will win this match?"
     - 三个投票按钮：主队 / 平局 / 客队
     - 投票后实时显示百分比
     - 与首页冠军投票共享 voterId

7. 数据来源：
   所有比赛数据、球员数据使用硬编码的静态数据
   参考数据源：
   - FIFA 官方 squad lists
   - Transfermarkt 球员信息
   - 各大体育平台转播信息
```

---

## 六、Match Schedule 页面 — 彻底重建（对应截图5和反馈#5）

### 当前问题
"整个页面非常糟糕"

### 修改指令

```
参考百度体育的赛程页面风格：干净、信息密度高、无冗余

新页面结构：

┌─────────────────────────────────────────────┐
│  MATCH SCHEDULE                             │
│  2026 FIFA World Cup · All 104 Matches      │
├─────────────────────────────────────────────┤
│  导航标签：[Group Stage] [Round of 32]      │
│            [Round of 16] [QF] [SF] [Final]  │
├─────────────────────────────────────────────┤
│  筛选器：                                    │
│  [All Groups ▾]  [All Dates ▾]             │
├─────────────────────────────────────────────┤
│                                             │
│  GROUP A                          GROUP B   │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │ 🇺🇸 USA          │  │ 🇧🇷 Brazil       │ │
│  │ 🇨🇦 Canada       │  │ 🇦🇷 Argentina    │ │
│  │ 🇲🇽 Mexico       │  │ 🇨🇴 Colombia     │ │
│  │ 🏳 TBD          │  │ 🏳 TBD           │ │
│  │                  │  │                  │ │
│  │ Matches:         │  │ Matches:         │ │
│  │ Jun 11 🇲🇽 vs 🇿🇦 │  │ Jun 13 🇧🇷 vs 🇨🇴 │ │
│  │ Jun 12 🇨🇦 vs 🏳 │  │ Jun 13 🇦🇷 vs 🏳 │ │
│  │ Jun 16 🇺🇸 vs 🇨🇦 │  │ Jun 17 🇧🇷 vs 🇦🇷 │ │
│  │ ...              │  │ ...              │ │
│  └──────────────────┘  └──────────────────┘ │
│                                             │
│  GROUP C ...                                │
└─────────────────────────────────────────────┘

分组卡片设计：
  - 白底，1px #e5e7eb 边框，8px 圆角
  - 小组标题：Barlow Condensed 700, 18px, #111827
  - 球队列表：国旗图片（25×18px, flagcdn.com）+ 球队名
  - 下方比赛列表：
    每行一条比赛：
      日期（JetBrains Mono 400, 11px）+
      国旗 + 队名 VS 国旗 + 队名 +
      场地名（11px, #6b7280）
      → 可点击进入比赛详情页

  - 已完成比赛：显示比分（Barlow Condensed 800, 20px）
  - 未开始比赛：显示开赛时间（Inter 500, 13px）

淘汰赛阶段：
  - 经典的树形淘汰赛图（Bracket View）
  - 每场比赛一行
  - 左边队伍 VS 右边队伍
  - 已确定的队伍显示国旗+队名
  - 未确定的显示 "Winner of R16-1" 等
```

---

## 七、AI Predictions + Player Spotlight — 简洁重建（反馈#6）

### 修改指令

```
参考百度体育的"分析"tab：

AI Predictions 页面：

┌─────────────────────────────────────────────┐
│  🤖 AI MATCH PREDICTIONS                    │
│  Powered by Gemini · Updated daily          │
├─────────────────────────────────────────────┤
│                                             │
│  选择比赛：[下拉选择器，列出所有即将进行的比赛] │
│                                             │
│  选中比赛后显示：                             │
│                                             │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │ 🇲🇽 Mexico       │  │ 🇿🇦 South Africa │ │
│  │                  │  │                  │ │
│  │ Win: 62%         │  │ Win: 10%         │ │
│  └──────────────────┘  └──────────────────┘ │
│          Draw: 28%                           │
│                                             │
│  AI Analysis:                               │
│  "Mexico enters as heavy favorites with     │
│   home advantage at Estadio Azteca..."       │
│                                             │
│  Key Factors:                               │
│  · Home advantage at 7,200ft altitude       │
│  · Mexico's 4-3-3 counters SA's 4-4-2       │
│  · SA's defense has conceded in last 5 games│
│                                             │
│  [🤖 Ask AI a follow-up question →]         │
└─────────────────────────────────────────────┘


Player Spotlight 页面：

  - 球员卡片列表（3列网格）
  - 每张卡片：
    球员头像（圆形，80×80px，Unsplash 真实照片）
    姓名（Barlow Condensed 700, 20px）
    国旗 + 国家队（Inter 400, 12px, #6b7280）
    俱乐部（Inter 500, 13px, #111827）
    位置标签（FW/MF/DF/GK）
    AI 预测进球数（JetBrains Mono 500, 16px, #b8860b）
    [View Profile →] 链接

  - 顶部筛选：All / FW / MF / DF / GK
  - 搜索框：按名字搜索球员
```

---

## 八、Smart Stay Guide — AI 搜索集成（反馈#8）

### 修改指令

```
当前页面保留城市卡片布局，但增加 AI 搜索入口：

页面顶部（Hero 下方）新增：

┌─────────────────────────────────────────────┐
│  🤖 AI-POWERED HOTEL SEARCH                 │
│                                             │
│  "I'm attending [选择城市 ▾] on [选择日期 ▾]  │
│   with a budget of [$ ▾] per night"          │
│                                             │
│  [🔍 Find Smart Stays]                      │
│                                             │
│  AI will search for:                         │
│  · Budget hotels in safe neighborhoods       │
│  · Transit routes to the stadium             │
│  · Real guest reviews summary               │
│  · Price comparison vs. peak rates           │
└─────────────────────────────────────────────┘

底部添加说明：
  "AI searches across Booking.com, Airbnb, Hostelworld and local platforms.
   Results are independently verified. Affiliate links may earn commission."

注意事项：
  - AI 搜索功能目前用模拟数据展示
  - 预留接入真实搜索 API 的接口
  - 搜索结果以卡片列表方式展示（与设计文档中城市卡片一致）
```

---

## 九、Fan Shop / Supporter Kit — 产品优先（反馈#9）

### 修改指令

```
❌ 删除：
  - 所有大写宣传语（"THE 2026 PITCH PACK. WEAR THE PASSION."）
  - 过长的产品描述
  - 复杂的 trust badges

✅ 改为：第一眼看到的是三件产品

页面结构：

┌─────────────────────────────────────────────┐
│  SHOP · World Cup 2026 Collection           │
│  Only 3 items. No choice paralysis.         │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │          │  │          │  │          │  │
│  │ [HOODIE] │  │ [TOTE]   │  │ [CAP]    │  │
│  │  图片    │  │  图片    │  │  图片    │  │
│  │          │  │          │  │          │  │
│  │ $45.00   │  │ $19.99   │  │ $24.99   │  │
│  │          │  │          │  │          │  │
│  │ [Buy →]  │  │ [Buy →]  │  │ [Buy →]  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                                             │
│  🚚 Free shipping on orders over $50        │
│  🌱 Printed on demand · Zero waste          │
│  🇺🇸 Printed in the USA                      │
│                                             │
│  [Questions? Contact us →]                   │
└─────────────────────────────────────────────┘

产品图片：
  使用 Unsplash 真实产品图：
  - Hoodie: https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85
  - Tote: https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85
  - Cap: https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85

产品卡片：
  - 白底，1px #e5e7eb 边框，8px 圆角
  - 图片在上（全宽，高度 300px，object-fit: cover）
  - 产品名在下（Inter 600, 14px）
  - 价格（Inter 700, 18px, #111827）
  - [Buy →] 按钮：白底 1px #b8860b 边框，文字金色，hover 填充淡金背景

底部信息条（简化版）：
  - 只保留三行小字，灰底背景
  - 无图标，纯文字，Inter 400, 11px, #6b7280
```

---

## 十、执行优先级

```
优先级 1 🔴（今天必须做）：
  1. 全局白底颜色系统替换（第一章）
  2. 顶部导航栏修复（第二章）
  3. 左侧导航清理（第三章）
  4. 投票区加国旗图片（第四章 4.2）

优先级 2 🟡（本周完成）：
  5. 首页 Hero Banner 改为宣传图（第四章 4.1）
  6. Match Schedule 页面重建（第六章）
  7. 比赛详情二级页面（第五章）
  8. Fan Shop 产品优先（第九章）

优先级 3 🟢（下周完成）：
  9. AI Predictions + Player Spotlight 简洁化（第七章）
  10. Smart Stay Guide AI 搜索入口（第八章）
  11. 球员详情弹窗
  12. 移动端全面适配
```

---

## 十一、技术实现注意事项

```
1. 所有外部图片必须用 Unsplash 或 flagcdn.com，确保能加载
2. 国旗图片统一用 https://flagcdn.com/w80/{code}.png 格式
3. 新闻图片用 Unsplash，带 ?w=400&q=80&fit=crop 参数
4. 球员头像用 Unsplash 真实足球运动员照片
5. 不要用 emoji 国旗（在 Windows 上渲染不一致）
6. 所有卡片 hover 效果仅改变 border-color
7. 删除所有 translateY/box-shadow 动画
8. 删除所有 oklch 颜色，统一用 hex
9. 字体只用 Barlow Condensed + Inter + JetBrains Mono
10. 全局最大宽度 1280px，居中
11. 移动端断点：768px
```

---

*计划书版本：v3.0 | 基于用户深度浏览反馈 | 2026-05-21*
*这份文档可以直接交给 Manus 或其他 AI 开发工具逐步执行*
