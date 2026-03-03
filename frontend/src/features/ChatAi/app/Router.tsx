import { Routes, Route, Navigate } from "react-router-dom"

import { LoginPage } from "../auth/pages/LoginPage"
import { RegisterPage } from "../auth/pages/RegisterPage"
import { ForgotPasswordPage } from "../auth/pages/ForgotPasswordPage"
import { ResetPasswordPage } from "../auth/pages/ResetPasswordPage"

import { AuthGuard } from "../auth/components/AuthGuard"
import { ChatPage } from "../pages/ChatPage"

export const Router = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route element={<AuthGuard />}>
        <Route path="/chat/*" element={<ChatPage />} />
      </Route>

      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/chat" replace />} />

    </Routes>
  )
}