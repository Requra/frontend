// ---------------------------------------------------------------------------
// JWT helper utilities  (client-side only — never trust these for authZ)
// ---------------------------------------------------------------------------

/**
 * Decode the payload of a JWT without verifying the signature.
 * Returns `null` for malformed tokens.
 */
export const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;

    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

/**
 * Check whether a JWT access token has expired (or will expire within
 * `bufferMs` milliseconds). Defaults to 30 s buffer so we can refresh
 * *before* the backend rejects the request.
 */
export const isTokenExpired = (token: string, bufferMs = 30_000): boolean => {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") return true;

  return payload.exp * 1000 - bufferMs < Date.now();
};
