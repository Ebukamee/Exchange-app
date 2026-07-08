"use client";

import { toaster } from "../components/ui/toaster";

export * from "./format";

export const toast = (type, message, title) => {
  toaster.create({ title, description: message, type });
};

export const isValidPassword = (password) => {
  if (typeof password !== "string") return false;
  // Allow uppercase, lowercase, digits, and symbols _ - # only, with at least 8 characters.
  const allowed = /^[A-Za-z0-9_\-#]{8,}$/;
  if (!allowed.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[_\-#]/.test(password)) return false;
  return true;
};

