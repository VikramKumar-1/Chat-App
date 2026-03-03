// import { useState } from "react"
// import { toast } from "sonner"
// import { forgotPasswordSchema } from "../schemas/authSchemas"
// import { authService } from "../services/auth.service"

// export const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       forgotPasswordSchema.parse({ email })

//       setLoading(true)
//       await authService.forgotPassword({ email })

//       toast.success("Reset link sent to your email")
//     } catch (error: unknown) {
//          console.error("Forgot password error:", error)
//           toast.error("Failed to send reset link")
             
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Forgot Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   )
// }

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, ArrowRight, Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { forgotPasswordSchema } from "../schemas/authSchemas"
import { authService } from "../services/auth.service"

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

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(false)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldError(null)

    const result = forgotPasswordSchema.safeParse({ email })
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "Invalid email"
      setFieldError(msg)
      return
    }

    try {
      setLoading(true)
      await authService.forgotPassword({ email })
      setSent(true)
      toast.success("Reset link sent to your email")
    } catch (error: unknown) {
      console.error("Forgot password error:", error)
      toast.error("Failed to send reset link")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    outline: "none",
    borderRadius: "10px",
    padding: "10px 14px 10px 40px",
    fontSize: "14px",
    color: "#111827",
    fontFamily: font,
    transition: "all 0.2s ease",
    background: fieldError ? "#fef2f2" : focused ? "#f5f7ff" : "#f9fafb",
    border: fieldError
      ? "1.5px solid #fca5a5"
      : focused
      ? "1.5px solid #6366f1"
      : "1.5px solid #e5e7eb",
    boxShadow: focused && !fieldError ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
  }

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
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {/* ── Success state ── */}
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ textAlign: "center", padding: "8px 0" }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 4px 14px rgba(16,185,129,0.2)",
                    }}
                  >
                    <CheckCircle2 size={26} color="#10b981" />
                  </div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#111827",
                      letterSpacing: "-0.02em",
                      margin: "0 0 8px",
                    }}
                  >
                    Check your inbox
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      margin: "0 0 8px",
                      lineHeight: 1.6,
                    }}
                  >
                    We sent a password reset link to
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6366f1",
                      margin: "0 0 28px",
                      wordBreak: "break-all",
                    }}
                  >
                    {email}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setEmail("") }}
                    style={{
                      width: "100%",
                      padding: "11px 20px",
                      borderRadius: "10px",
                      border: "1.5px solid #e5e7eb",
                      background: "white",
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: font,
                      cursor: "pointer",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    Try a different email
                  </button>
                </motion.div>
              ) : (
                /* ── Form state ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Heading */}
                  <div style={{ marginBottom: "26px" }}>
                    <h1
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-0.02em",
                        margin: "0 0 6px",
                      }}
                    >
                      Forgot password? 🔑
                    </h1>
                    <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                      Enter your email and we&apos;ll send you a link to reset your password.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    {/* Email field */}
                    <div>
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
                        Email address
                      </label>
                      <div style={{ position: "relative" }}>
                        {/* Icon */}
                        <Mail
                          size={15}
                          color={fieldError ? "#f87171" : focused ? "#6366f1" : "#9ca3af"}
                          style={{
                            position: "absolute",
                            left: "13px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            transition: "color 0.2s ease",
                            pointerEvents: "none",
                          }}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (fieldError) setFieldError(null)
                          }}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          placeholder="you@example.com"
                          style={inputStyle}
                        />
                      </div>
                      <AnimatePresence>
                        {fieldError && (
                          <motion.p
                            key="email-err"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                              margin: "5px 0 0",
                              fontSize: "12px",
                              color: "#ef4444",
                              fontFamily: font,
                            }}
                          >
                            {fieldError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit */}
                    <div style={{ paddingTop: "4px" }}>
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
                            Send Reset Link
                            <ArrowRight size={15} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>

                  {/* Back to login */}
                  <div style={{ marginTop: "22px", textAlign: "center" }}>
                    <Link
                      to="/login"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "13px",
                        color: "#6b7280",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "color 0.2s ease",
                      }}
                    >
                      <ArrowLeft size={14} />
                      Back to Sign in
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}