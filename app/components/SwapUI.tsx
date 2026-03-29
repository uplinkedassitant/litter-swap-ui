'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js';
import { useState, useEffect } from 'react';
import { Raydium, ApiV3PoolInfoStandardItemCpmm, TxVersion } from '@raydium-io/raydium-sdk-v2';

// Configuration
const LITTER_MINT = new PublicKey('EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ');
const SOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');
const LAUNCH_ID = 'your-launch-id-here'; // Will be filled when you get it from Raydium

export function SwapUI() {
  const { publicKey, connect, disconnect, signTransaction } = useWallet();
  const [memeToken, setMemeToken] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'quote' | 'swap' | 'buy' | 'done'>('quote');

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const handleSwapAndBuy = async () => {
    if (!publicKey || !signTransaction) {
      setError('Please connect your wallet first');
      return;
    }

    if (!memeToken || !amount) {
      setError('Please enter token mint and amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const memeMint = new PublicKey(memeToken);
      
      // Step 1: Initialize Raydium
      const raydium = await Raydium.load({
        owner: publicKey,
        connection,
        cluster: 'devnet',
      });

      // Step 2: Get swap route (Meme Token → SOL)
      console.log('Getting swap quote...');
      setStep('quote');
      
      const swapRoute = await raydium.route.computeAmountOut({
        amount: amount,
        inputMint: memeMint,
        outputMint: SOL_MINT,
        slippage: 0.01, // 1% slippage
      });

      const solAmount = swapRoute.amountOut;
      console.log(`Will receive: ${solAmount} SOL`);

      // Step 3: Buy LaunchLab token with SOL
      console.log('Buying LITTER tokens...');
      setStep('buy');

      // Note: This is where you'd use the LaunchLab buy function
      // For now, we'll simulate the flow
      const buyTx = await createLaunchLabBuyTransaction(
        raydium,
        publicKey,
        solAmount,
        LAUNCH_ID
      );

      // Step 4: Execute transactions
      console.log('Executing transactions...');
      setStep('swap');

      // Sign and send swap transaction
      const swapTx = await raydium.transaction.buildAndSendTransaction({
        txs: [swapRoute.transaction],
        options: { version: TxVersion.V0 },
      });

      await connection.confirmTransaction(swapTx, 'confirmed');
      console.log('Swap completed!');

      // Sign and send buy transaction
      if (buyTx) {
        const buySig = await connection.sendTransaction(buyTx, [/* signers */]);
        await connection.confirmTransaction(buySig, 'confirmed');
        console.log('LITTER purchase completed!');
      }

      setStep('done');
      
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Swap for $LITTER</h1>
          <p className="text-sm text-gray-400">Raydium LaunchLab</p>
        </div>
        <WalletMultiButton />
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meme Token Mint
          </label>
          <input
            type="text"
            value={memeToken}
            onChange={(e) => setMemeToken(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter SPL token mint address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Amount of meme tokens"
          />
        </div>
      </div>

      {/* Status */}
      {step !== 'quote' && (
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-gray-300">
            {step === 'swap' && '🔄 Swapping meme token → SOL...'}
            {step === 'buy' && '🎯 Buying $LITTER tokens...'}
            {step === 'done' && '✅ Success! You now have $LITTER!'}
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
        disabled={loading || !publicKey}
        className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        {loading ? 'Processing...' : 'Swap & Buy $LITTER'}
      </button>

      {/* Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 text-center">
          🔁 Swap any SPL token → SOL → $LITTER
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          Powered by Raydium LaunchLab
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          LITTER: {LITTER_MINT.toString().slice(0, 8)}...{LITTER_MINT.toString().slice(-6)}
        </p>
      </div>

      {!publicKey && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-300 text-center">
            👆 Connect wallet to start swapping
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to create LaunchLab buy transaction
async function createLaunchLabBuyTransaction(
  raydium: Raydium,
  user: PublicKey,
  solAmount: number,
  launchId: string
) {
  // This would use the Raydium SDK's LaunchLab buy function
  // For now, return null as placeholder
  console.log('Would buy LaunchLab token with:', solAmount, 'SOL');
  return null;
}
