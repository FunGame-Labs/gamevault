import { CreateAssetModal } from '@/components/CreateAssetModal'
import { DashboardItemCard } from '@/components/DashboardItemCard'
import { Navbar } from '@/components/Navbar'
import { useDB } from '@/hooks/use-db'
import Head from 'next/head'

export default function Home() {
  const { myFiles, saveFile } = useDB()

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
          <CreateAssetModal />

          <div className="flex w-full flex-row pt-20 gap-4">
            {myFiles?.map((file) => {
              return (
                <DashboardItemCard
                  key={file.data.id}
                  title={file.data.title}
                  description={file.data.description}
                  price={file.data.price}
                  imageUrl={file.data.file}
                  date={file.data.date}
                  author={file.data.owner}
                />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
