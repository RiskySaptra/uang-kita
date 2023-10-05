'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ToastProvider from '@/components/ToastProvider';
const queryClient = new QueryClient();

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </QueryClientProvider>
  );
}
