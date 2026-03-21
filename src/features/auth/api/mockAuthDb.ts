import type { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "uuid-1",
    email: "admin@requra.ai",
    password_hash: "mock_hash_123", // In a real app we never deal with this directly
    full_name: "Admin User",
    role: "pm",
    preferred_language: "en",
    avatar_url: null,
    is_active: true,
    last_login_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
