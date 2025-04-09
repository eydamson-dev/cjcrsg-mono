'use client';

import React from 'react';

import { logoutAction } from '@/app/(frontend)/actions/auth';

import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Profile() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <div> Profile</div>
          <Button
            onClick={async () => {
              await logoutAction();
            }}
          >
            Logout
          </Button>
        </main>
      </SidebarProvider>
    </>
  );
}
