export interface User {
  id: number
  name: string
  username: string
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  login: string
  password: string
}

export interface RegisterRequest {
  name: string
  username: string
  password: string
  password_confirmation: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
}