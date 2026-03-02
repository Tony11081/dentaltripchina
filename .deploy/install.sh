#!/bin/bash
# DentalTripChina 一键部署脚本
# 用法: curl https://your-domain/install.sh | bash

set -e

DOMAIN="dentaltripchina.com"
GITHUB_REPO="https://github.com/Tony11081/dentaltripchina.git"
DEPLOY_DIR="/opt/dentaltripchina"

echo "🚀 DentalTripChina 自动部署"
echo "============================"

# 检查权限
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本必须以 root 身份运行"
   exit 1
fi

# 1. 更新系统
echo "📦 更新系统..."
apt-get update && apt-get upgrade -y

# 2. 安装 Docker
if ! command -v docker &> /dev/null; then
  echo "📦 安装 Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  systemctl enable docker
  systemctl start docker
fi

# 3. 安装 Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "📦 安装 Docker Compose..."
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

# 4. 安装 Nginx + Certbot
echo "📦 安装 Nginx 和 Certbot..."
apt-get install -y nginx certbot python3-certbot-nginx git

# 5. 克隆源码
echo "📥 克隆 GitHub 仓库..."
mkdir -p $DEPLOY_DIR
cd $DEPLOY_DIR
git clone $GITHUB_REPO . || git -C . pull

# 6. 构建并启动应用
echo "🐳 构建 Docker 镜像..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🚀 启动应用..."
docker-compose -f docker-compose.prod.yml up -d

# 等待应用启动
sleep 5

# 7. 配置 Nginx
echo "⚙️  配置 Nginx 反向代理..."
cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX_CONF'
server {
    listen 80;
    server_name dentaltripchina.com www.dentaltripchina.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}
NGINX_CONF

# 启用站点配置
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-enabled/default

# 测试 Nginx 配置
nginx -t

# 重启 Nginx
systemctl enable nginx
systemctl restart nginx

# 8. 配置 SSL 证书 (Let's Encrypt)
echo "🔐 配置 SSL 证书..."
certbot --nginx \
  -d dentaltripchina.com \
  -d www.dentaltripchina.com \
  --agree-tos \
  -m admin@dentaltripchina.com \
  -n

# 9. 配置自动更新证书
echo "🔄 配置自动更新证书 (Cron)..."
echo "0 3 * * * certbot renew --quiet" | crontab -

echo ""
echo "✅ 部署完成！"
echo ""
echo "📍 访问您的网站:"
echo "   https://dentaltripchina.com"
echo ""
echo "📊 查看日志:"
echo "   应用: docker-compose -f $DEPLOY_DIR/docker-compose.prod.yml logs -f"
echo "   Nginx: tail -f /var/log/nginx/access.log"
echo ""
echo "🛑 停止应用:"
echo "   cd $DEPLOY_DIR && docker-compose -f docker-compose.prod.yml down"
echo ""
echo "🔄 更新应用:"
echo "   cd $DEPLOY_DIR && git pull && docker-compose -f docker-compose.prod.yml up -d --build"
echo ""
