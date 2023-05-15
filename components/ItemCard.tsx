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

export function ItemCard({
  title,
  description,
  imageUrl,
}: {
  title: string
  description: string
  imageUrl: string
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Image src={imageUrl} alt="" fill className="object-cover" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="ghost"></Button> */}
        <div>0.01 ETH</div>
        <Link href={'details'}>
          <Button>Buy Asset</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
