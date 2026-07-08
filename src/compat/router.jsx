"use client";

// Thin compatibility layer so the ported react-router components keep working
// on top of Next.js routing with minimal changes.
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";


//code
export function Link({ to, href, children, ...rest }) {
  return (
    <NextLink href={to || href || "#"} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (path, opts) => (opts?.replace ? router.replace(path) : router.push(path));
}

export function useLocation() {
  const pathname = usePathname() || "/";
  return { pathname };
}

export function NavLink({ to, children, className, end, ...rest }) {
  const pathname = usePathname() || "/";
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + "/") || pathname === to;
  const cls = typeof className === "function" ? className({ isActive }) : className;
  const content = typeof children === "function" ? children({ isActive }) : children;
  return (
    <NextLink href={to} className={cls} {...rest}>
      {content}
    </NextLink>
  );
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  useEffect(() => {
    replace ? router.replace(to) : router.push(to);
  }, [to, replace, router]);
  return null;
}

// Outlet is handled by Next's nested layouts; kept as a no-op passthrough.
export function Outlet({ children }) {
  return children || null;
}

