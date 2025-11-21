# Vercel 部署指南

## 📦 部署准备

项目已包含所有必要的配置文件：
- ✅ `vercel.json` - Vercel 配置
- ✅ `package.json` - 项目元数据
- ✅ `.vercelignore` - 忽略文件配置

## 🚀 快速部署

### 方式一：Vercel CLI（最快）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录（会打开浏览器）
vercel login

# 3. 在项目目录执行部署
vercel

# 4. 生产环境部署
vercel --prod
```

### 方式二：GitHub 集成（推荐）

1. **准备 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 中导入**
   - 访问 https://vercel.com/dashboard
   - 点击 "Add New Project"
   - 选择 GitHub 仓库
   - 点击 "Deploy"（无需配置，自动检测）

3. **自动部署**
   - 每次 `git push` 都会自动触发部署
   - 支持预览环境和生产环境

### 方式三：网页拖拽部署

1. 访问 https://vercel.com
2. 登录账号
3. 点击 "Add New Project"
4. 选择 "Upload" 或直接拖拽项目文件夹
5. 点击 "Deploy"

## ⚙️ 配置说明

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

此配置告诉 Vercel：
- 这是一个静态网站
- 所有路由都指向对应的文件
- 自动处理 ES Modules

### 环境变量（可选）

如果需要配置环境变量：
1. 在 Vercel Dashboard 中进入项目设置
2. 选择 "Environment Variables"
3. 添加所需的变量

**注意**：本项目使用 localStorage，无需服务器端环境变量。

## 🔍 部署后检查

部署成功后，检查以下内容：

1. **访问网站**
   - 打开 Vercel 提供的 URL
   - 检查页面是否正常加载

2. **检查功能**
   - ✅ 添加任务
   - ✅ 编辑任务
   - ✅ 删除任务
   - ✅ 视图切换
   - ✅ 数据导出
   - ✅ 时间冲突检测

3. **检查控制台**
   - 打开浏览器开发者工具
   - 查看 Console 是否有错误
   - 检查 Network 请求是否正常

## 🐛 常见问题

### 问题 1：模块加载失败

**症状**：控制台显示 `Failed to load module` 错误

**解决**：
- 确保 `vercel.json` 配置正确
- 检查文件路径是否正确
- 确保使用 HTTPS（Vercel 默认提供）

### 问题 2：样式未加载

**症状**：页面无样式

**解决**：
- 检查 CSS 文件路径
- 确保 `styles/theme.css` 和 `styles/style.css` 存在
- 清除浏览器缓存

### 问题 3：localStorage 不工作

**症状**：数据无法保存

**解决**：
- localStorage 在 HTTPS 下正常工作
- 检查浏览器是否允许 localStorage
- 检查是否使用了隐私模式

### 问题 4：字体未加载

**症状**：字体显示为系统默认字体

**解决**：
- Google Fonts 需要网络连接
- 检查网络连接
- 字体加载失败不影响功能，只是显示效果

## 📊 性能优化

Vercel 自动提供：
- ✅ CDN 加速
- ✅ HTTPS 证书
- ✅ 全球边缘节点
- ✅ 自动压缩
- ✅ 浏览器缓存

## 🔄 更新部署

### 通过 Git 更新（推荐）

```bash
git add .
git commit -m "Update features"
git push
```

Vercel 会自动检测并部署。

### 通过 CLI 更新

```bash
vercel --prod
```

## 📝 自定义域名

1. 在 Vercel Dashboard 进入项目设置
2. 选择 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

## 🎉 完成

部署完成后，你的应用就可以通过公网访问了！

**提示**：
- 免费版 Vercel 提供足够的资源用于个人项目
- 支持自定义域名
- 自动 HTTPS
- 全球 CDN 加速

