import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters long' })
  // .regex(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, {
  //   message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  // })
});
export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' })
});

export const sendOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' })
});
export const resetPasswordSchema = z.object({
  otp: z.string().min(6, { message: 'Otp must be at least 6 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});
export const updateAccount = z.object({
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
  full_name: z.string(),
  address: z.string(),
  gender: z.string(),
  birthday: z.date()
});
