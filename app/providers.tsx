'use client';

import { ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

interface ProvidersProps {
  children: ReactNode;
}

// Type assertion workaround for React 18.3+ compatibility
const ConnectionProviderAny = ConnectionProvider as any;
const WalletProviderAny = WalletProvider as any;
const WalletModalProviderAny = WalletModalProvider as any;

export function Providers({ children }: ProvidersProps) {
  const endpoint = clusterApiUrl('devnet');
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ];

  return (
    <ConnectionProviderAny key={endpoint} endpoint={endpoint}>
      <WalletProviderAny wallets={wallets} autoConnect>
        <WalletModalProviderAny>
          {children}
        </WalletModalProviderAny>
      </WalletProviderAny>
    </ConnectionProviderAny>
  );
}
