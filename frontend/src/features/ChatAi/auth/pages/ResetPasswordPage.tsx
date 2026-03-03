// import { useState } from "react"
// import { useSearchParams, useNavigate } from "react-router-dom"
// import { toast } from "sonner"
// import { resetPasswordSchema } from "../schemas/authSchemas"
// import { authService } from "../services/auth.service"

// export const ResetPasswordPage = () => {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()

//   const email = searchParams.get("email") || ""
//   const token = searchParams.get("token") || ""

//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       resetPasswordSchema.parse({
//         email,
//         token,
//         password,
//         password_confirmation: confirmPassword,
//       })

//       setLoading(true)

//       await authService.resetPassword({
//         email,
//         token,
//         password,
//         password_confirmation: confirmPassword,
//       })

//       toast.success("Password reset successful")
//       navigate("/login")
//     } catch {
//       toast.error("Reset failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Reset Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   )
// }  

import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, MessageCircle, ArrowRight, Loader2, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { resetPasswordSchema } from "../schemas/authSchemas"
import { authService } from "../services/auth.service"

type FormFields = {
  password: string
  password_confirmation: string
}

type FormKey = keyof FormFields

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const font = "'Plus Jakarta Sans', sans-serif"

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const email = searchParams.get("email") ?? ""
  const token = searchParams.get("token") ?? ""

  const [form, setForm] = useState<FormFields>({ password: "", password_confirmation: "" })
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [focused, setFocused] = useState<FormKey | null>(null)

  const handleChange = (field: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    const payload = {
      email,
      token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    }

    const result = resetPasswordSchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors: Partial<Record<FormKey, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]
        if (typeof key === "string" && (key === "password" || key === "password_confirmation")) {
          fieldErrors[key] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      await authService.resetPassword(result.data)
      toast.success("Password reset successful")
      navigate("/login")
    } catch (error: unknown) {
      console.error("Reset password error:", error)
      toast.error("Reset failed. The link may have expired.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field: FormKey, extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%",
    outline: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#111827",
    fontFamily: font,
    transition: "all 0.2s ease",
    background: errors[field] ? "#fef2f2" : focused === field ? "#f5f7ff" : "#f9fafb",
    border: errors[field]
      ? "1.5px solid #fca5a5"
      : focused === field
      ? "1.5px solid #6366f1"
      : "1.5px solid #e5e7eb",
    boxShadow: focused === field && !errors[field] ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
    ...extra,
  })

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          fontFamily: font,
          background: "linear-gradient(135deg, #eef2ff 0%, #fafafa 50%, #f5f3ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              top: "-180px",
              right: "-120px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              bottom: "-160px",
              left: "-80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 10 }}
        >
          {/* Brand */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={18} color="white" />
            </div>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
              Convex
            </span>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              padding: "clamp(24px, 5vw, 36px) clamp(20px, 5vw, 32px)",
            }}
          >
            {/* Icon + heading */}
            <motion.div variants={itemVariants} style={{ marginBottom: "26px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #eef2ff, #ede9fe)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
                }}
              >
                <ShieldCheck size={22} color="#6366f1" />
              </div>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px",
                }}
              >
                Set new password
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                Choose a strong password for{" "}
                <span style={{ color: "#6366f1", fontWeight: 500, wordBreak: "break-all" }}>
                  {email || "your account"}
                </span>
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* New password */}
              <motion.div variants={itemVariants}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "6px",
                    fontFamily: font,
                  }}
                >
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="Create a strong password"
                    style={inputStyle("password", { paddingRight: "42px" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "#9ca3af",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      key="pass-err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ margin: "5px 0 0", fontSize: "12px", color: "#ef4444", fontFamily: font }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm password */}
              <motion.div variants={itemVariants}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "6px",
                    fontFamily: font,
                  }}
                >
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.password_confirmation}
                    onChange={(e) => handleChange("password_confirmation", e.target.value)}
                    onFocus={() => setFocused("password_confirmation")}
                    onBlur={() => setFocused(null)}
                    placeholder="Repeat your password"
                    style={inputStyle("password_confirmation", { paddingRight: "42px" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "#9ca3af",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password_confirmation && (
                    <motion.p
                      key="confirm-err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ margin: "5px 0 0", fontSize: "12px", color: "#ef4444", fontFamily: font }}
                    >
                      {errors.password_confirmation}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div variants={itemVariants} style={{ paddingTop: "4px" }}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.01 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "11px 20px",
                    borderRadius: "10px",
                    border: "none",
                    background: loading
                      ? "rgba(99,102,241,0.55)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: font,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.35)",
                    transition: "background 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}