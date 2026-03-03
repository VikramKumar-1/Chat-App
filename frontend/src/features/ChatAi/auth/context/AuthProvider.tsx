import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { AuthContext } from "./AuthContext"
import { authService } from "../services/auth.service"
import type {
  AuthContextType,
  User,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      const token = authService.getToken()

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const me = await authService.me()
        setUser(me)
        localStorage.setItem("user_id", String(me.id))
      } catch {
        authService.clearToken()
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  const handleError = (error: unknown, fallback: string) => {
    const axiosError = error as AxiosError<{
      errors?: Record<string, string[]>
    }>

    if (axiosError.response?.status === 422) {
      const errors = axiosError.response.data?.errors
      if (errors) {
        Object.values(errors).forEach((e) => toast.error(e[0]))
        return
      }
    }

    toast.error(fallback)
  }

  const login = async (data: LoginRequest) => {
    try {
      const res = await authService.login(data)
      authService.saveToken(res.token)
     localStorage.setItem("user_id", String(res.user.id))
     setUser(res.user)
      toast.success("Login successful")
      navigate("/")
    } catch (error) {
      handleError(error, "Login failed")
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      const res = await authService.register(data)
      authService.saveToken(res.token)
       localStorage.setItem("user_id", String(res.user.id)) // 🔥 ADD
       setUser(res.user)
      toast.success("Registration successful")
      navigate("/")
    } catch (error) {
      handleError(error, "Registration failed")
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      authService.clearToken()
      localStorage.removeItem("user_id")
      setUser(null)
      navigate("/login")
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}