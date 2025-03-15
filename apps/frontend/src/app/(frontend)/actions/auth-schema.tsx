import {z} from 'zod'

export const LoginSchema = z.object({
  email: z.string().trim().email('Enter a valid email.'),
  password: z.string().trim().min(8)
});

export type LoginFormSchema = z.infer<typeof LoginSchema>
