import { upload } from '@spheron/browser-upload'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  description: string
  files: FileList
}

export default function Home() {
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
  }

  const onSubmit = (data: FormValues) => {
    console.log('🚀 ~ file: upload.tsx:31 ~ onSubmit ~ data:', data)
    const fileListArray = Array.from(data.files)

    uploadFile(fileListArray)
  }

  return (
    <>
      <Head>
        <title>Next Boilerplate by Spheron</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Hello World</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input defaultValue="test" {...register('name')} />

          <label htmlFor="files">File</label>
          <input type="file" id="files" {...register('files')} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}