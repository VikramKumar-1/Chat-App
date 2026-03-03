import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),

  username: z.string()
    .trim()
    .toLowerCase()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must not exceed 15 characters')
    .regex(/^[a-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: z.string()
    .trim()
    .toLowerCase()
    .email('Invalid email address'),

  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
})

export const loginSchema = z.object({
  login: z.string()
    .trim()
    .min(1, 'Email or username is required'),

  password: z.string()
    .min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .email('Invalid email address'),

  token: z.string()
    .min(1, 'Reset token is required'),

  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
})