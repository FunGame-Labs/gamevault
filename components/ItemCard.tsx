import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

export function ItemCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Asset title</CardTitle>
        <CardDescription>Asset description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Image
            src="https://image.lexica.art/full_jpg/36e1292c-51e1-421d-adde-edda1b22af4c"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="ghost"></Button> */}
        <div></div>
        <Button>Buy Asset</Button>
      </CardFooter>
    </Card>
  )
}
