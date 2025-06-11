import { LoginForm } from '@/components/login-form'
import type { Metadata } from 'next/types'
import PageClient from './page.client'

export default function Page() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <PageClient />
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Account login`,
  }
}
