# 🚀 Deploy LitterBox Swap UI to Vercel - Complete Guide

## Your App is Ready! ✅

Your LitterBox Swap UI is configured and ready to deploy:
- **Token:** LitterBox ($LITTER)
- **Mint:** `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- **Launch ID:** `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- **Network:** Devnet

---

## Method 1: Deploy via Vercel Web UI (Easiest - Recommended)

### Step 1: Push to GitHub

```bash
cd /home/jay/.openclaw/workspace/litter-swap-ui

# Initialize git repo
git init
git add .
git commit -m "LitterBox Swap UI - Ready for deployment"

# Create GitHub repo and push
# (Replace with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/litter-swap-ui.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to:** https://vercel.com/new
2. **Click:** "Import Git Repository"
3. **Select:** Your GitHub account
4. **Find:** `litter-swap-ui` repository
5. **Click:** "Import"

### Step 3: Configure Build Settings

Vercel will auto-detect Next.js. Verify:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### Step 4: Add Environment Variables

In the Vercel deployment page, click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_NETWORK` | `devnet` |
| `NEXT_PUBLIC_RPC_URL` | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_LITTER_MINT` | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |
| `NEXT_PUBLIC_LAUNCH_ID` | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |

### Step 5: Deploy!

Click **"Deploy"** and wait ~2-3 minutes.

Your app will be live at: `https://litter-swap-ui.vercel.app`

---

## Method 2: Deploy via Vercel CLI (Advanced)

If you prefer CLI and have Vercel account linked:

```bash
cd /home/jay/.openclaw/workspace/litter-swap-ui

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variables after deployment
vercel env add NEXT_PUBLIC_NETWORK devnet
vercel env add NEXT_PUBLIC_RPC_URL https://api.devnet.solana.com
vercel env add NEXT_PUBLIC_LITTER_MINT EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ
vercel env add NEXT_PUBLIC_LAUNCH_ID EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ

# Redeploy with env vars
vercel --prod
```

---

## Method 3: Quick Deploy Button (Fastest)

Create a `vercel.json` (already done) and use:

```bash
cd /home/jay/.openclaw/workspace/litter-swap-ui

# One-line deploy (if you have Vercel CLI installed and logged in)
vercel --prod --env NEXT_PUBLIC_NETWORK=devnet --env NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com --env NEXT_PUBLIC_LITTER_MINT=EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ --env NEXT_PUBLIC_LAUNCH_ID=EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ
```

---

## After Deployment

### 1. Test Your Live App

Open your Vercel URL (e.g., `https://litter-swap-ui.vercel.app`) and test:
- [ ] Connect wallet works
- [ ] Can enter meme token
- [ ] Can enter amount
- [ ] Swap button works
- [ ] Transactions go through on devnet

### 2. Share Your dApp

Once tested, share your URL:
- Twitter: "Just deployed my $LITTER Swap UI on @vercel! Swap any SPL token → $LITTER via @Raydium LaunchLab 🚀"
- Telegram/Discord communities
- Your project docs

### 3. Monitor & Update

- Check deployment logs in Vercel dashboard
- Update code → push to GitHub → Vercel auto-deploys
- Add analytics if needed

---

## Environment Variables Reference

| Variable | Description | Your Value |
|----------|-------------|------------|
| `NEXT_PUBLIC_NETWORK` | Solana network | `devnet` |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_LITTER_MINT` | Your token mint | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |
| `NEXT_PUBLIC_LAUNCH_ID` | LaunchLab ID | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |

---

## Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first to catch errors

### Wallet Connect Doesn't Work
- Ensure you're using HTTPS (Vercel provides this)
- Check browser compatibility
- Verify wallet adapter is installed

### Swap Doesn't Work
- Verify Launch ID is correct
- Check token has liquidity
- Ensure user is on devnet
- Check console for errors

---

## Your Live URLs

After deployment, you'll have:
- **Production:** `https://litter-swap-ui.vercel.app`
- **Preview URLs:** For each git branch (optional)

---

## Next Steps

1. ✅ Deploy to Vercel (use Method 1 - easiest)
2. ✅ Test on devnet
3. ✅ Share your dApp!
4. ✅ Plan mainnet launch for $LiEs

**Ready to deploy?** Follow Method 1 above - it takes about 5 minutes total! 🚀
