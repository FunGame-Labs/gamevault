import { ItemCard } from '@/components/ItemCard'
import { Navbar } from '@/components/Navbar'
import { useDB } from '@/hooks/use-db'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { allAssets } = useDB()

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
        <div className="container flex min-h-[calc(100vh-264px)] w-full flex-col items-center justify-center gap-4">
          <h1 className="scroll-m-20 p-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Best Game assets always available
          </h1>
          <div className="text-lg font-semibold">
            Build your game with the best AI generated game assets
          </div>

          <div className="flex w-full flex-row justify-between pt-20">
            {/* {allAssets && allAssets.map((asset) => <ItemCard key={asset.data.id} />)} */}
            <ItemCard
              id="129fDFMcUOzvbdrT"
              title="Gold Weapon Set"
              description=""
              imageUrl={
                'https://image.lexica.art/full_jpg/36e1292c-51e1-421d-adde-edda1b22af4c'
              }
            />
            <ItemCard
              id="129fDFMcUOzvbdrT"
              title="Knight Starter"
              description=""
              imageUrl={
                'https://image.lexica.art/full_jpg/029dd30f-b197-4592-854e-61b04fe18ec9'
              }
            />
            <ItemCard
              id="129fDFMcUOzvbdrT"
              title="Wizard Stones"
              description=""
              imageUrl={
                'https://image.lexica.art/full_jpg/c3a5f46a-e2f7-45c8-87e6-4a13d8563588'
              }
            />
          </div>
        </div>
      </main>
    </>
  )
}
