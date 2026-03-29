# 🚀 Deploy to Vercel - Quick Guide

## ✅ GitHub Repository Created!

Your repository is now live on GitHub!

**Repository URL:** 
```
https://github.com/YOUR_GITHUB_USERNAME/litter-swap-ui
```

(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)

---

## 📝 Deploy to Vercel via Web UI (5 Minutes)

### Step 1: Go to Vercel
Open: **https://vercel.com/new**

### Step 2: Import Git Repository
1. Click **"Import Git Repository"**
2. Select your GitHub account
3. Find **`litter-swap-ui`** in the list
4. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect Next.js. Verify settings:

- **Framework:** Next.js ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅
- **Install Command:** `npm install` ✅

### Step 4: Add Environment Variables ⚠️ IMPORTANT!

Click **"Environment Variables"** and add these 4 variables:

| Variable Name | Value |
|--------------|--------|
| `NEXT_PUBLIC_NETWORK` | `devnet` |
| `NEXT_PUBLIC_RPC_URL` | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_LITTER_MINT` | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |
| `NEXT_PUBLIC_LAUNCH_ID` | `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ` |

**Make sure to set them for "Production" environment**

### Step 5: Deploy!
Click **"Deploy"** and wait 2-3 minutes.

Your app will be live at: `https://litter-swap-ui.vercel.app`
(Or a custom Vercel URL they assign)

---

## 🎯 What You'll Get

After deployment:
- ✅ Live URL: `https://litter-swap-ui.vercel.app`
- ✅ HTTPS enabled
- ✅ Automatic deployments on git push
- ✅ Environment variables configured

---

## 🧪 Test Your dApp

1. Open your Vercel URL
2. Connect wallet (Phantom/Solflare on Devnet)
3. Enter a meme token mint
4. Enter amount
5. Click "Swap & Buy $LITTER"
6. Approve transactions
7. Receive $LITTER tokens!

---

## 📊 Your Token Details

- **Token:** LitterBox ($LITTER)
- **Mint:** `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- **Launch ID:** `EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ`
- **Network:** Devnet

---

## 🔗 Quick Links

- **GitHub:** https://github.com/YOUR_USERNAME/litter-swap-ui
- **Vercel:** https://vercel.com/new
- **Your LaunchPad:** https://raydium.io/launchpad/token/?mint=EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ

---

## Need Help?

- Check `README.md` for full documentation
- See `DEPLOY-VERCEL.md` for detailed deployment guide
- Vercel docs: https://vercel.com/docs

**Ready to deploy?** Just follow the steps above! 🚀
