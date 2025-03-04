'use server'

import { FormSchema } from "./schema"

export const onLoginAction = async (formData: FormSchema) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()

  return json
}
