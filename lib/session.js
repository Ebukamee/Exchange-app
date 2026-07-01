import { headers } from "next/headers";
import { auth } from "./auth";

// Current Better Auth user (or null) on the server.
export async function getUser() {
  const session = await auth.api.getSession({ headers: headers() });
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("You must be signed in.");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!user.is_admin) throw new Error("Admins only.");
  return user;
}
