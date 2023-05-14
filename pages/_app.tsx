import '@/styles/globals.css'
import { Polybase } from '@polybase/client'
import { PolybaseProvider } from '@polybase/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { createPublicClient, http } from 'viem'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'

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
