/**
 * Hook for subdomain-aware navigation and utilities on the client side
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSubdomain() {
  const [subdomain, setSubdomain] = useState(null);
  const [hostname, setHostname] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      setHostname(host);

      // Extract subdomain
      const hostparts = host.split('.');
      if (host.includes('localhost')) {
        // For localhost, check if it's dashboard.localhost or admin.localhost
        if (host.includes('dashboard')) {
          setSubdomain('dashboard');
        } else if (host.includes('admin')) {
          setSubdomain('admin');
        } else {
          setSubdomain(null);
        }
      } else if (hostparts.length > 2) {
        setSubdomain(hostparts[0]);
      } else {
        setSubdomain(null);
      }
    }
  }, []);

  const getRedirectUrl = (isAdmin, defaultPath = '/') => {
    if (isAdmin) {
      if (subdomain === 'admin') {
        return defaultPath;
      }
      return process.env.NODE_ENV === 'production'
        ? `https://admin.${process.env.NEXT_PUBLIC_DOMAIN || 'powerpaytech.com'}${defaultPath}`
        : `http://admin.localhost:3000${defaultPath}`;
    } else {
      if (subdomain === 'dashboard') {
        return defaultPath;
      }
      return process.env.NODE_ENV === 'production'
        ? `https://dashboard.${process.env.NEXT_PUBLIC_DOMAIN || 'powerpaytech.com'}${defaultPath}`
        : `http://dashboard.localhost:3000${defaultPath}`;
    }
  };

  const redirectToDashboard = (path = '/') => {
    const url = getRedirectUrl(false, path);
    if (url.includes('http')) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  const redirectToAdmin = (path = '/') => {
    const url = getRedirectUrl(true, path);
    if (url.includes('http')) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  return {
    subdomain,
    hostname,
    isAdmin: subdomain === 'admin',
    isDashboard: subdomain === 'dashboard',
    isMain: subdomain === null,
    getRedirectUrl,
    redirectToDashboard,
    redirectToAdmin,
  };
}

