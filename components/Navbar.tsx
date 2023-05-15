import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className="flex w-full flex-row items-center justify-between border px-6 py-4">
      <div className="flex w-full flex-row gap-2">
        <div className="flex flex-row pr-4">
          <div className="p-1">
            <Image
              src="/gamevault_transparent.png"
              alt="logo"
              width={'20'}
              height={'20'}
            />
          </div>
          <div className="pl-0 text-lg font-bold">GameVault</div>
        </div>
        <Link className="hover:text-blue-700" href={'/'}>
          Marketplace
        </Link>
        <Link className="hover:text-blue-700" href={'/dashboard'}>
          Dashboard
        </Link>
      </div>
      <Button>Connect</Button>
    </div>
  )
}
