# Subdomain Deployment Guide

## Pre-Deployment Checklist

- [ ] All subdomains configured locally and tested
- [ ] Environment variables prepared for all environments
- [ ] SSL certificates obtained for all subdomains
- [ ] DNS records ready to be configured
- [ ] Database migrations completed
- [ ] Authentication configured and tested

## DNS Configuration

### Required DNS Records

Add these A records pointing to your server IP (example: `192.0.2.1`):

```
website.com              A   192.0.2.1
www.website.com          A   192.0.2.1
dashboard.website.com    A   192.0.2.1
admin.website.com        A   192.0.2.1
```

**Or use a wildcard (recommended):**
```
website.com              A   192.0.2.1
*.website.com            A   192.0.2.1
```

### Verification
```bash
nslookup dashboard.website.com
nslookup admin.website.com
```

## SSL/TLS Configuration

### Using Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate wildcard certificate
sudo certbot certonly --manual --preferred-challenges=dns -d website.com -d *.website.com

# Or use this for specific subdomains
sudo certbot certonly --manual --preferred-challenges=dns \
  -d website.com \
  -d www.website.com \
  -d dashboard.website.com \
  -d admin.website.com
```

### Using Cloudflare or similar CDN

1. Point your domain to Cloudflare
2. Set DNS records in Cloudflare for all subdomains
3. Enable SSL in Cloudflare dashboard
4. Cloudflare will handle SSL for all subdomains

## Deployment Platforms

### Vercel Deployment

1. **Connect your GitHub repository** to Vercel
2. **Add domains in Vercel dashboard**:
   - Project Settings → Domains
   - Add `website.com`
   - Add `www.website.com`
   - Add `dashboard.website.com`
   - Add `admin.website.com`

3. **Configure environment variables**:
   ```
   BETTER_AUTH_URL=https://dashboard.website.com
   BETTER_AUTH_SECRET=your-secret-key
   DATABASE_URL=your-db-url
   RESEND_API_KEY=your-resend-key
   NEXT_PUBLIC_DOMAIN=website.com
   ```

4. **Deploy**:
   - Push to main branch
   - Vercel automatically builds and deploys

### Netlify Deployment

1. **Connect your GitHub repository** to Netlify
2. **Add domains in Netlify dashboard**:
   - Domain settings
   - Add all subdomains

3. **Create `netlify.toml`** at root:
   ```toml
   [build]
   command = "npm run build"
   functions = "api"
   
   [build.environment]
   NODE_VERSION = "18"
   ```

4. **Add environment variables** in Netlify dashboard:
   ```
   BETTER_AUTH_URL=https://dashboard.website.com
   BETTER_AUTH_SECRET=your-secret-key
   DATABASE_URL=your-db-url
   RESEND_API_KEY=your-resend-key
   NEXT_PUBLIC_DOMAIN=website.com
   ```

### Self-Hosted (Nginx)

1. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone repository and install dependencies**
   ```bash
   git clone your-repo
   cd exchange-app
   npm install
   npm run build
   ```

3. **Create Nginx configuration** (`/etc/nginx/sites-available/exchange-app`):
   ```nginx
   upstream nextjs {
     server 127.0.0.1:3000;
   }

   server {
     listen 80;
     listen [::]:80;
     server_name website.com www.website.com dashboard.website.com admin.website.com;
     
     # Redirect HTTP to HTTPS
     return 301 https://$server_name$request_uri;
   }

   server {
     listen 443 ssl http2;
     listen [::]:443 ssl http2;
     server_name website.com www.website.com dashboard.website.com admin.website.com;

     ssl_certificate /etc/letsencrypt/live/website.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/website.com/privkey.pem;

     # SSL configuration (recommended)
     ssl_protocols TLSv1.2 TLSv1.3;
     ssl_ciphers HIGH:!aNULL:!MD5;
     ssl_prefer_server_ciphers on;

     location / {
       proxy_pass http://nextjs;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/exchange-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Create systemd service** (`/etc/systemd/system/exchange-app.service`):
   ```ini
   [Unit]
   Description=Exchange App
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/var/www/exchange-app
   ExecStart=/usr/bin/npm start
   Restart=always
   RestartSec=10
   Environment="NODE_ENV=production"
   Environment="DATABASE_URL=your-db-url"
   Environment="BETTER_AUTH_URL=https://dashboard.website.com"
   Environment="BETTER_AUTH_SECRET=your-secret-key"
   Environment="RESEND_API_KEY=your-resend-key"
   Environment="NEXT_PUBLIC_DOMAIN=website.com"

   [Install]
   WantedBy=multi-user.target
   ```

6. **Start the service**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable exchange-app
   sudo systemctl start exchange-app
   sudo systemctl status exchange-app
   ```

### Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**:
   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_URL=${DATABASE_URL}
         - BETTER_AUTH_URL=https://dashboard.website.com
         - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
         - RESEND_API_KEY=${RESEND_API_KEY}
         - NEXT_PUBLIC_DOMAIN=website.com
       restart: always
       networks:
         - reverse-proxy

   networks:
     reverse-proxy:
       driver: bridge
   ```

3. **Deploy with Docker**:
   ```bash
   docker-compose up -d
   ```

## Environment Variables for Production

Create a `.env.production` or set via platform:

```env
# Domain
NEXT_PUBLIC_DOMAIN=website.com

# Authentication
BETTER_AUTH_URL=https://dashboard.website.com
BETTER_AUTH_SECRET=your-strong-secret-key

# Database
DATABASE_URL=postgresql://user:password@hostname:5432/database_name

# Email
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=Paycryppt <noreply@website.com>

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Third-party services
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

## Post-Deployment Testing

### 1. Test All Domains
```bash
curl https://website.com
curl https://www.website.com
curl https://dashboard.website.com
curl https://admin.website.com
```

### 2. Test Redirects
- Visit `https://dashboard.website.com` without login → should redirect to login
- Login on dashboard → should stay on `https://dashboard.website.com/`
- Login on admin → should redirect to `https://admin.website.com/`

### 3. Test SSL
```bash
openssl s_client -connect dashboard.website.com:443
```

### 4. Test API Routes
```bash
curl https://dashboard.website.com/api/auth/callback/signin
curl https://admin.website.com/api/auth/callback/signin
```

### 5. Monitor Logs
```bash
# Vercel
vercel logs

# Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Docker
docker-compose logs -f app
```

## Monitoring & Maintenance

### SSL Certificate Renewal
- **Let's Encrypt**: Auto-renews with `certbot --renew`
- **Vercel/Netlify**: Automatic
- **Cloudflare**: Automatic

### Performance Monitoring
- Set up uptime monitoring for all subdomains
- Monitor database performance
- Track API response times
- Monitor error rates

### Backups
- Database backups: Daily
- Configuration backups: Weekly
- Code backups: Automatic via Git

## Troubleshooting Production Issues

### "Cannot reach subdomain"
1. Verify DNS records are configured
2. Check firewall allows traffic on port 443
3. Verify SSL certificate is valid

### "Mixed content warning"
1. Ensure all resources use HTTPS
2. Check middleware is redirecting HTTP to HTTPS
3. Verify proxy headers in Nginx

### "Cookie not persisting"
1. Verify BETTER_AUTH_SECRET is correct
2. Check cookie domain settings
3. Ensure same secret key in all subdomains

### "500 Internal Server Error"
1. Check environment variables are set
2. Verify database connection
3. Check application logs
4. Verify NODE_ENV=production

## Performance Optimization

1. **Enable compression in Nginx**:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Configure caching**:
   ```nginx
   expires 1y;
   add_header Cache-Control "public, immutable";
   ```

3. **Use CDN** for static assets (Cloudflare, CloudFront)

4. **Monitor metrics**:
   - TTFB (Time To First Byte)
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)

## Rollback Plan

If deployment fails:
1. Keep previous version running
2. Test new version on staging first
3. Use blue-green deployment
4. Have quick rollback script ready
