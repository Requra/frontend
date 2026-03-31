// ---------------------------------------------------------------------------
// Lightweight cookie helpers (no dependencies)
// ---------------------------------------------------------------------------

interface CookieOptions {
  /** Cookie lifetime in days. Omit for a session cookie. */
  days?: number;
  /** Restrict cookie to a specific path. Defaults to "/" */
  path?: string;
  /** SameSite attribute. Defaults to "Strict" */
  sameSite?: "Strict" | "Lax" | "None";
  /** Only send over HTTPS. Defaults to true in production. */
  secure?: boolean;
}

const IS_PRODUCTION = window.location.protocol === "https:";

/**
 * Set a cookie value.
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const {
    days,
    path = "/",
    sameSite = "Strict",
    secure = IS_PRODUCTION,
  } = options;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}`;

  if (days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    cookie += `; Expires=${expires}`;
  }

  if (secure) {
    cookie += "; Secure";
  }

  document.cookie = cookie;
};

/**
 * Get a cookie value by name. Returns `null` if not found.
 */
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${encodeURIComponent(name)}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Remove a cookie by setting its expiry in the past.
 */
export const removeCookie = (name: string, path = "/"): void => {
  document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
