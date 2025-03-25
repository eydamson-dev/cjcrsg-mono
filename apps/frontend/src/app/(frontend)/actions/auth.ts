'use server'

import { safeAwait } from "@/utilities/safeAwait"
import { LoginFormSchema } from "./auth-schema"
import getPayloadClient from "@/utilities/getPayloadClient"
import { Result } from "node_modules/payload/dist/auth/operations/login"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const onLoginAction = async (formData: LoginFormSchema): Promise<[Error | null, Result | null]> => {
  const payload = await getPayloadClient()
  const { email, password } = formData

  const [error, data] = await safeAwait(payload.login({
    collection: 'users',
    data: {
      email: email,
      password: password
    },
  }))

  if (!error && data?.token) {
    const store = await cookies()
    store.set('payload-token', data?.token)
    redirect('/profile')
  }

  return [error, data]
}

export const logoutAction = async () => {
  const store = await cookies()
  store.delete('payload-token')

  redirect('/login')
}
