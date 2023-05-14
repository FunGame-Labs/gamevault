import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { Polybase } from '@polybase/client'
import { PolybaseProvider } from '@polybase/react'
import { Toaster } from 'react-hot-toast'

const polybase = new Polybase({
  defaultNamespace: 'gamevault-v1',
})

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
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
