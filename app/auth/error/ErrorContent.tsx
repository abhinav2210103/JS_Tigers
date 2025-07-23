// app/auth/error/ErrorContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Unknown error';

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Auth Error</h1>
      <p className="text-red-500 mt-2">{error}</p>
    </div>
  );
}
