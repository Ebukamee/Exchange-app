"use client";

import { RequireAdmin } from "@/src/components/Gate";
import AdminDashboard from "@/src/views/AdminDashboard";

export default function AdminDashboardLayout({ children }) {
  return (
    <RequireAdmin>
      <AdminDashboard>{children}</AdminDashboard>
    </RequireAdmin>
  );
}

