import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ProductAuthentication from '@/artifiacts/contracts/ProductAuthentication.sol/ProductAuthentication.json';
import ProductRegistry from '@/artifiacts/contracts/ProductRegistry.sol/ProductRegistry.json';
import ManufacturerRegistry from '@/artifiacts/contracts/ManufacturerRegistry.sol/ManufacturerRegistry.json';

const PRODUCT_AUTH_ADDRESS = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as string;
const SEPOLIA_RPC_URL =
  'https://sepolia.infura.io/v3/19c128a1840a43f1a33d7ea64f7b3969';

type ProviderType = 'sepolia' | 'wallet';

export function useContracts(providerType: ProviderType) {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const [pa, setPa] = useState<ethers.Contract | null>(null);
  const [pr, setPr] = useState<ethers.Contract | null>(null);
  const [mr, setMr] = useState<ethers.Contract | null>(null);

  const [prAddress, setPrAddress] = useState('');
  const [mrAddress, setMrAddress] = useState('');

  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load provider when providerType changes
  useEffect(() => {
    async function initProvider() {
      try {
        if (providerType === 'sepolia') {
          const rpcProvider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
          setProvider(rpcProvider);
          await initContracts(rpcProvider);
        } else if (providerType === 'wallet' && typeof window.ethereum !== 'undefined') {
          const walletProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(walletProvider);
        }
      } catch (err) {
        console.error('Error initializing provider:', err);
        setError('Failed to initialize provider.');
      }
    }

    initProvider();
  }, [providerType]);

  // Connect wallet
  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      setError('No wallet provider found.');
      return;
    }

    try {
      const walletProvider = new ethers.BrowserProvider(window.ethereum);
      const walletSigner = await walletProvider.getSigner();
      setSigner(walletSigner);

      const address = await walletSigner.getAddress();
      setWalletAddress(address);

     const res =  await initContracts(walletSigner);
     console.log(res)
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet.');
    }
  }

  // Initialize contracts
  async function initContracts(providerOrSigner: ethers.Provider | ethers.Signer) {
    try {
      const paContract = new ethers.Contract(
        PRODUCT_AUTH_ADDRESS,
        ProductAuthentication.abi,
        providerOrSigner
      );
      setPa(paContract);

      const prAddr = await paContract.getProductRegistry();
      const mrAddr = await paContract.getManufacturerRegistry();
      setPrAddress(prAddr);
      setMrAddress(mrAddr);

      const prContract = new ethers.Contract(prAddr, ProductRegistry.abi, providerOrSigner);
      const mrContract = new ethers.Contract(mrAddr, ManufacturerRegistry.abi, providerOrSigner);

      setPr(prContract);
      setMr(mrContract);
      console.log(prContract, mrContract)
    } catch (err) {
      console.error('Error initializing contracts:', err);
      setError('Failed to initialize contracts.');
    }
  }

  return {
    provider,
    signer,
    pa,
    pr,
    mr,
    prAddress,
    mrAddress,
    walletAddress,
    error,
    connectWallet,
  };
}
