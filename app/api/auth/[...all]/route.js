import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Better Auth handles all /api/auth/* endpoints (sign-in, sign-up, verify...).
export const { GET, POST } = toNextJsHandler(auth);
