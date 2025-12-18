'use client';

import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

interface ClarityTagProps {
  projectId: string;
}

export default function ClarityTag({ projectId }: Readonly<ClarityTagProps>) {
  useEffect(() => {
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}
