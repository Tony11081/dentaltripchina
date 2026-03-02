# DentalTripChina 部署

## 快速开始

### 方案 1: 一键部署（推荐）

```bash
sudo bash .deploy/install.sh
```

自动完成：
- Docker + Compose 安装
- Nginx 反向代理
- Let's Encrypt SSL 证书
- 应用启动

### 方案 2: Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 方案 3: Railway 云托管

1. 访问 https://railway.app
2. 用 GitHub 登录
3. New Project → Deploy from GitHub → Tony11081/dentaltripchina
4. 自动部署

---

详见 `.deploy/DEPLOYMENT_GUIDE.md`
