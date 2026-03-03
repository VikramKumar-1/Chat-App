

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, MessageCircle, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { loginSchema } from "../schemas/authSchemas"
import { useNavigate } from "react-router-dom"

type FormFields = {
  login: string
  password: string
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

export const LoginPage = () => {
  const { login } = useAuth()
  
  const navigate = useNavigate()

  const [form, setForm] = useState<FormFields>({ login: "", password: "" })
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<FormKey, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]
        if (typeof key === "string" && (key === "login" || key === "password")) {
          fieldErrors[key] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    try {
      setLoading(true)
      await login(result.data)
      navigate("/chat", { replace: true })
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
    boxShadow:
      focused === field && !errors[field] ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
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
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "28px" }}
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
            {/* Heading */}
            <motion.div variants={itemVariants} style={{ marginBottom: "26px" }}>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px",
                }}
              >
                Welcome back 👋
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Sign in to continue your conversations
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Login field */}
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
                  Email or Username
                </label>
                <input
                  type="text"
                  value={form.login}
                  onChange={(e) => handleChange("login", e.target.value)}
                  onFocus={() => setFocused("login")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  style={inputStyle("login")}
                />
                <AnimatePresence>
                  {errors.login && (
                    <motion.p
                      key="login-err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ margin: "5px 0 0", fontSize: "12px", color: "#ef4444", fontFamily: font }}
                    >
                      {errors.login}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password field */}
              <motion.div variants={itemVariants}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151", fontFamily: font }}>
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    style={{ fontSize: "12px", color: "#6366f1", fontWeight: 500, textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
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

              {/* Submit button */}
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
                      Sign in
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.p
              variants={itemVariants}
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#6b7280",
                margin: "22px 0 0",
                fontFamily: font,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}
              >
                Create one
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}