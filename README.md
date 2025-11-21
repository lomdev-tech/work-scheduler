# 工作日程安排程序 | Work Scheduler

一个高颜值、现代化、响应式的 Web 版工作日程安排程序，使用纯 JavaScript、HTML、CSS 构建，无需任何框架。

## ✨ 特性

- 🎨 **现代化 UI 设计** - 极简、清爽、专业的界面设计
- 📱 **完全响应式** - 完美适配 PC 和移动端
- ⚡ **纯原生实现** - 无框架依赖，性能优异
- 💾 **本地存储** - 数据自动保存到浏览器 localStorage
- 🔍 **智能冲突检测** - 自动检测并标注时间冲突
- 📊 **多视图切换** - 今日、本周、全部视图
- 📤 **数据导出** - 支持 JSON 和 Markdown 格式导出
- 🎯 **优先级管理** - P1/P2/P3 三级优先级
- 🌈 **优雅动画** - 流畅的交互动画效果

## 🚀 快速开始

### 📤 推送到 GitHub

想要将项目推送到 GitHub？查看详细指南：
- 📖 [GitHub 推送完整指南](./GITHUB_SETUP.md)
- 🚀 或直接运行脚本：
  - Windows: 双击 `push-to-github.bat`
  - Linux/Mac: `bash push-to-github.sh`

### 使用方式

1. **直接打开**
   - 双击 `index.html` 文件即可在浏览器中运行
   - 或使用本地服务器（推荐）：
     ```bash
     # 使用 Python
     python -m http.server 8000
     
     # 使用 Node.js (需要安装 http-server)
     npx http-server
     
     # 使用 VS Code Live Server 插件
     ```

2. **访问应用**
   - 打开浏览器访问 `http://localhost:8000`（如果使用服务器）
   - 或直接打开 `index.html` 文件

## 🌐 部署到 Vercel

### 方法一：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   
   按照提示完成部署，首次部署会询问：
   - 项目名称
   - 是否链接到现有项目
   - 部署目录（直接回车使用当前目录）

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

### 方法二：通过 GitHub 部署（推荐）

1. **将项目推送到 GitHub**
   
   详细步骤请查看 [GITHUB_SETUP.md](./GITHUB_SETUP.md)
   
   快速命令：
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Work Scheduler"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 中导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测配置，直接点击 "Deploy"

3. **自动部署**
   - 每次推送到 GitHub 主分支，Vercel 会自动重新部署
   - 可以在 Vercel Dashboard 查看部署历史和状态

### 方法三：通过 Vercel 网页直接部署

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 账号登录
3. 点击 "Add New Project"
4. 导入你的 Git 仓库或直接拖拽项目文件夹
5. 点击 "Deploy" 完成部署

### 部署配置说明

项目已包含以下配置文件：
- `vercel.json` - Vercel 部署配置
- `package.json` - 项目元数据
- `.vercelignore` - 部署忽略文件

### 部署后的访问

部署成功后，Vercel 会提供：
- **生产环境 URL**：`https://your-project.vercel.app`
- **预览环境 URL**：每次推送都会生成新的预览链接

### 首次使用

应用首次打开时会自动加载示例数据，您可以：
- 查看示例日程安排
- 点击右下角圆形按钮添加新日程
- 点击任务卡片上的编辑/删除按钮管理日程
- 使用顶部导航切换不同视图

## 📖 功能说明

### 核心功能

1. **新建日程**
   - 点击右下角浮动按钮（FAB）
   - 填写任务名称、日期、时间、优先级等信息
   - 保存后自动检测时间冲突

2. **编辑日程**
   - 鼠标悬停在任务卡片上显示操作按钮
   - 点击编辑按钮修改日程信息

3. **删除日程**
   - 点击删除按钮，确认后删除

4. **视图切换**
   - **今日视图**：显示今天的日程安排
   - **本周视图**：显示本周的日程安排
   - **全部视图**：显示所有日程安排
   - **日期筛选**：在左侧选择特定日期查看

