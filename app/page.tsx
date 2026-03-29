'use client';

import { Providers } from './providers';
import { SwapUI } from './components/SwapUI';

export default function Home() {
  return (
    <Providers>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <SwapUI />
      </div>
    </Providers>
  );
}
// Build trigger: Sun Mar 29 12:18:05 AM EDT 2026
