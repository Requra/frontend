
// ---------- API Response envelope ----------
export interface ApiLoginResponse {
  isSuccess: boolean;
  data: LoginResponseData;
  message: string;
  statusCode: number;
  errors: string[];
}

export interface LoginResponseData {
  userId: string | null;
  name: string | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  roles: string[];
  profilePicture: string | null;
}

// ---------- Stored user (derived from a successful login) ----------
export interface User {
  userId: string;
  name: string;
  roles: string[];
  profilePicture: string | null;
}