5. **时间冲突检测**
   - 自动检测同一时间段的重叠任务
   - 冲突任务会以红色边框和警告标识显示

6. **数据导出**
   - 点击顶部"导出"按钮
   - 选择 JSON 或 Markdown 格式
   - 文件自动下载到本地

### 优先级说明

- **P1（高优先级）**：红色标识，重要且紧急的任务
- **P2（中优先级）**：青色标识，重要但不紧急的任务
- **P3（低优先级）**：绿色标识，一般任务

## 🎨 界面预览

### 主要界面元素

- **顶部导航栏**：视图切换和导出功能
- **左侧边栏**：日期选择和快速筛选
- **主内容区**：任务卡片列表
- **浮动按钮**：快速添加新日程
- **模态弹窗**：新增/编辑日程表单

### 设计特点

- 卡片式布局，柔和阴影和圆角
- 渐变按钮和背景
- 流畅的悬停和点击动画
- 背景模糊效果（backdrop-filter）
- 响应式网格布局

## 🌐 浏览器兼容性

### 推荐浏览器

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 功能支持

- **ES Modules**：现代浏览器均支持
- **localStorage**：所有现代浏览器支持
- **CSS Grid & Flexbox**：现代浏览器支持
- **backdrop-filter**：Chrome、Safari、Edge 支持（Firefox 需启用标志）

### 注意事项

- 需要支持 ES6+ 的现代浏览器
- 建议使用最新版本的浏览器以获得最佳体验
- 移动端浏览器完全支持

## 📁 项目结构

```
project-root/
├── index.html              # 主 HTML 文件
├── README.md              # 项目说明文档
├── styles/
│   ├── theme.css          # 主题配色与设计令牌
│   └── style.css          # 主样式文件
└── src/
    ├── app.js             # 主应用入口
    ├── storage.js         # localStorage 数据管理
    ├── scheduler.js       # 时间冲突检测与排序
    ├── ui.js              # UI 渲染与交互
    ├── modal.js           # 模态弹窗管理
    └── export.js          # 数据导出功能
```

## 🔧 技术栈

- **HTML5**：语义化标签，无障碍支持
- **CSS3**：Grid、Flexbox、动画、渐变、阴影
- **JavaScript (ES6+)**：ES Modules、箭头函数、解构赋值等
- **localStorage API**：数据持久化
- **Web APIs**：Blob、URL、File Download

## 🚧 未来扩展方向

### 计划中的功能

1. **深色模式**
   - 自动检测系统主题
   - 手动切换明暗主题
   - 保存用户偏好

2. **日历视图**
   - 月视图展示
   - 周视图展示
   - 日视图详情

3. **拖拽排序**
   - 拖拽调整任务顺序
   - 拖拽修改任务时间

4. **通知提醒**
   - 浏览器通知 API
   - 任务开始前提醒
   - 自定义提醒时间

5. **数据同步**
   - 导出/导入功能增强
   - 云端同步（可选）
   - 多设备同步

6. **任务分类**
   - 标签系统
   - 项目分组
   - 颜色标记

7. **统计分析**
   - 任务完成统计
   - 时间分布图表
   - 优先级分析

8. **搜索功能**
   - 任务名称搜索
   - 日期范围搜索
   - 高级筛选

## 📝 开发说明

### 代码特点

- **模块化设计**：功能清晰分离，易于维护
- **注释完善**：关键代码都有详细注释
- **ES6+ 语法**：使用现代 JavaScript 特性
- **响应式设计**：移动优先的设计理念

### 自定义配置

可以在 `styles/theme.css` 中修改：
- 颜色主题
- 间距大小
- 字体设置
- 阴影效果

## 📄 许可证

本项目为开源项目，可自由使用和修改。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，欢迎反馈。

---

**享受高效的工作日程管理！** 🎉

