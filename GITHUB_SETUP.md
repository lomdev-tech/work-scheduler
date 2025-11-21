# GitHub 推送指南

## 📋 前置准备

1. **安装 Git**
   - 下载：https://git-scm.com/downloads
   - 安装后验证：`git --version`

2. **注册 GitHub 账号**
   - 访问：https://github.com
   - 注册新账号或登录现有账号

3. **配置 Git（首次使用）**
   
   **重要**：`--global` 是全局配置，可以在**任何目录**执行，不需要在项目目录。
   这是**一次性配置**，配置后所有 Git 仓库都会使用这些信息。
   
   ```bash
   # 可以在任意目录执行（比如桌面、文档等）
   git config --global user.name "你的名字"
   git config --global user.email "你的邮箱"
   ```
   
   **配置说明**：
   - **名字**：可以是你的真实姓名或 GitHub 用户名（建议使用真实姓名）
   - **邮箱**：**强烈建议使用 GitHub 账号绑定的邮箱**
     - 这样提交记录会自动关联到你的 GitHub 账号
     - 在 GitHub 上会显示你的头像和贡献统计
     - 如果使用其他邮箱，需要在 GitHub 设置中添加该邮箱才能关联
   - 查看 GitHub 邮箱：访问 https://github.com/settings/emails
   - 如果不想公开邮箱，可以使用 GitHub 提供的 `noreply` 邮箱：
     - 格式：`用户名@users.noreply.github.com`
     - 例如：`yourusername@users.noreply.github.com`
   
   **验证配置**：
   ```bash
   # 查看配置是否成功
   git config --global user.name
   git config --global user.email
   ```
   
   **注意**：
   - `--global`：全局配置，所有项目共用（推荐首次使用）
   - `--local`：仅当前项目使用（在项目目录执行，不加 `--global`）
   - 如果已经配置过全局信息，可以跳过此步骤

## 🚀 推送步骤

### 步骤 1：初始化 Git 仓库

在项目根目录打开终端（PowerShell 或 CMD），执行：

```bash
# 初始化 Git 仓库
git init

# 查看当前状态
git status
```

### 步骤 2：添加所有文件

```bash
# ⚠️ 注意：git add 后面必须有内容！
# 添加所有文件到暂存区（注意有个点 .）
git add .

# 或者指定具体文件/目录
git add index.html
git add styles/
git add src/
git add *.json
git add *.md

# 查看已添加的文件
git status
```

**常见错误**：
- ❌ `git add` - 错误，没有指定文件
- ✅ `git add .` - 正确，添加当前目录所有文件
- ✅ `git add *` - 也可以，但不会添加隐藏文件

### 步骤 3：提交代码

```bash
# ⚠️ 注意：只需要执行其中一个命令，不是两个都执行！

# 方式一：简单提交（推荐新手）
git commit -m "Initial commit: Work Scheduler"

# 方式二：详细提交（推荐，信息更完整）
git commit -m "feat: 初始提交 - 工作日程安排程序

- 完成基础功能：添加、编辑、删除日程
- 实现时间冲突检测
- 支持多视图切换（今日/本周/全部）
- 支持 JSON/Markdown 导出
- 响应式设计，支持移动端
- 现代化 UI 设计"
```

**说明**：
- 两个命令**任选其一**，只需要执行一个
- 方式一：简单快速，适合快速提交
- 方式二：信息详细，便于后续查看提交历史
- 推荐使用方式一（简单），后续可以随时查看代码了解功能

### 步骤 4：在 GitHub 创建仓库

#### 方法一：通过网页创建（推荐）

1. 访问 https://github.com
2. 点击右上角 **"+"** → **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `work-scheduler`（或你喜欢的名字）
   - **Description**: `高颜值、现代化、响应式的 Web 版工作日程安排程序`
   - **Visibility**: 
     - ✅ Public（公开，推荐）
     - ⬜ Private（私有）
4. **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
5. 点击 **"Create repository"**

#### 方法二：使用 GitHub CLI（如果已安装）

```bash
gh repo create work-scheduler --public --source=. --remote=origin --push
```

### 步骤 5：添加远程仓库

创建仓库后，GitHub 会显示仓库 URL，类似：
- HTTPS: `https://github.com/你的用户名/work-scheduler.git`
- SSH: `git@github.com:你的用户名/work-scheduler.git`

**使用 HTTPS（推荐新手）：**

```bash
# 添加远程仓库（替换为你的实际 URL）
git remote add origin https://github.com/你的用户名/work-scheduler.git

# 验证远程仓库
git remote -v
```

