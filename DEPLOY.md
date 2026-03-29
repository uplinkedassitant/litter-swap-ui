# 🎯 Quick Deploy Guide - LitterBox Swap UI

## Your Token Info
- **LITTER Mint:** `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- **Bonding Curve:** Raydium LaunchLab
- **Network:** Devnet

## Step 1: Get Your Launch ID

1. Go to your LaunchLab page:
   https://dev.raydium.io/launchpad/EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ

2. Look for "Launch ID" or "Bonding Curve ID" in the URL or page details
3. Copy this ID - you'll need it!

## Step 2: Update Configuration

Edit `/home/jay/.openclaw/workspace/litter-swap-ui/app/components/SwapUI.tsx`:

```typescript
// Line ~12
const LAUNCH_ID = 'paste-your-launch-id-here'; // ← Update this!
```

## Step 3: Test Locally

```bash
cd /home/jay/.openclaw/workspace/litter-swap-ui
npm run dev
```

Open: http://localhost:3000

**Test Checklist:**
- [ ] Connect wallet works
- [ ] Can enter meme token mint
- [ ] Can enter amount
- [ ] Swap button is enabled
- [ ] Transactions go through (devnet)
- [ ] Receive LITTER tokens

## Step 4: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/jay/.openclaw/workspace/litter-swap-ui
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **(your choice)**
- Link to existing project? **N**
- Project name? **litter-swap-ui**
- Directory? **.**
- Override settings? **N**

## Step 5: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_LITTER_MINT=EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ
NEXT_PUBLIC_LAUNCH_ID=<your-launch-id>
```

**Redeploy after adding variables!**

## Step 6: Test Live dApp

1. Open your Vercel URL
2. Connect wallet
3. Test with a meme token
4. Verify you get LITTER tokens
5. Share your dApp!

## Example Usage

### Input:
- Meme Token: `ABC123...XYZ` (any SPL token on devnet)
- Amount: `1000`

### Output:
- User gets SOL from swap
- SOL used to buy LITTER
- LITTER appears in wallet!

## Troubleshooting

### Can't find Launch ID?
- Check Raydium LaunchPad URL
- Look in transaction history
- Check Raydium dashboard

### Swap fails?
- Ensure meme token has liquidity
- Check user has enough balance
- Verify slippage settings

### Buy fails?
- Verify Launch ID is correct
- Check bonding curve is active
- Ensure user has SOL after swap

## Success!

Once deployed, you'll have:
- ✅ Beautiful swap interface
- ✅ Support for any SPL token
- ✅ Direct LaunchLab integration
- ✅ Non-custodial trading
- ✅ Ready for mainnet!

**Share your dApp URL and start swapping!** 🚀
