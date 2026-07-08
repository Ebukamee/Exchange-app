# Subdomain Routing - Quick Reference

## URLs by Environment

### Local Development
```
Main Site:      http://localhost:3000
Dashboard:      http://dashboard.localhost:3000
Admin:          http://admin.localhost:3000
```

### Production
```
Main Site:      https://website.com
Dashboard:      https://dashboard.website.com
Admin:          https://admin.website.com
```

## Key Files Modified/Created

| File | Purpose |
|------|---------|
| `middleware.js` | Routes requests based on subdomain |
| `next.config.mjs` | Updated to support subdomains |
| `lib/auth.js` | Updated baseURL for auth |
| `lib/subdomain.js` | ✨ NEW - Server-side utilities |
| `lib/hooks/useSubdomain.js` | ✨ NEW - Client-side hook |
| `.env.example` | Updated with NEXT_PUBLIC_DOMAIN |
| `SUBDOMAIN_SETUP.md` | ✨ NEW - Complete setup guide |
| `IMPLEMENTATION_GUIDE.md` | ✨ NEW - Developer guide |

## Setup Steps

### 1. Local Development
```bash
# Add to /etc/hosts (Windows: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 dashboard.localhost
127.0.0.1 admin.localhost

# Start dev server
npm run dev
```

### 2. Update Environment
```bash
# Copy .env.example to .env.local and set NEXT_PUBLIC_DOMAIN
cp .env.example .env.local
```

### 3. Deploy to Production
- Update DNS records for all subdomains
- Set `BETTER_AUTH_URL=https://dashboard.website.com`
- Configure SSL certificates

## Common Code Patterns

### Redirect User After Login
```jsx
const { subdomain, redirectToDashboard, redirectToAdmin } = useSubdomain();

if (user.is_admin) {
  redirectToAdmin('/'); // or window.location.href if cross-subdomain
} else {
  redirectToDashboard('/');
}
```

### Protect Admin Routes
```jsx
// app/admin/layout.jsx
export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession();
  if (!session?.user?.is_admin) redirect('/login');
  return <>{children}</>;
}
```

### Get Current Subdomain (Client)
```jsx
const { subdomain, isAdmin, isDashboard, isMain } = useSubdomain();
```

### Get Subdomain Info (Server)
```jsx
import { getSubdomain, isAdminSubdomain } from '@/lib/subdomain';

const subdomain = getSubdomain(hostname);
const isAdmin = isAdminSubdomain(hostname);
```

## Routes by Subdomain

### Main Domain (website.com)
- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/rates` - Exchange rates
- `/login` - Login page
- `/signup` - Registration
- `/forgot-password` - Password recovery
- `/verify-email` - Email verification

### Dashboard (dashboard.website.com)
- `/` - Dashboard home
- `/buy-crypto` - Buy crypto
- `/sell-crypto` - Sell crypto
- `/sell-giftcard` - Sell giftcards
- `/withdraw` - Withdrawals
- `/history` - Transaction history
- `/profile` - User profile

### Admin (admin.website.com)
- `/` - Admin dashboard
- `/dashboard/users` - Manage users
- `/dashboard/cryptos` - Manage crypto
- `/dashboard/giftcards` - Manage giftcards
- `/dashboard/transactions` - View transactions
- `/dashboard/withdrawals` - Manage withdrawals
- `/dashboard/settings` - Settings

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Subdomains don't resolve | Add entries to `/etc/hosts` file |
| Cookies not sharing | Check BETTER_AUTH_SECRET is set |
| 404 on subdomain | Verify middleware is running |
| CORS errors | Update `next.config.mjs` headers |
| API calls failing | Use correct base URL for subdomain |

## Environment Variables

```env
# Required for subdomain routing
NEXT_PUBLIC_DOMAIN=website.com

# Auth configuration
BETTER_AUTH_URL=https://dashboard.website.com  # or http://localhost:3000 for dev
BETTER_AUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL=postgresql://...
```

## Testing Checklist

- [ ] Main domain loads correctly
- [ ] Dashboard subdomain loads correctly
- [ ] Admin subdomain loads correctly
- [ ] Login redirects to correct subdomain
- [ ] Cookies persist across subdomains
- [ ] Admin users cannot access dashboard
- [ ] Regular users cannot access admin
- [ ] API calls work from all subdomains

## Next Steps

1. Follow [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for detailed setup
2. Add subdomain entries to `/etc/hosts`
3. Start dev server with `npm run dev`
4. Test all three domains
5. For production, read [SUBDOMAIN_SETUP.md](./SUBDOMAIN_SETUP.md)

## Need Help?

- See `SUBDOMAIN_SETUP.md` for complete setup documentation
- See `IMPLEMENTATION_GUIDE.md` for code examples
- Check middleware.js for routing logic
- Review lib/subdomain.js and lib/hooks/useSubdomain.js for utilities

