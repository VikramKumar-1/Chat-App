// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Eye, EyeOff } from "lucide-react"
// import { useAuth } from "../hooks/useAuth"
// import { registerSchema } from "../schemas/authSchemas"

// export const RegisterPage = () => {
//   const { register } = useAuth()

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   })

//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleChange = (field: string, value: string) => {
//     setForm((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setErrors({})

//     const result = registerSchema.safeParse(form)

//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {}
//       result.error.issues.forEach((issue) => {
//         const field = issue.path[0]
//         if (field) fieldErrors[field.toString()] = issue.message
//       })
//       setErrors(fieldErrors)
//       return
//     }

//     try {
//       setLoading(true)
//       await register(result.data)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const inputClass = (field: string) =>
//     `w-full rounded-lg border bg-white px-3 py-2.5 text-sm
//      text-gray-900 placeholder:text-gray-400
//      transition-all duration-200 outline-none
//      ${
//        errors[field]
//          ? "border-red-500 focus:ring-2 focus:ring-red-500"
//          : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20"
//      }`

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         className="w-full max-w-sm"
//       >
//         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

//           <h1 className="text-xl font-semibold text-gray-900 text-center mb-6">
//             Create your account
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* Name */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={form.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 placeholder="John Doe"
//                 className={inputClass("name")}
//               />
//               {errors.name && (
//                 <p className="text-xs text-red-600 mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Username */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 value={form.username}
//                 onChange={(e) => handleChange("username", e.target.value)}
//                 placeholder="john_doe"
//                 className={inputClass("username")}
//               />
//               {errors.username && (
//                 <p className="text-xs text-red-600 mt-1">{errors.username}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="john@example.com"
//                 className={inputClass("email")}
//               />
//               {errors.email && (
//                 <p className="text-xs text-red-600 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <label className="block text-sm text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={form.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 placeholder="Create a strong password"
//                 className={inputClass("password")}
//               />
//               <div
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-800"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </div>
//               {errors.password && (
//                 <p className="text-xs text-red-600 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <label className="block text-sm text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={form.password_confirmation}
//                 onChange={(e) =>
//                   handleChange("password_confirmation", e.target.value)
//                 }
//                 placeholder="Repeat password"
//                 className={inputClass("password_confirmation")}
//               />
//               <div
//                 onClick={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-800"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </div>
//               {errors.password_confirmation && (
//                 <p className="text-xs text-red-600 mt-1">
//                   {errors.password_confirmation}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-black text-white py-2.5 text-sm
//                          hover:bg-gray-900 transition-colors duration-200
//                          disabled:opacity-60"
//             >
//               {loading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-5 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-medium text-black hover:underline"
//             >
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, MessageCircle, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { registerSchema } from "../schemas/authSchemas"

type FormFields = {
  name: string
  username: string
  email: string
  password: string
  password_confirmation: string
}

type FormKey = keyof FormFields

interface FieldConfig {
  id: FormKey
  label: string
  type: "text" | "email" | "password"
  placeholder: string
  hasToggle: boolean
  showState?: boolean
  toggleFn?: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const font = "'Plus Jakarta Sans', sans-serif"

export const RegisterPage = () => {
  const { register } = useAuth()

  const [form, setForm] = useState<FormFields>({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<FormKey, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]
        if (typeof key === "string" && key in form) {
          fieldErrors[key as FormKey] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    try {
      setLoading(true)
      await register(result.data)
    } finally {
      setLoading(false)
    }
  }

  const fieldConfigs: FieldConfig[] = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", hasToggle: false },
    { id: "username", label: "Username", type: "text", placeholder: "john_doe", hasToggle: false },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com", hasToggle: false },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a strong password",
      hasToggle: true,
      showState: showPassword,
      toggleFn: () => setShowPassword((v) => !v),
    },
    {
      id: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      placeholder: "Repeat password",
      hasToggle: true,
      showState: showConfirmPassword,
      toggleFn: () => setShowConfirmPassword((v) => !v),
    },
  ]

  const inputStyle = (field: FormKey, extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%",
    outline: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "13.5px",
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
              left: "-120px",
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
              right: "-80px",
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
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={16} color="white" />
            </div>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
              Convex
            </span>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            style={{
              background: "white",
              borderRadius: "18px",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              padding: "22px 24px",
            }}
          >
            {/* Heading */}
            <motion.div variants={itemVariants} style={{ marginBottom: "16px" }}>
              <h1
                style={{
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                  margin: "0 0 3px",
                }}
              >
                Create your account ✨
              </h1>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Join and start chatting instantly
              </p>
            </motion.div>

            {/* Two-column grid for name + username */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              <motion.div variants={itemVariants} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {fieldConfigs.slice(0, 2).map((field) => (
                  <div key={field.id}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "4px",
                        fontFamily: font,
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      style={inputStyle(field.id)}
                    />
                    <AnimatePresence>
                      {errors[field.id] && (
                        <motion.p
                          key={`${field.id}-err`}
                          initial={{ opacity: 0, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ margin: "3px 0 0", fontSize: "11px", color: "#ef4444", fontFamily: font }}
                        >
                          {errors[field.id]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>

              {/* Remaining fields: email, password, confirm */}
              {fieldConfigs.slice(2).map((field) => {
                const resolvedType = field.hasToggle
                  ? field.showState ? "text" : "password"
                  : field.type

                return (
                  <motion.div key={field.id} variants={itemVariants}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "4px",
                        fontFamily: font,
                      }}
                    >
                      {field.label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={resolvedType}
                        value={form[field.id]}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        style={inputStyle(field.id, field.hasToggle ? { paddingRight: "38px" } : undefined)}
                      />
                      {field.hasToggle && field.toggleFn !== undefined && (
                        <button
                          type="button"
                          onClick={field.toggleFn}
                          style={{
                            position: "absolute",
                            right: "10px",
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
                          {field.showState ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors[field.id] && (
                        <motion.p
                          key={`${field.id}-err`}
                          initial={{ opacity: 0, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ margin: "3px 0 0", fontSize: "11px", color: "#ef4444", fontFamily: font }}
                        >
                          {errors[field.id]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              {/* Submit */}
              <motion.div variants={itemVariants} style={{ paddingTop: "2px" }}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.01 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    borderRadius: "9px",
                    border: "none",
                    background: loading
                      ? "rgba(99,102,241,0.55)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    color: "white",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    fontFamily: font,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.35)",
                    transition: "background 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {loading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={14} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.p
              variants={itemVariants}
              style={{
                textAlign: "center",
                fontSize: "12.5px",
                color: "#6b7280",
                margin: "14px 0 0",
                fontFamily: font,
              }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}