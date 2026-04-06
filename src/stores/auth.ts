import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types";
import { setCookie, getCookie, removeCookie } from "@/utils/cookies";

// Cookie key names
const TOKEN_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  token: string | null;
  refreshToken: string | null;

  _hasHydrated: boolean;

  setAuth: (user: User, token: string, refreshToken: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
}

// ---------------------------------------------------------------------------
// Cookie helpers — write / clear tokens
// ---------------------------------------------------------------------------
const persistTokensToCookies = (token: string, refreshToken: string) => {
  // Access token: short-lived (1 day as fallback, real expiry is in the JWT)
  setCookie(TOKEN_COOKIE, token, { days: 1 });
  // Refresh token: longer-lived (7 days)
  setCookie(REFRESH_COOKIE, refreshToken, { days: 7 });
};

const clearTokenCookies = () => {
  removeCookie(TOKEN_COOKIE);
  removeCookie(REFRESH_COOKIE);
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // persisted in localStorage ↓
      user: null,
      isAuthenticated: false,

      // persisted in cookies ↓  (hydrated in onRehydrateStorage)
      token: null,
      refreshToken: null,

      // hydration flag ↓
      _hasHydrated: false,

      // ---------- actions ----------

      /** Called after a successful login / register */
      setAuth: (user, token, refreshToken) => {
        persistTokensToCookies(token, refreshToken);
        set({ user, token, refreshToken, isAuthenticated: true });
      },

      /** Called by the silent-refresh interceptor to swap tokens */
      setTokens: (token, refreshToken) => {
        persistTokensToCookies(token, refreshToken);
        set({ token, refreshToken });
      },

      /** Wipe everything on logout or 401 */
      logout: () => {
        clearTokenCookies();
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      /** Zustand persist calls this after rehydrating from storage */
      setHasHydrated: (v) => {
        set({ _hasHydrated: v });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        queueMicrotask(() => {
          const token = getCookie(TOKEN_COOKIE);
          const refreshToken = getCookie(REFRESH_COOKIE);

          if (state) {
            useAuthStore.setState({
              token,
              refreshToken,
              // If we had isAuthenticated but cookies are gone → force logout
              ...(!token && state.isAuthenticated
                ? { isAuthenticated: false, user: null }
                : {}),
              _hasHydrated: true,
            });
          }
        });
      },
    }
  )
);
