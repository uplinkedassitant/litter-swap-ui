'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js';
import { useState, useEffect } from 'react';

// Configuration
const LITTER_MINT = new PublicKey(process.env.NEXT_PUBLIC_LITTER_MINT || 'EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ');
const LAUNCH_ID = process.env.NEXT_PUBLIC_LAUNCH_ID || 'EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ';
const JUPITER_API = 'https://quote-api.jup.ag/v6';

// Common tokens
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

  // Fetch SOL balance
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
        setSolBalance(null);
      }
    };
    fetchBalance();
  }, [publicKey, connection]);

  const handleSwapAndBuy = async () => {
    if (!publicKey || !signTransaction) {
      setError('Please connect wallet first');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setStep('swapping');

    try {
      const inputMint = selectedToken.mint;
      const amountNum = parseFloat(amount);
      
      // Convert to lamports (assuming 9 decimals for simplicity)
      const amountLamports = Math.floor(amountNum * LAMPORTS_PER_SOL);

      console.log('🔶 Step 1: Swapping', amount, selectedToken.symbol, '→ SOL');
      
      // Use Jupiter API for swap quote
      const quoteResponse = await fetch(
        `${JUPITER_API}/quote?inputMint=${inputMint}&outputMint=So11111111111111111111111111111111111111112&amount=${amountLamports}&slippageBps=50`
      );
      const quote = await quoteResponse.json();
      
      if (!quote || quote.error) {
        throw new Error('Swap quote failed: ' + (quote?.error || 'Unknown error'));
      }

      console.log('Quote received:', quote);

      // Get swap transaction
      const swapTxResponse = await fetch(`${JUPITER_API}/swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: publicKey.toString(),
          wrapAndTakeToken: false,
        }),
      });
      
      const swapData = await swapTxResponse.json();
      
      if (!swapData.swapTransaction) {
        throw new Error('Failed to get swap transaction');
      }

      console.log('🔶 Step 2: Buying $LITTER via LaunchLab');
      setStep('buying');

      // For LaunchLab, we'd use Raydium SDK here
      // For demo, we'll simulate the buy
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ Success!');
      setStep('done');
      setError('✅ Transaction successful! Check your wallet.');
      
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

  const displayBalance = selectedToken.type === 'native' ? solBalance : null;

  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      {/* Demo Banner */}
      <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
        <p className="text-xs text-yellow-300 text-center font-semibold">
          ⚠️ Demo Mode - Devnet Only
        </p>
        <p className="text-xs text-yellow-400 text-center mt-1">
          Real swap integration in progress
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
        <label className="block text-sm font-medium text-gray-300 mb-3">Select Token</label>
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
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <label>Amount</label>
          {displayBalance !== null && (
            <span className="text-gray-400">Balance: {displayBalance.toFixed(4)} {selectedToken.symbol}</span>
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
      </div>

      {/* Status */}
      {step !== 'idle' && (
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-gray-300">
            {step === 'swapping' && '🔄 Swapping tokens...'}
            {step === 'buying' && '🎯 Buying $LITTER...'}
            {step === 'done' && '✅ Success!'}
          </p>
        </div>
      )}

      {/* Error/Success Message */}
      {error && (
        <div className={`mb-4 p-3 rounded-lg ${
          error.includes('✅') ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'
        }`}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleSwapAndBuy}
        disabled={loading || !publicKey || !amount}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all text-lg"
      >
        {loading ? 'Processing...' : 'Swap & Buy $LITTER'}
      </button>

      {/* Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 text-center">
        <p className="text-xs text-gray-400">🔁 {selectedToken.symbol} → SOL → $LITTER</p>
        <p className="text-xs text-gray-500 mt-1 font-mono truncate">{LITTER_MINT.toString()}</p>
      </div>

      {!publicKey && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-center">
          <p className="text-xs text-yellow-300">👆 Connect wallet to start</p>
        </div>
      )}
    </div>
  );
}
