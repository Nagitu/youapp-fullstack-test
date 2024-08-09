'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type SessionProviderWrapperProps = {
  children: ReactNode;
};

const SessionProviderWrapper = ({ children }: SessionProviderWrapperProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
