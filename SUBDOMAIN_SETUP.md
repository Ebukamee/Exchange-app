# Subdomain Routing Configuration Guide

## Overview
This guide explains how to set up and configure subdomain-based routing for the exchange app:
- **Main Domain** (`website.com`): Public pages (home, about, contact, rates, login, signup)
- **Dashboard Subdomain** (`dashboard.website.com`): User logged-in pages (buy-crypto, sell-crypto, history, profile, withdraw, sell-giftcard)
- **Admin Subdomain** (`admin.website.com`): Admin dashboard and management pages

## Current Implementation

### 1. Middleware (`middleware.js`)
The middleware handles routing based on the hostname subdomain:
- Detects the subdomain from the request hostname
- Rewrites URLs based on which subdomain is being accessed
- Allows seamless routing without visible URL changes

### 2. Route Structure

#### Main Domain Routes (website.com)
```
/                    → Home page
/about              → About page
/contact            → Contact page
/rates              → Rates page
/login              → Public login page
/signup             → Public signup page
/forgot-password    → Password reset
/reset-password     → Password reset confirmation
/verify-email       → Email verification
/onboarding         → Onboarding flow
```

#### Dashboard Routes (dashboard.website.com)
```
/                              → Dashboard home
/buy-crypto                    → Buy crypto page
/sell-crypto                   → Sell crypto page
/sell-giftcard                 → Sell giftcard page
/withdraw                      → Withdrawal page
/history                       → Transaction history
/profile                       → User profile
```
*Note: All dashboard routes require user authentication*

#### Admin Routes (admin.website.com)
```
/                              → Admin dashboard
/dashboard                     → Admin dashboard (alt)
/dashboard/users               → Manage users
/dashboard/cryptos             → Manage cryptocurrencies
/dashboard/giftcards           → Manage giftcards
/dashboard/transactions        → View transactions
/dashboard/withdrawals         → Manage withdrawals
/dashboard/settings            → Admin settings
```
*Note: All admin routes require admin authentication*

## Local Development Setup

### Option 1: Using localhost with port-based routing (Easiest)
Add these entries to your `/etc/hosts` (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
127.0.0.1 localhost
127.0.0.1 dashboard.localhost
127.0.0.1 admin.localhost
```

Then run your dev server:
```bash
npm run dev
```

Access the app at:
- Main: `http://localhost:3000`
- Dashboard: `http://dashboard.localhost:3000`
- Admin: `http://admin.localhost:3000`

### Option 2: Using separate ports (Alternative)
Update `middleware.js` to handle port-based routing during development.

## Production Setup

### 1. DNS Configuration
Set up your DNS records to point all subdomains to your server:
```
website.com          A  your.server.ip
www.website.com      A  your.server.ip
dashboard.website.com A  your.server.ip
admin.website.com    A  your.server.ip
*.website.com        A  your.server.ip (wildcard, optional)
```

### 2. Environment Variables
Set up the following environment variables in your production deployment:

```env
# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://dashboard.website.com

# Database
DATABASE_URL=your-database-url

# Email (for Better Auth)
RESEND_API_KEY=your-resend-api-key

# Optional: Custom domain
NEXT_PUBLIC_DOMAIN=website.com
```

### 3. SSL/TLS Certificates
Ensure you have valid SSL certificates for all subdomains:
- `website.com`
- `www.website.com`
- `dashboard.website.com`
- `admin.website.com`

You can use Let's Encrypt with a wildcard certificate:
```
*.website.com
```

### 4. CORS Configuration
Update `next.config.mjs` if you need CORS headers for API requests across subdomains:
```javascript
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "https://website.com",
        },
      ],
    },
  ];
}
```

## Deployment Services

### Vercel
1. Add multiple domains in Vercel project settings:
   - Primary: `website.com`
   - Add: `dashboard.website.com`
   - Add: `admin.website.com`

2. Vercel will automatically handle SSL and redirects

3. Update environment variables in Vercel dashboard:
   ```
   BETTER_AUTH_URL=https://dashboard.website.com
   ```

### Netlify
1. Add your domain and all subdomains
2. Set up custom headers in `netlify.toml`:
   ```toml
   [[headers]]
   for = "/api/*"
   [headers.values]
     Access-Control-Allow-Origin = "*"
   ```

### Self-Hosted
1. Configure your web server (Nginx/Apache) to route all subdomains to your Node.js app
2. Use reverse proxy configuration to forward requests
3. Set up SSL termination

#### Nginx Example
```nginx
server {
    listen 80;
    server_name website.com *.website.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect to HTTPS
server {
    listen 443 ssl;
    server_name website.com *.website.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Authentication Flow

### Login Flow
1. User visits `website.com/login` or `dashboard.website.com`
2. User enters credentials
3. Auth is set via Better Auth cookies (domain: `.website.com`)
4. User is redirected to appropriate dashboard based on role:
   - **Regular users** → `dashboard.website.com/`
   - **Admin users** → `admin.website.com/`

### Cookie Scope
Better Auth cookies are scoped to the base domain (`.website.com`), allowing them to work across all subdomains.

## Protected Routes & Middleware

The application uses authentication guards:
- **Dashboard routes**: Only accessible to authenticated users
- **Admin routes**: Only accessible to authenticated admin users
- **Public routes**: Accessible to all visitors

Update your route protection logic to verify role and redirect appropriately.

## Troubleshooting

### Issue: Cookies not sharing across subdomains
**Solution**: Ensure `BETTER_AUTH_SECRET` is consistent and cookies are set with domain scope `.website.com`

### Issue: CORS errors on API calls
**Solution**: Update CORS headers in middleware and `next.config.mjs` to allow requests from all subdomains

### Issue: Environment variables not loading
**Solution**: Ensure `.env.local` or `.env` files are properly configured and restart dev server

### Issue: Subdomains not resolving locally
**Solution**: Add subdomain entries to `/etc/hosts` file and clear DNS cache

## API Routes

API routes work the same across all subdomains. All subdomains can access:
```
/api/auth/[...all]     → Authentication endpoints
/api/users             → User management
/api/transactions      → Transaction data
/api/catalog           → Catalog data
```

## Future Enhancements

1. **Rate limiting per subdomain**: Different rate limits for admin vs user actions
2. **Analytics**: Track user activity per subdomain
3. **Custom themes**: Different UI for each subdomain
4. **Multi-tenant support**: Ready for multiple customer deployments
5. **Subdomain-specific features**: Feature flags per subdomain

## Testing

### Test Cases
1. ✅ Direct access to main domain routes
2. ✅ Dashboard subdomain redirects to dashboard
3. ✅ Admin subdomain redirects to admin dashboard
4. ✅ Unauthenticated access to protected routes
5. ✅ Cookie persistence across subdomains
6. ✅ Admin user cannot access regular dashboard
7. ✅ Regular user cannot access admin dashboard

