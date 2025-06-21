'use server';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterSchema = z.object({
  firstname: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastname: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type RegisterFormSchema = z.infer<typeof RegisterSchema>;

export const register = async (data: RegisterFormSchema) => {
  const payload = await getPayloadClient();

  try {
    await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        name: `${data.firstname} ${data.lastname}`,
        role: 'member',
      },
    });

    revalidatePath('/login');
    redirect('/login');
  } catch (error: any) {
    console.error('Registration failed', error);
    return { error: error.message };
  }
};

