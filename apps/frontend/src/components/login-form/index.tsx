'use client';
'use client';

import { onLoginAction } from '@/app/(frontend)/actions/auth';
import { LoginFormSchema, LoginSchema } from '@/app/(frontend)/actions/auth-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface LoginFormFieldsProps {
  form: UseFormReturn<LoginFormSchema>;
  onSubmit: (data: LoginFormSchema) => Promise<void>;
}

function LoginFormFields({ form, onSubmit }: LoginFormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If you have problem with your credentials please contact the media team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        <Link href="/">
          <Button className="w-full" variant="secondary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </form>
    </Form>
  );
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { toast } = useToast();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormSchema) {
    // TODO: Call login api

    const [error] = await onLoginAction(data);
    if (error) {
      toast({
        title: error.name,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div>
        <div className="md:block hidden">
          <Card>
            <CardHeader>
              <CardTitle>Account Login</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginFormFields form={form} onSubmit={onSubmit} />
            </CardContent>
          </Card>
        </div>
        <div className="md:hidden">
          <CardHeader>
            <CardTitle>Account Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginFormFields form={form} onSubmit={onSubmit} />
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
