'use client';

import React from 'react';

import { cn } from '@/lib/utils/index';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function RegisterFormFields({ handleSubmit }: RegisterFormProps) {
  return (
    <form className="mb-8 w-full" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer>
          <Label htmlFor="firstname">First name</Label>
          <Input id="firstname" placeholder="Tyler" type="text" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Last name</Label>
          <Input id="lastname" placeholder="Durden" type="text" />
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="••••••••" type="password" />
      </LabelInputContainer>

      <button
        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        type="submit"
      >
        Sign up &rarr;
        <BottomGradient />
      </button>
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      <div className="flex flex-col space-y-4">
        <button className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]">
          <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Facebook</span>
          <BottomGradient />
        </button>
        <button className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]">
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Google</span>
          <BottomGradient />
        </button>
      </div>
    </form>
  );
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    throw new Error('Function not implemented.');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div>
        <div className="md:block hidden">
          <Card>
            <CardHeader>
              <CardTitle>Register Account</CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterFormFields handleSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>
        <div className="md:hidden">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterFormFields handleSubmit={handleSubmit} />
          </CardContent>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
