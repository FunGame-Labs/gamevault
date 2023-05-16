import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { useFileDetail } from '@/hooks/use-db'
import { gameVaultABI } from '@/utils/abi'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { parseEther } from 'viem'
import { useAccount, useContractWrite } from 'wagmi'

function shortenEthereumAddress(address: string, length = 8) {
  if (address.length <= length) {
    return address // Return the original address if it's already shorter or equal to the desired length
  } else {
    const prefixLength = Math.floor((length - 2) / 2)
    const suffixLength = length - prefixLength - 2
    const prefix = address.slice(0, prefixLength)
    const suffix = address.slice(-suffixLength)
    return prefix + '...' + suffix
  }
}

export default function Home() {
  const router = useRouter()
  const { id } = router.query

  const file = useFileDetail(id)
  const { address, isConnected } = useAccount()
  const [isBought, setIsBought] = useState(false)

  const { writeAsync } = useContractWrite({
    address: '0xb365B7E549D2c080EA91BA8f46b8eb64067f494c',
    abi: gameVaultABI,
    functionName: 'buyAsset',
    args: [file.data?.data.owner as `0x${string}`, address as `0x${string}`],
    value: parseEther('0.01'),
  })

  return (
    <>
      <Head>
        <title>GameVault</title>
        <meta name="description" content="Game Asset Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col">
        {/* Nav bar */}
        <Navbar />

        {/* Home content */}
        {file.data && (
          <div className="container flex min-h-[calc(100vh-264px)] w-full flex-col items-center justify-center gap-4">
            <h1 className="scroll-m-20 p-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {file.data.data.title}
            </h1>

            <div className="flex w-full flex-row justify-between gap-6 pt-20">
              <div className="relative h-56 w-full overflow-hidden rounded-lg p-4">
                <Image
                  src="https://image.lexica.art/full_jpg/36e1292c-51e1-421d-adde-edda1b22af4c"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-2 p-4">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Author
                </h2>
                <div>By {shortenEthereumAddress(file.data.data.owner)}</div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Description
                </h2>
                <div>{file.data.data.description}</div>
                <div>{new Date(parseInt(file.data.data.date)).toLocaleDateString()}</div>
                <div className="rounded-lg border px-4 py-2 font-bold">
                  {file.data.data.price ? file.data.data.price : '0.01 ETH'}
                </div>
                {isBought ? (
                  <a
                    href={file.data.data.file}
                    className="rounded-lg border px-4 py-2 hover:bg-slate-100"
                  >
                    Open Asset
                  </a>
                ) : (
                  <Button
                    onClick={async () => {
                      await writeAsync()!
                      setIsBought(true)

                      toast(
                        'Congratulations! 🎉 You have successfully acquired a new game asset'
                      )
                    }}
                  >
                    Buy Asset
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
