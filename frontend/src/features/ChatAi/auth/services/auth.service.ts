import { api } from "../../lib/api"
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from "../types/auth.types"

const TOKEN_KEY = "access_token"

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data)
    return res.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", data)
    return res.data
  },

  async me(): Promise<User> {
    const res = await api.get<User>("/auth/me")
    return res.data
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post("/auth/forgot-password", data)
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post("/auth/reset-password", data)
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
}