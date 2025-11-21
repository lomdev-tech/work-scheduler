# Vercel 部署检查清单

## ✅ 部署前检查

### 文件完整性
- [x] `index.html` - 主页面文件
- [x] `styles/theme.css` - 主题样式
- [x] `styles/style.css` - 主样式
- [x] `src/app.js` - 主应用逻辑
- [x] `src/storage.js` - 数据存储
- [x] `src/scheduler.js` - 调度逻辑
- [x] `src/ui.js` - UI 渲染
- [x] `src/modal.js` - 弹窗管理
- [x] `src/export.js` - 导出功能
- [x] `vercel.json` - Vercel 配置
- [x] `package.json` - 项目配置
- [x] `.vercelignore` - 忽略文件
- [x] `.gitignore` - Git 忽略

### 功能测试（本地）
- [ ] 页面正常加载
- [ ] 添加任务功能正常
- [ ] 编辑任务功能正常
- [ ] 删除任务功能正常
- [ ] 视图切换正常
- [ ] 时间冲突检测正常
- [ ] 数据导出正常
- [ ] 响应式布局正常（移动端测试）

### 代码检查
- [ ] 无控制台错误
- [ ] 无 lint 错误
- [ ] 所有模块正确导入
- [ ] 所有 ID 和类名匹配

## 🚀 部署步骤

### 方式一：Vercel CLI（推荐用于快速测试）

```bash
# 1. 安装 CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署（预览环境）
vercel

# 4. 部署到生产环境
vercel --prod
```

### 方式二：GitHub 集成（推荐用于生产）

1. **初始化 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Work Scheduler"
   ```

2. **推送到 GitHub**
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **在 Vercel 中导入**
   - 访问 https://vercel.com/dashboard
   - 点击 "Add New Project"
   - 选择 GitHub 仓库
   - 点击 "Deploy"

## ✅ 部署后验证

### 功能验证
- [ ] 网站可以正常访问
- [ ] 所有页面元素正常显示
- [ ] 样式正确加载
- [ ] JavaScript 功能正常
- [ ] localStorage 正常工作
- [ ] 添加任务功能正常
- [ ] 编辑任务功能正常
- [ ] 删除任务功能正常
- [ ] 视图切换正常
- [ ] 时间冲突检测正常
- [ ] 导出功能正常

### 性能检查
- [ ] 页面加载速度正常
- [ ] 资源文件正确缓存
- [ ] 移动端访问正常
- [ ] HTTPS 正常工作

### 浏览器兼容性
- [ ] Chrome 测试通过
- [ ] Firefox 测试通过
- [ ] Safari 测试通过
- [ ] Edge 测试通过
- [ ] 移动浏览器测试通过

## 🐛 问题排查

如果遇到问题，检查：

1. **控制台错误**
   - 打开浏览器开发者工具
   - 查看 Console 标签
   - 检查是否有模块加载错误

2. **网络请求**
   - 查看 Network 标签
   - 确认所有资源文件（CSS、JS）正确加载
   - 检查 HTTP 状态码

3. **Vercel 日志**
   - 在 Vercel Dashboard 查看部署日志
   - 检查构建是否成功

4. **文件路径**
   - 确认所有文件路径正确
   - 检查大小写是否匹配
   - 确认文件扩展名正确

## 📝 部署信息记录

部署完成后，记录以下信息：

- **项目 URL**: `https://your-project.vercel.app`
- **部署时间**: 
- **Vercel 项目名称**: 
- **GitHub 仓库**（如有）: 
- **自定义域名**（如有）: 

## 🎉 完成

部署成功后，你的工作日程安排程序就可以通过公网访问了！

