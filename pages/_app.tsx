import '@/styles/globals.css'
import { Polybase } from '@polybase/client'
import { PolybaseProvider } from '@polybase/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { createPublicClient, http } from 'viem'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { filecoinHyperspace } from 'wagmi/chains'

const polybase = new Polybase({
  defaultNamespace:
    'pk/0xa6ca155c486fde1b93ec326c8d6d625a24cea697027449ea8a51dad1752e26998fd99b0ff13d7d3078fe5154a819868d171a2317f121b7328e7d15ca674ae3b3/dataverse',
})

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: filecoinHyperspace,
    transport: http(),
  }),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PolybaseProvider polybase={polybase}>
      <WagmiConfig config={config}>
        <Toaster />
        <Component {...pageProps} />
      </WagmiConfig>
    </PolybaseProvider>
  )
}
