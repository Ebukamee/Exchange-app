"use client";

import { RequireAuth } from "@/src/components/Gate";

export default function DashboardLayoutGate({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}
