import {z} from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email.'),
  password: z.string().trim().min(8)
});

export type FormSchema = z.infer<typeof loginSchema>
