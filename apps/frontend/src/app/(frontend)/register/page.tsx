import React from 'react';

import { Metadata } from 'next';

import { RegisterForm } from '@/components/register-form';

import PageClient from '../[slug]/page.client';

export default function RegisterPage() {
  // Render Card on desktop (md and up), no Card on mobile
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <PageClient />
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Account registration`,
  };
}
