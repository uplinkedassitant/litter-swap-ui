# 🚀 LitterBox Swap UI - LaunchLab Integration

A Next.js dApp that lets users swap any SPL meme token → SOL → $LITTER LaunchLab tokens on Raydium.

## Features

- ✅ **Wallet Connection** - Phantom, Solflare support
- ✅ **Token Swap** - Swap any SPL token to SOL via Raydium
- ✅ **LaunchLab Buy** - Automatically buy $LITTER tokens with SOL
- ✅ **Non-Custodial** - User signs all transactions
- ✅ **Devnet Ready** - Test with fake SOL first
- ✅ **Beautiful UI** - Modern, responsive design

## Quick Start

### 1. Install Dependencies
```bash
cd /home/jay/.openclaw/workspace/litter-swap-ui
npm install
```

### 2. Configure Your LaunchLab Token
Edit `app/components/SwapUI.tsx` and update:
```typescript
const LITTER_MINT = new PublicKey('EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ');
const LAUNCH_ID = 'your-launch-id-from-raydium'; // Get from Raydium
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## How It Works

### User Flow
1. User connects wallet (Phantom/Solflare)
2. User enters:
   - Meme token mint address
   - Amount to swap
3. Click "Swap & Buy $LITTER"
4. Transaction executes:
   - Step 1: Swap meme token → SOL (Raydium CPMM/CLMM)
   - Step 2: Buy $LITTER with SOL (Raydium LaunchLab)
5. User receives $LITTER tokens in wallet

### Technical Flow
```
User's Wallet
    ↓
Connect Wallet (Wallet Adapter)
    ↓
Input: Meme Token + Amount
    ↓
Raydium SDK
    ├─ Compute Route (Meme → SOL)
    └─ Build Swap Transaction
    ↓
LaunchLab SDK
    └─ Build Buy Transaction (SOL → LITTER)
    ↓
Sign Transactions (User)
    ↓
Execute on Solana
    ↓
User receives LITTER tokens
```

## Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_LITTER_MINT=EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ
NEXT_PUBLIC_LAUNCH_ID=your-launch-id
```

### Raydium Setup
```typescript
import { Raydium, DEVNET_PROGRAM_ID } from '@raydium-io/raydium-sdk-v2';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const raydium = await Raydium.load({
  owner: publicKey,
  connection,
  cluster: 'devnet',
});
```

## Testing on Devnet

### Prerequisites
- Devnet SOL (get from faucet)
- Devnet meme tokens (create test token or use existing)
- $LITTER LaunchLab token already created

### Test Steps
1. Go to http://localhost:3000
2. Connect wallet
3. Enter a meme token mint (devnet)
4. Enter amount
5. Click "Swap & Buy $LITTER"
6. Approve transactions in wallet
7. Check token balance

## Deployment

### Deploy to Vercel
```bash
vercel --prod
```

### Environment Variables on Vercel
Add these in Vercel dashboard:
- `NEXT_PUBLIC_NETWORK` = `devnet`
- `NEXT_PUBLIC_RPC_URL` = `https://api.devnet.solana.com`
- `NEXT_PUBLIC_LITTER_MINT` = `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- `NEXT_PUBLIC_LAUNCH_ID` = `your-launch-id`

## Important Notes

### Devnet Specifics
- Use `cluster: 'devnet'` in all SDK calls
- Use `DEVNET_PROGRAM_ID` from Raydium SDK
- All tokens and pools must exist on devnet
- Get devnet SOL from: https://faucet.solana.com/

### LaunchLab Requirements
- Your LaunchLab token must be created first
- Bonding curve must be active
- You need the launch ID from Raydium
- Test buy/sell on Raydium UI first

### Swap Requirements
- Meme token must have a pool with SOL
- User must approve token spending
- Slippage should be set appropriately (1-2%)
- Gas fees paid in SOL

## Troubleshooting

### "Insufficient liquidity"
- Meme token needs a SOL pool
- Add liquidity to the pool first

### "Transaction failed"
- Check slippage settings
- Verify token has decimals correct
- Ensure user has enough SOL for fees

### "LaunchLab buy failed"
- Verify launch ID is correct
- Check bonding curve is active
- Ensure user has enough SOL

## Resources

- [Raydium SDK v2 Docs](https://github.com/raydium-io/raydium-sdk-v2)
- [Raydium LaunchLab Demo](https://github.com/raydium-io/raydium-sdk-V2-demo/tree/master/src/launchpad)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Your LaunchLab Token](https://dev.raydium.io/launchpad/EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ)

## Next Steps

1. ✅ Get your LaunchLab ID from Raydium
2. ✅ Update configuration in SwapUI.tsx
3. ✅ Test on devnet thoroughly
4. ✅ Deploy to Vercel
5. ✅ Share your dApp!

## License

MIT
