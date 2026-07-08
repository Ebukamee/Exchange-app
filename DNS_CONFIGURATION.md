# DNS Configuration Template

## Overview
This file contains the DNS records you'll need to configure for your subdomain setup.

Replace `website.com` with your actual domain and `192.0.2.1` with your server IP address.

## Required DNS Records

### Option 1: Specific Subdomains (Recommended)

```
RECORD TYPE  | SUBDOMAIN           | VALUE      | TTL
-------------|---------------------|------------|---------
A            | website.com         | 192.0.2.1  | 3600
A            | www.website.com     | 192.0.2.1  | 3600
A            | dashboard.website.com | 192.0.2.1 | 3600
A            | admin.website.com   | 192.0.2.1  | 3600
```

### Option 2: Wildcard (Easier for future subdomains)

```
RECORD TYPE  | SUBDOMAIN           | VALUE      | TTL
-------------|---------------------|------------|---------
A            | website.com         | 192.0.2.1  | 3600
A            | *.website.com       | 192.0.2.1  | 3600
```

## How to Configure on Different Providers

### Cloudflare

1. Login to Cloudflare dashboard
2. Select your domain
3. Go to DNS section
4. Add these records:

| Type | Name | IPv4 Address | TTL | Proxy |
|------|------|--------------|-----|-------|
| A | website.com | 192.0.2.1 | Auto | Proxied |
| A | www | 192.0.2.1 | Auto | Proxied |
| A | dashboard | 192.0.2.1 | Auto | Proxied |
| A | admin | 192.0.2.1 | Auto | Proxied |

**Or use wildcard:**
| Type | Name | IPv4 Address | TTL | Proxy |
|------|------|--------------|-----|-------|
| A | website.com | 192.0.2.1 | Auto | Proxied |
| A | * | 192.0.2.1 | Auto | Proxied |

### GoDaddy

1. Login to GoDaddy account
2. Go to Domains
3. Select your domain
4. Click Manage DNS
5. Add these A records:

| Name | Type | Value |
|------|------|-------|
| @ (root) | A | 192.0.2.1 |
| www | A | 192.0.2.1 |
| dashboard | A | 192.0.2.1 |
| admin | A | 192.0.2.1 |

### Namecheap

1. Login to Namecheap
2. Go to Domain List
3. Click Manage next to your domain
4. Go to Advanced DNS tab
5. Add these A records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 192.0.2.1 | 3600 |
| A Record | www | 192.0.2.1 | 3600 |
| A Record | dashboard | 192.0.2.1 | 3600 |
| A Record | admin | 192.0.2.1 | 3600 |

### AWS Route 53

1. Login to AWS Console
2. Go to Route 53
3. Click Hosted zones
4. Select your domain
5. Create Record:
   - Name: website.com, Type: A, Value: 192.0.2.1
   - Name: www.website.com, Type: A, Value: 192.0.2.1
   - Name: dashboard.website.com, Type: A, Value: 192.0.2.1
   - Name: admin.website.com, Type: A, Value: 192.0.2.1

### Azure DNS

1. Go to Azure Portal
2. Search for "DNS zones"
3. Select your domain
4. Add these A records:
   - Name: @ (root), Type: A, IPv4: 192.0.2.1
   - Name: www, Type: A, IPv4: 192.0.2.1
   - Name: dashboard, Type: A, IPv4: 192.0.2.1
   - Name: admin, Type: A, IPv4: 192.0.2.1

### Google Domains

1. Go to Google Domains
2. Select your domain
3. Go to DNS
4. Add these A records under Custom records:
   - @ → 192.0.2.1
   - www → 192.0.2.1
   - dashboard → 192.0.2.1
   - admin → 192.0.2.1

## Verification

### Check DNS records are resolving:

```bash
# Check main domain
nslookup website.com

# Check subdomains
nslookup dashboard.website.com
nslookup admin.website.com

# Verify all resolve to same IP
dig website.com +short
dig dashboard.website.com +short
dig admin.website.com +short
```

Expected output:
```
192.0.2.1
192.0.2.1
192.0.2.1
```

### Using command line tools:

```bash
# Using dig (detailed)
dig dashboard.website.com

# Using host (simple)
host admin.website.com

# Using nslookup (interactive)
nslookup
> set type=A
> dashboard.website.com
> admin.website.com
```

## SSL Certificate Configuration

### For Wildcard Certificate (*.website.com)

**Using Let's Encrypt with Certbot:**
```bash
sudo certbot certonly --manual --preferred-challenges=dns \
  -d website.com -d *.website.com
```

**Or using DNS validation:**
```bash
sudo certbot certonly --dns-cloudflare \
  -d website.com -d *.website.com
```

### For Specific Subdomains

**Certificate covering all subdomains:**
```bash
sudo certbot certonly --manual --preferred-challenges=dns \
  -d website.com \
  -d www.website.com \
  -d dashboard.website.com \
  -d admin.website.com
```

## TTL Recommendation

- **During setup**: Use 300 seconds (5 minutes) for quick propagation
- **After verification**: Use 3600 seconds (1 hour) for stability
- **For production**: Use 86400 seconds (1 day) for optimal performance

## DNS Propagation Time

- Typical: 5 minutes to 2 hours
- Maximum: Up to 48 hours in some cases
- Check status: https://www.whatsmydns.net/

## For Vercel Hosting

DNS records are usually NOT needed because:
1. Vercel provides nameservers for your domain
2. You simply add domains in Vercel dashboard
3. Vercel automatically handles DNS configuration

To update:
1. Go to Vercel Project → Settings → Domains
2. Add each domain/subdomain
3. Vercel shows what DNS records to add (if needed)
4. Follow Vercel's instructions

## For Netlify Hosting

Similar to Vercel:
1. Go to Netlify Site settings
2. Domain settings
3. Add all subdomains
4. Netlify handles DNS if you use their nameservers

## Local Development (No DNS Needed)

For local testing, add to `/etc/hosts` instead:

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

## Troubleshooting DNS

### DNS not resolving
- Wait 5-10 minutes for propagation
- Clear DNS cache:
  ```bash
  # Windows
  ipconfig /flushdns
  
  # Mac
  sudo dscacheutil -flushcache
  
  # Linux
  sudo systemctl restart systemd-resolved
  ```

### Old DNS still showing
- Wait for TTL to expire
- Check all nameservers at https://www.whatsmydns.net/
- Verify correct IP in DNS provider

### Specific subdomain not working
- Verify record was added correctly
- Check for typos in subdomain name
- Ensure all records point to same IP
- Try adding both A record and CNAME record

## Example Complete DNS Setup

For a production server at `1.2.3.4`:

```
TYPE   | NAME                | VALUE        | TTL
-------|---------------------|--------------|------
A      | website.com         | 1.2.3.4      | 3600
A      | www.website.com     | 1.2.3.4      | 3600
A      | dashboard.website.com | 1.2.3.4    | 3600
A      | admin.website.com   | 1.2.3.4      | 3600
MX     | website.com         | mail.website.com | 3600
CNAME  | mail               | 1.2.3.4      | 3600
```

## Notes

- All A records should point to the same IP address
- Ensure trailing dots are handled correctly by your DNS provider
- Test with both www and non-www versions
- Keep DNS provider dashboard open during configuration
- Document your DNS setup for future reference

