"use client";

import { toaster } from "../components/ui/toaster";

export * from "./format";

export const toast = (type, message, title) => {
  toaster.create({ title, description: message, type });
};
