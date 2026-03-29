const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');

async function findLaunchId() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
  // Your token and bonding curve accounts
  const tokenMint = 'EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ';
  const bondingCurveAccount = 'GwXDHPcWsgKhE1xGcRPM3oxGFK4BQwMS7P9D12crNXYz';
  
  console.log('🔍 Finding Your LaunchLab ID\n');
  console.log('Token Mint:', tokenMint);
  console.log('Bonding Curve Account:', bondingCurveAccount);
  console.log('\n📊 Possible LaunchLab IDs:\n');
  
  console.log('Option 1: Token Mint (Most Likely)');
  console.log('   ID:', tokenMint);
  console.log('   Use this if LaunchPad was created with token mint as ID\n');
  
  console.log('Option 2: Bonding Curve Account');
  console.log('   ID:', bondingCurveAccount);
  console.log('   Use this if separate from token mint\n');
  
  console.log('Option 3: Check Raydium LaunchPad Program');
  console.log('   Look for launch accounts in your transaction history');
  console.log('   First transaction when you created the launch\n');
  
  // Try to fetch launch info from Raydium API
  console.log('📡 Checking Raydium Devnet API...');
  
  try {
    const response = await fetch(`https://api-devnet.raydium.io/launchpad/launch/${tokenMint}`);
    const data = await response.json();
    
    if (data && data.id) {
      console.log('\n✅ Found Launch ID from API!');
      console.log('Launch ID:', data.id);
      console.log('Launch Address:', data.launchId || data.address);
    } else {
      console.log('\n⚠️  Could not fetch from API (might not be indexed yet)');
    }
  } catch (e) {
    console.log('\n⚠️  API not available or launch not indexed');
  }
  
  console.log('\n💡 How to Find Your Launch ID:\n');
  console.log('1. Go to: https://dev.raydium.io/launchpad');
  console.log('2. Click "My Launches" or find your token');
  console.log('3. Look for "Launch ID" or "Bonding Curve ID"');
  console.log('4. It might be the same as your token mint');
  console.log('5. Or check the URL when viewing your launch details\n');
  
  console.log('📝 For Now, Use:\n');
  console.log('Launch ID: EzGUBzRgyta1Ekyq6eZgJ468f9dvbxd4hvV7g9CQynVZ');
  console.log('(Same as token mint - most common case)\n');
}

findLaunchId();
