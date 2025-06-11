'use server';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { safeAwait } from '@/lib/utils/safeAwait';
import { cookies, headers as getHeaders } from 'next/headers';
import { redirect } from 'next/navigation';
import { Result } from 'node_modules/payload/dist/auth/operations/login';

import { LoginFormSchema } from './auth-schema';
import type { User } from '@/payload-types';

export const onLoginAction = async (
  formData: LoginFormSchema
): Promise<[Error | null, Result | null]> => {
  const payload = await getPayloadClient();
  const { email, password } = formData;

  const [error, data] = await safeAwait(
    payload.login({
      collection: 'users',
      data: {
        email: email,
        password: password,
      },
    })
  );

  if (!error && data?.token) {
    const store = await cookies();
    store.set('payload-token', data?.token);
    redirect('/profile');
  }

  payload.logger.error(`Error: ${error?.stack}`);

  return [error, data];
};

export const logoutAction = async () => {
  const store = await cookies();
  store.delete('payload-token');

  redirect('/login');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const headers = await getHeaders();
  const payload = await getPayloadClient();
  const doc = await payload.auth({ headers });

  return doc.user;
};
