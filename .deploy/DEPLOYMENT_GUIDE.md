# DentalTripChina 部署完整指南

## 📊 部署进度

✅ **已完成**：
- GitHub 仓库创建 + 源码推送
  - GitHub: https://github.com/Tony11081/dentaltripchina
  - 分支: main
  
- Cloudflare DNS 配置
  - Zone ID: 9f482f8ad69cab58b6aa9e49c89a26be
  - 状态: ✅ 创建完成
  - NS 已更新: konnor.ns.cloudflare.com / zainab.ns.cloudflare.com
  
- Docker 部署配置
  - Dockerfile ✅
  - docker-compose.yml ✅
  - docker-compose.prod.yml ✅

---

## 🚀 部署方案（4 选 1）

### **方案 1️⃣ - 一键自动部署（推荐）**

在你的 Linux 服务器（任何支持 Bash 的主机）上运行：

```bash
# 方式 A: 直接运行脚本
sudo bash /tmp/dentaltripchina-install.sh

# 方式 B: 从远程 URL 运行（如果已上传到服务器）
sudo curl https://your-server/dentaltripchina-install.sh | bash
```

**耗时**: 5-10 分钟（包括 Docker 构建 + SSL 证书配置）

**包含内容**:
- Docker + Docker Compose 自动安装
- Nginx 反向代理配置
- Let's Encrypt SSL 证书自动申请
- 自动续约 Cron 配置

---

### **方案 2️⃣ - 手动 Docker Compose**

```bash
cd /opt/dentaltripchina
git clone https://github.com/Tony11081/dentaltripchina.git .
docker-compose -f docker-compose.prod.yml up -d
```

然后自行配置 Nginx + SSL

---

### **方案 3️⃣ - Railway / Render（免费云托管）**

1. 访问 https://railway.app
2. 使用 GitHub 登录
3. 新建项目 → 连接 Tony11081/dentaltripchina 仓库
4. Railway 自动部署

**费用**: $5/月免费额度（足够）

---

### **方案 4️⃣ - 本地 Docker（开发/测试）**

```bash
cd ~/Documents/中国医疗旅游服务
docker-compose up -d
# 访问: http://localhost:3000
```

---

## 🔧 DNS 配置（重要！）

### **Cloudflare CNAME 记录**（如果用外部服务如 Railway）

1. 登录 Cloudflare: https://dash.cloudflare.com
2. 选择 dentaltripchina.com 域名
3. DNS → 添加记录:
   - **类型**: CNAME
   - **名称**: dentaltripchina.com (或 @)
   - **目标**: railway 的 CNAME（由 Railway 提供）
   - **代理状态**: Proxied

4. 同时添加 www:
   - **类型**: CNAME
   - **名称**: www
   - **目标**: dentaltripchina.com

---

## 📋 Cloudflare 当前状态

- **Zone ID**: 9f482f8ad69cab58b6aa9e49c89a26be
- **域名**: dentaltripchina.com
- **NS 记录**: 已指向 Cloudflare
  - konnor.ns.cloudflare.com
  - zainab.ns.cloudflare.com
- **状态**: ⏳ 等待 DNS 传播（可能需要 5-30 分钟）

---

## 🔐 HTTPS 配置

- **方案 1 脚本**: 自动配置 Let's Encrypt（需要 root 权限）
- **Railway/Render**: 内置 HTTPS
- **手动**: 使用 Certbot

```bash
sudo certbot --nginx -d dentaltripchina.com -d www.dentaltripchina.com
```

---

## 📊 监控 & 维护

### 查看应用日志
```bash
docker-compose logs -f
```

### 查看 Nginx 日志
```bash
tail -f /var/log/nginx/access.log
```

### 重启应用
```bash
docker-compose restart
```

### 更新应用（新代码）
```bash
cd /opt/dentaltripchina
git pull
docker-compose up -d --build
```

### 停止应用
```bash
docker-compose down
```

---

## ✅ 部署检查清单

- [ ] GitHub 仓库就绪 ✅
- [ ] Cloudflare DNS 配置 ✅ (需等待传播)
- [ ] 选择部署方案
- [ ] 执行部署脚本或手动部署
- [ ] 验证 HTTPS 连接 (https://dentaltripchina.com)
- [ ] 配置 WhatsApp 号码 (在 .env 中)
- [ ] 设置 Google Analytics ID
- [ ] 配置邮件服务 (如需要)

---

## 📞 故障排查

### 问题: 网站不可访问
**检查步骤**:
1. DNS 传播: https://www.whatsmydns.net/#A/dentaltripchina.com
2. Docker 容器是否运行: `docker ps | grep dentaltripchina`
3. Nginx 日志: `tail -f /var/log/nginx/error.log`
4. 应用日志: `docker-compose logs`

### 问题: SSL 证书错误
```bash
# 重新申请证书
sudo certbot renew --force-renewal
```

### 问题: Docker 构建失败
```bash
# 查看完整日志
docker-compose build --no-cache 2>&1 | tee build.log
```

---

## 📁 文件位置

- **部署目录**: `/opt/dentaltripchina`
- **Nginx 配置**: `/etc/nginx/sites-available/dentaltripchina.com`
- **SSL 证书**: `/etc/letsencrypt/live/dentaltripchina.com/`
- **Docker Compose 配置**: `/opt/dentaltripchina/docker-compose.prod.yml`

---

## 🎯 下一步

**选择部署方案并执行**：

1. **如果用自己的服务器**: 运行方案 1 脚本
2. **如果用 Railway/Render**: 登录平台授权 GitHub
3. **需要帮助**: 提供服务器信息，我远程协助

---

**部署包信息**:
- 生成时间: 2026-03-02 22:27
- 源代码版本: main (commit latest)
- Docker 镜像: Node 22 Alpine
- 应用框架: Next.js 16.1.6 + React 19.1.0

