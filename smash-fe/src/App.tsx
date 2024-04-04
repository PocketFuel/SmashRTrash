import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { Toaster } from 'react-hot-toast';

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import { SocketProvider } from './contexts/SocketProvider';
import { useMemo } from 'react';
import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const network = WalletAdapterNetwork.Devnet;

  const yourListOfWallets = useMemo(
    () => [
        /**
         * Wallets that implement either of these standards will be available automatically.
         *
         *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
         *     (https://github.com/solana-mobile/mobile-wallet-adapter)
         *   - Solana Wallet Standard
         *     (https://github.com/anza-xyz/wallet-standard)
         *
         * If you wish to support a wallet that supports neither of those standards,
         * instantiate its legacy wallet adapter here. Common legacy adapters can be found
         * in the npm package `@solana/wallet-adapter-wallets`.
         */
        // new UnsafeBurnerWalletAdapter(),
        new SolflareWalletAdapter(),
        new PhantomWalletAdapter()
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
);


  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  return (
    <SocketProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={yourListOfWallets} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' Component={Home} />
              </Routes>
            </BrowserRouter>
            <Toaster position='top-right' />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SocketProvider>
  )
}

export default App
