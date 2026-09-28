export interface DemoAuthUser {
  name: string;
  email: string;
  signedInAt: string;
}

export const DEMO_AUTH_KEY = "echogpt:demo-auth-user";

/**
 * Safely load demo auth user from localStorage.
 * Does not throw on SSR or invalid JSON.
 */
export function loadDemoUser(): DemoAuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEMO_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoAuthUser;
  } catch {
    return null;
  }
}

/**
 * Persist a lightweight demo user in localStorage.
 * Never stores real passwords or sensitive data.
 */
export function saveDemoUser(data: { name?: string; email: string }): DemoAuthUser {
  const name =
    data.name?.trim() ||
    data.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ") ||
    "EchoGPT User";

  const user: DemoAuthUser = {
    name,
    email: data.email.trim().toLowerCase(),
    signedInAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
      window.dispatchEvent(new CustomEvent("echogpt:auth-changed", { detail: user }));
    } catch {
      // Ignore quota errors in private browsing
    }
  }

  return user;
}

/**
 * Clear the demo auth state.
 */
export function clearDemoUser(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(DEMO_AUTH_KEY);
      window.dispatchEvent(new CustomEvent("echogpt:auth-changed", { detail: null }));
    } catch {
      // Ignore
    }
  }
}
