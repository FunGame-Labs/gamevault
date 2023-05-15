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
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Image
            src="https://image.lexica.art/full_jpg/36e1292c-51e1-421d-adde-edda1b22af4c"
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
        <a href={imageUrl}>Open Asset</a>
      </CardFooter>
    </Card>
  )
}
