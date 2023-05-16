import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDB } from '@/hooks/use-db'
import { upload } from '@spheron/browser-upload'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'

type FormValues = {
  name: string
  description: string
  price: string
  files: FileList
}

export function CreateAssetModal() {
  const [open, setOpen] = useState(false)
  const { saveFile } = useDB()

  const { register, handleSubmit } = useForm<FormValues>()

  const uploadFile = async (files: File[]) => {
    const response = await fetch(`/api/token`) // get the temporary access token from server
    const resJson = await response.json()
    const token = resJson.uploadToken

    let currentlyUploaded = 0

    const { uploadId, bucketId, protocolLink, dynamicLinks } = await upload(files, {
      token,
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`)
      },
    })
    console.log(
      '🚀 ~ file: upload.tsx:28 ~ uploadFile ~ uploadId, bucketId, protocolLink, dynamicLinks:',
      uploadId,
      bucketId,
      protocolLink,
      dynamicLinks
    )
    return protocolLink
  }

  const onSubmit = async (data: FormValues) => {
    console.log('🚀 ~ file: upload.tsx:31 ~ onSubmit ~ data:', data)
    const fileListArray = Array.from(data.files)

    const link = await uploadFile(fileListArray)
    await saveFile({
      title: data.name,
      description: data.description,
      price: data.price,
      file: link,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Asset</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Asset</DialogTitle>
            <DialogDescription>Upload your asset here</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                placeholder="Magic Potions"
                className="col-span-3"
                {...register('name')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="a powerful artifact that has been passed down through generations of wizards and sorcerers. This ancient talisman is said to hold within it the secrets of magic and the ability to harness its power."
                className="col-span-3"
                {...register('description')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                placeholder="0.01"
                className="col-span-3"
                {...register('price')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="files" className="text-right">
                Assets
              </Label>
              <Input
                type="file"
                id="files"
                className="col-span-3"
                {...register('files')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
