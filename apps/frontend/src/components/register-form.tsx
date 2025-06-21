'use client';

import React from 'react';

import { cn } from '@/lib/utils/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/app/(frontend)/actions/register-actions';

const RegisterSchema = z.object({
  firstname: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastname: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  error: z.string().nullable().default(null),
});

type RegisterFormSchema = z.infer<typeof RegisterSchema>;

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegisterFormSchema>;
  onSubmit: (data: RegisterFormSchema) => Promise<void>;
}

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

function RegisterFormFields({ form, onSubmit }: RegisterFormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 w-full no-scrollbar">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <LabelInputContainer>
                <FormLabel htmlFor="firstname">First name</FormLabel>
                <FormControl>
                  <Input id="firstname" placeholder="Tyler" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </LabelInputContainer>
            )}
          />
          <FormField
            control={form.control}
            name="error"
            render={() => (
              <FormMessage>{form.formState.errors.error?.message}</FormMessage>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <LabelInputContainer>
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <FormControl>
                  <Input id="lastname" placeholder="Durden" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </LabelInputContainer>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <LabelInputContainer className="mb-4">
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormControl>
                <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </LabelInputContainer>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <LabelInputContainer className="mb-4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input id="password" placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </LabelInputContainer>
          )}
        />

        <Button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin h-5 w-5 text-white" />
          ) : (
            <>
              Sign up &rarr;
              <BottomGradient />
            </>
          )}
        </Button>
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
    </Form>
  );
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: null,
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await register(data);
      // Redirect to login page
      window.location.href = '/login';
    } catch (error: any) {
      console.error('Registration failed', error);
      form.setValue('error', error.message);
    }
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
              <RegisterFormFields form={form} onSubmit={onSubmit} />
            </CardContent>
          </Card>
        </div>
        <div className="md:hidden">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterFormFields form={form} onSubmit={onSubmit} />
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
