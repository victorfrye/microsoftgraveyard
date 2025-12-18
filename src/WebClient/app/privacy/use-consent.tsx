'use client';

import { useContext } from 'react';

import { ConsentContext } from '@/privacy/consent-provider';

export default function useConsent() {
  return useContext(ConsentContext);
}
