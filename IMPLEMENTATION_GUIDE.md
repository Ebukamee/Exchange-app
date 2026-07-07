# Subdomain Implementation Guide

## Quick Start

### 1. Local Development Setup

Add these entries to your hosts file:

**Windows** (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 localhost
127.0.0.1 dashboard.localhost
127.0.0.1 admin.localhost
```

**Mac/Linux** (`/etc/hosts`):
```
127.0.0.1 localhost
127.0.0.1 dashboard.localhost
127.0.0.1 admin.localhost
```

Then run:
```bash
npm run dev
```

Access:
- Main site: `http://localhost:3000`
- Dashboard: `http://dashboard.localhost:3000`
- Admin: `http://admin.localhost:3000`

### 2. Update Environment Variables

Create/update `.env.local`:
```env
# Your domain (change for production)
NEXT_PUBLIC_DOMAIN=website.com

# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://dashboard.website.com

# Database
DATABASE_URL=your-database-url
```

## File Structure Overview

```
app/
├── admin/                    # Admin routes
│   ├── page.jsx            # Admin home
│   └── dashboard/          # Admin dashboard
├── dashboard/              # User dashboard routes
│   ├── buy-crypto/
│   ├── sell-crypto/
│   ├── history/
│   └── ...
├── login/                  # Public login
├── signup/                 # Public signup
├── page.jsx               # Home page
└── layout.jsx             # Root layout

lib/
├── subdomain.js           # Server-side subdomain utilities
└── hooks/
    └── useSubdomain.js    # Client-side hook

middleware.js             # Handles subdomain routing
```

## Using Subdomain Utilities

### Server-Side (lib/subdomain.js)

In your API routes or server components:

```javascript
import { getSubdomain, isAdminSubdomain, getRedirectUrl } from '@/lib/subdomain';

// Get subdomain info
const subdomain = getSubdomain(request.headers.get('host'));
const isAdmin = isAdminSubdomain(request.headers.get('host'));

// Get redirect URL based on role
const redirectUrl = getRedirectUrl(
  request.headers.get('host'),
  user.is_admin,
  '/dashboard'
);
```

### Client-Side (lib/hooks/useSubdomain.js)

In your React components:

```jsx
'use client';

import { useSubdomain } from '@/lib/hooks/useSubdomain';

export default function MyComponent() {
  const { subdomain, isAdmin, isDashboard, redirectToDashboard } = useSubdomain();

  return (
    <div>
      <p>Current subdomain: {subdomain}</p>
      <p>Is admin: {isAdmin}</p>
      
      <button onClick={() => redirectToDashboard('/profile')}>
        Go to dashboard
      </button>
    </div>
  );
}
```

## Common Patterns

### 1. Redirect User After Login

```jsx
import { useRouter } from 'next/navigation';
import { useSubdomain } from '@/lib/hooks/useSubdomain';

export function LoginForm() {
  const router = useRouter();
  const { subdomain } = useSubdomain();

  const handleLogin = async (credentials) => {
    const result = await loginUser(credentials);
    
    if (result.success) {
      // Redirect based on subdomain
      if (subdomain === 'admin') {
        router.push('/');
      } else if (subdomain === 'dashboard') {
        router.push('/');
      } else {
        // From main domain, redirect to appropriate subdomain
        if (result.user.is_admin) {
          window.location.href = 'http://admin.localhost:3000/';
        } else {
          window.location.href = 'http://dashboard.localhost:3000/';
        }
      }
    }
  };

  return <form onSubmit={handleLogin}>{/* form content */}</form>;
}
```

### 2. Protect Routes by Subdomain

```jsx
// app/admin/layout.jsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession();

  if (!session || !session.user.is_admin) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

```jsx
// app/dashboard/layout.jsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession();

  if (!session) {
    redirect('/login');
  }

  // Regular users can access dashboard but not admin
  if (session.user.is_admin) {
    // Optionally redirect admin to admin subdomain
    // redirect('/admin');
  }

  return <>{children}</>;
}
```

### 3. Make API Calls with Correct Base URL

```jsx
'use client';

import { useSubdomain } from '@/lib/hooks/useSubdomain';
import { useEffect, useState } from 'react';

export function UserList() {
  const { subdomain } = useSubdomain();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const baseUrl = subdomain ? `http://${subdomain}.localhost:3000` : 'http://localhost:3000';
    
    fetch(`${baseUrl}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [subdomain]);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Migration Checklist

- [ ] Add subdomain entries to `/etc/hosts` for local development
- [ ] Create `.env.local` with correct environment variables
- [ ] Start dev server: `npm run dev`
- [ ] Test main domain: `http://localhost:3000`
- [ ] Test dashboard: `http://dashboard.localhost:3000`
- [ ] Test admin: `http://admin.localhost:3000`
- [ ] Update login/signup redirects to use `useSubdomain()` hook
- [ ] Update protected route layouts to verify user role
- [ ] Test cross-subdomain cookie sharing
- [ ] Deploy to production with DNS records for all subdomains
- [ ] Set `BETTER_AUTH_URL` in production environment
- [ ] Configure SSL certificates for all subdomains

## Common Issues & Solutions

### Issue: "Cannot find module" for hooks
**Solution**: Ensure path alias `@/` is configured in `jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Cookies not persisting across subdomains
**Solution**: Ensure `BETTER_AUTH_SECRET` is set and consistent. Cookies should automatically work across `.localhost` subdomains.

### Issue: 404 on subdomain routes
**Solution**: The middleware handles URL rewriting. If you see 404s, verify:
1. Middleware is enabled
2. Routes exist in `app/` folder
3. No routing conflicts in `next.config.mjs`

### Issue: Client-side redirect doesn't work
**Solution**: Use `window.location.href` for cross-subdomain redirects, `router.push()` for same-subdomain redirects:
```jsx
// Same subdomain
router.push('/profile');

// Different subdomain
window.location.href = 'http://admin.localhost:3000/dashboard';
```

## Testing Subdomain Routing

Test script to verify all routes:

```bash
# Main domain
curl http://localhost:3000/
curl http://localhost:3000/login
curl http://localhost:3000/about

# Dashboard
curl http://dashboard.localhost:3000/
curl http://dashboard.localhost:3000/buy-crypto
curl http://dashboard.localhost:3000/history

# Admin
curl http://admin.localhost:3000/
curl http://admin.localhost:3000/dashboard/users
curl http://admin.localhost:3000/dashboard/transactions
```

## Next Steps

1. **Feature flags**: Use subdomain info for feature management
2. **Analytics**: Track which subdomain users access
3. **Branding**: Different themes per subdomain
4. **Rate limiting**: Different limits per subdomain type
5. **Multi-tenancy**: Support multiple customers with their own domains

## Resources

- [SUBDOMAIN_SETUP.md](./SUBDOMAIN_SETUP.md) - Detailed setup guide
- [middleware.js](./middleware.js) - Subdomain routing logic
- [lib/subdomain.js](./lib/subdomain.js) - Utility functions
- [lib/hooks/useSubdomain.js](./lib/hooks/useSubdomain.js) - React hook
