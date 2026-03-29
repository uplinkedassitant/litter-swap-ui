'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect } from 'react';

// Configuration
const LITTER_MINT = new PublicKey(process.env.NEXT_PUBLIC_LITTER_MINT || 'EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ');
const LAUNCH_ID = process.env.NEXT_PUBLIC_LAUNCH_ID || 'EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ';

// Common tokens for quick selection
const COMMON_TOKENS = [
  { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112', type: 'native' },
  { symbol: 'USDC', name: 'USD Coin', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', type: 'spl' },
  { symbol: 'USDT', name: 'Tether', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', type: 'spl' },
  { symbol: 'BONK', name: 'Bonk', mint: 'DezXAZ8z7PnrnRJjz3wXfRtHaY76yUrZQj4oCm4M4Xh', type: 'spl' },
  { symbol: 'WIF', name: 'dogwifhat', mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', type: 'spl' },
];

export function SwapUI() {
  const { publicKey, connect, signTransaction } = useWallet();
  const [selectedToken, setSelectedToken] = useState(COMMON_TOKENS[0]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'idle' | 'swapping' | 'buying' | 'done'>('idle');
  const [solBalance, setSolBalance] = useState<number | null>(null);
  
  const network = process.env.NEXT_PUBLIC_NETWORK || 'devnet';
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl(network as any);
  const connection = new Connection(rpcUrl, 'confirmed');

  // Fetch SOL balance when wallet connects
  useEffect(() => {
    if (!publicKey) {
      setSolBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setSolBalance(bal / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error('Balance fetch error:', err);
        setSolBalance(null);
      }
    };

    fetchBalance();
  }, [publicKey, connection]);
  
  const displayBalance = selectedToken.type === 'native' ? solBalance : null;

  const handleSwapAndBuy = async () => {
    if (!publicKey || !signTransaction) {
      setError('Please connect your wallet first');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setStep('swapping');

    try {
      // ⚠️ DEMO MODE - This is a simulation
      // In production, you would:
      // 1. Use Jupiter API or Raydium to swap token → SOL
      // 2. Use Raydium LaunchLab SDK to buy $LITTER with SOL
      
      console.log('🔶 DEMO MODE - No real transaction');
      console.log(`Would swap: ${amount} ${selectedToken.symbol} → SOL`);
      console.log(`Would buy: $LITTER tokens via LaunchLab (ID: ${LAUNCH_ID})`);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('buying');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('done');
      
      // Show demo mode warning
      setError('⚠️ DEMO MODE: No real transaction occurred. Integrate Raydium SDK for real swaps.');
      
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Transaction failed');
      setStep('idle');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStep('idle');
        setAmount('');
      }, 5000);
    }
  };

  const handleTokenSelect = (token: typeof COMMON_TOKENS[0]) => {
    setSelectedToken(token);
    setAmount('');
    setError('');
  };

  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      {/* Demo Mode Banner */}
      <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
        <p className="text-xs text-yellow-300 text-center font-semibold">
          ⚠️ DEMO MODE - Simulated Swaps Only
        </p>
        <p className="text-xs text-yellow-400 text-center mt-1">
          Integrate Raydium SDK for real transactions
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Swap for $LITTER</h1>
          <p className="text-sm text-gray-400">Raydium LaunchLab</p>
        </div>
        <WalletMultiButton />
      </div>

      {/* Token Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Token to Swap
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {COMMON_TOKENS.map((token) => (
            <button
              key={token.symbol}
              onClick={() => handleTokenSelect(token)}
              className={`p-3 rounded-lg border transition-all ${
                selectedToken.symbol === token.symbol
                  ? 'bg-purple-500 border-purple-400 text-white'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="text-lg font-bold">{token.symbol}</div>
              <div className="text-xs opacity-75 truncate">{token.name}</div>
            </button>
          ))}
        </div>
        
        {/* Custom token input */}
        <div className="mt-3">
          <input
            type="text"
            value={selectedToken.symbol !== 'SOL' ? selectedToken.mint : ''}
            onChange={(e) => {
              if (e.target.value.length === 44) {
                setSelectedToken({ symbol: 'CUSTOM', name: 'Custom Token', mint: e.target.value, type: 'spl' });
              }
            }}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Or paste custom token mint address"
          />
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <label>Amount</label>
          {displayBalance !== null && (
            <span className="text-gray-400">
              Balance: {displayBalance.toFixed(4)} {selectedToken.symbol}
            </span>
          )}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="0.00"
          step="any"
        />
        {amount && (
          <p className="text-xs text-gray-400 mt-2">
            ≈ ${(parseFloat(amount) * 0.001).toFixed(2)} USD
          </p>
        )}
      </div>

      {/* Status Message */}
      {step !== 'idle' && (
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-gray-300">
            {step === 'swapping' && '🔄 Swapping tokens...'}
            {step === 'buying' && '🎯 Buying $LITTER...'}
            {step === 'done' && '✅ Success! $LITTER tokens acquired!'}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleSwapAndBuy}
        disabled={loading || !publicKey || !amount}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Swap & Buy $LITTER`
        )}
      </button>

      {/* Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 text-center mb-2">
          🔁 Swap any token → SOL → $LITTER
        </p>
        <p className="text-xs text-gray-500 text-center">
          Powered by Raydium LaunchLab
        </p>
        <p className="text-xs text-gray-500 text-center mt-2 font-mono">
          {LITTER_MINT.toString()}
        </p>
      </div>

      {!publicKey && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-300 text-center">
            👆 Connect your wallet to start swapping
          </p>
        </div>
      )}
    </div>
  );
}