**使用 SSH（需要配置 SSH 密钥）：**

```bash
git remote add origin git@github.com:你的用户名/work-scheduler.git
```

### 步骤 6：推送代码

```bash
# 重命名主分支为 main（如果还没有）
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**首次推送可能需要登录：**
- 如果使用 HTTPS，会提示输入 GitHub 用户名和密码
- 密码需要使用 **Personal Access Token**（见下方说明）

### 步骤 7：验证推送

1. 访问你的 GitHub 仓库页面
2. 刷新页面，应该能看到所有文件
3. 检查文件是否完整

## 🔐 GitHub 身份验证

### 使用 Personal Access Token（HTTPS）

GitHub 已不再支持密码登录，需要使用 Personal Access Token：

1. **生成 Token**
   - 访问：https://github.com/settings/tokens
   - 点击 **"Generate new token"** → **"Generate new token (classic)"**
   - 填写信息：
     - **Note**: `Work Scheduler Project`
     - **Expiration**: 选择过期时间（建议 90 天或 No expiration）
     - **Select scopes**: 勾选 `repo`（完整仓库权限）
   - 点击 **"Generate token"**
   - **重要**：复制生成的 token（只显示一次）

2. **使用 Token**
   ```bash
   # 推送时，用户名输入你的 GitHub 用户名
   # 密码输入刚才复制的 Personal Access Token
   git push -u origin main
   ```

3. **保存凭据（Windows）**
   - Git 会自动使用 Windows 凭据管理器保存
   - 下次推送不需要再次输入

### 使用 SSH 密钥（推荐）

1. **检查是否已有 SSH 密钥**
   ```bash
   ls -al ~/.ssh
   ```

2. **生成新的 SSH 密钥**
   ```bash
   ssh-keygen -t ed25519 -C "你的邮箱"
   # 按回车使用默认路径
   # 设置密码（可选，建议设置）
   ```

3. **添加 SSH 密钥到 GitHub**
   ```bash
   # 复制公钥内容
   cat ~/.ssh/id_ed25519.pub
   # 或 Windows PowerShell
   Get-Content ~/.ssh/id_ed25519.pub
   ```
   
   然后：
   - 访问：https://github.com/settings/keys
   - 点击 **"New SSH key"**
   - **Title**: `Work Scheduler`
   - **Key**: 粘贴刚才复制的公钥
   - 点击 **"Add SSH key"**

4. **测试连接**
   ```bash
   ssh -T git@github.com
   ```

## 📝 后续更新代码

推送后，如果需要更新代码：

```bash
# 1. 查看修改的文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述你的修改内容"

# 4. 推送到 GitHub
git push
```

## 🎯 完整命令示例

```bash
# 1. 初始化仓库
git init

# 2. 添加文件
git add .

# 3. 提交
git commit -m "Initial commit: Work Scheduler"

# 4. 添加远程仓库（替换为你的 URL）
git remote add origin https://github.com/你的用户名/work-scheduler.git

# 5. 重命名分支
git branch -M main

# 6. 推送
git push -u origin main
```

## ❓ 常见问题

### 问题 1：提示 "remote origin already exists"

**解决**：
```bash
# 查看现有远程仓库
git remote -v

# 删除现有远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/你的用户名/work-scheduler.git
```

### 问题 2：推送被拒绝 "rejected"

**解决**：
```bash
# 如果远程仓库有内容（比如 README），先拉取
git pull origin main --allow-unrelated-histories

# 解决冲突后再次推送
git push -u origin main
```

### 问题 3：需要输入用户名密码

**解决**：
- 使用 Personal Access Token 作为密码
- 或配置 SSH 密钥

### 问题 4：文件太大无法推送

**解决**：
```bash
# 检查大文件
git ls-files | xargs ls -la | sort -k5 -rn | head -10

# 如果 .gitignore 没有正确忽略，检查并更新
```

## ✅ 推送成功检查清单

- [ ] Git 仓库已初始化
- [ ] 所有文件已添加到暂存区
- [ ] 已创建首次提交
- [ ] GitHub 仓库已创建
- [ ] 远程仓库已添加
- [ ] 代码已成功推送
- [ ] GitHub 页面显示所有文件
- [ ] README.md 正确显示

## 🎉 完成

推送成功后，你的项目就可以：
- 在 GitHub 上查看和管理
- 与其他人协作
- 部署到 Vercel（自动检测 GitHub 仓库）
- 使用 GitHub Pages 部署（可选）

**下一步**：推送完成后，可以在 Vercel 中直接导入 GitHub 仓库进行部署！

