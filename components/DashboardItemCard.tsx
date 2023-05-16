import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type CardData = {
  title: string
  description: string
  price: string
  imageUrl: string
  date: string
  author: string
}

export function DashboardItemCard({
  title,
  description,
  imageUrl,
  date,
  author,
}: CardData) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="truncate">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Image
            src={'https://image.lexica.art/full_jpg/4004339d-549b-4a6f-8fd9-e8a42ead1f1d'}
            alt=""
            fill
            className="object-cover"
          />
          <div>{new Date(parseInt(date)).toLocaleDateString()}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="ghost"></Button> */}
        {/* <div></div>
        <Link href={'details'}>
          <Button>Buy Asset</Button>
        </Link> */}
        <a href={imageUrl} className="rounded-lg border px-4 py-2 hover:bg-slate-100">
          Open Asset
        </a>
      </CardFooter>
    </Card>
  )
}
