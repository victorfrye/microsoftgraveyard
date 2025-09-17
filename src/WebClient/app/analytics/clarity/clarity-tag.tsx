'use client';

import { useEffect } from 'react';

import Clarity from '@microsoft/clarity';

interface ClarityTagProps {
  projectId: string;
}

export default function ClarityTag({ projectId }: Readonly<ClarityTagProps>) {
  useEffect(() => {
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}
