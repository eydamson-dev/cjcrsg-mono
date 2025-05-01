import React from 'react';

import { getCurrentUser } from '@/actions/auth';
import { getSchedules } from '@/actions/schedules';
import { Schedule } from '@/payload-types';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function Profile() {
  const user = await getCurrentUser();
  const schedules = (await getSchedules()).docs || [];

  if (!user) redirect('/login');

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">Calendar</h2>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">What</TableHead>
                        <TableHead className="text-left">When</TableHead>
                        <TableHead className="text-left">Where</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((sched: Schedule) => (
                        <TableRow key={sched.id} className="hover:bg-muted">
                          <TableCell>{sched.title}</TableCell>
                          <TableCell>{new Date(sched.date).toLocaleDateString()}</TableCell>
                          <TableCell>{sched.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
