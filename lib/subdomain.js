/**
 * Utility functions for subdomain-aware redirects and URL generation
 */

export function getSubdomain(hostname) {
  if (!hostname) return null;
  
  const hostparts = hostname.split(".");
  
  // Handle localhost
  if (hostname.includes("localhost")) {
    return null; // Main domain for localhost
  }
  
  // For production domains, extract subdomain
  // admin.website.com, dashboard.website.com, website.com
  if (hostparts.length > 2) {
    return hostparts[0];
  }
  
  return null;
}

export function isAdminSubdomain(hostname) {
  return getSubdomain(hostname) === "admin";
}

export function isDashboardSubdomain(hostname) {
  return getSubdomain(hostname) === "dashboard";
}

export function isMainDomain(hostname) {
  return getSubdomain(hostname) === null;
}

/**
 * Get the redirect URL based on user role
 * @param {string} hostname - The request hostname
 * @param {boolean} isAdmin - Whether user is admin
 * @param {string} defaultPath - Default path to redirect to
 * @returns {string} - The redirect URL
 */
export function getRedirectUrl(hostname, isAdmin, defaultPath = "/") {
  if (isAdmin) {
    // Admin users go to admin subdomain
    if (isAdminSubdomain(hostname)) {
      return defaultPath;
    }
    return process.env.NODE_ENV === "production"
      ? `https://admin.${process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com"}${defaultPath}`
      : `http://admin.localhost:3000${defaultPath}`;
  } else {
    // Regular users go to dashboard subdomain
    if (isDashboardSubdomain(hostname)) {
      return defaultPath;
    }
    return process.env.NODE_ENV === "production"
      ? `https://dashboard.${process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com"}${defaultPath}`
      : `http://dashboard.localhost:3000${defaultPath}`;
  }
}

/**
 * Get base URL for current subdomain
 * @param {string} hostname - The request hostname
 * @returns {string} - Base URL for the subdomain
 */
export function getBaseUrl(hostname) {
  const subdomain = getSubdomain(hostname);
  
  if (process.env.NODE_ENV === "production") {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
    if (subdomain) {
      return `https://${subdomain}.${domain}`;
    }
    return `https://${domain}`;
  } else {
    // Local development
    if (subdomain) {
      return `http://${subdomain}.localhost:3000`;
    }
    return `http://localhost:3000`;
  }
}

/**
 * Get API base URL (always use dashboard for API)
 * @param {string} hostname - The request hostname
 * @returns {string} - Base URL for API calls
 */
export function getApiBaseUrl(hostname) {
  if (process.env.NODE_ENV === "production") {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
    return `https://dashboard.${domain}`;
  } else {
    return `http://dashboard.localhost:3000`;
  }
}

