import { useCollection, usePolybase, useRecord } from '@polybase/react'

import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

export interface FileData {
  id: string
  title: string
  description: string
  price: string
  date: string
  file: string
  owner: string
}

export const useFileDetail = (id: string | string[] | undefined) => {
  const polybase = usePolybase()
  const eventDetail = useRecord<FileData>(
    typeof id === 'string' ? polybase.collection('File').record(id) : null
  )
  return eventDetail
}

export function useDB() {
  const polybase = usePolybase()
  const { address } = useAccount()

  /**
   * File
   */
  const myFiles = useCollection<FileData>(
    address ? polybase.collection('File').where('owner', '==', address) : null
  )

  const allAssets = useCollection<FileData>(address ? polybase.collection('File') : null)

  const saveFile = async (props: Omit<FileData, 'owner' | 'id' | 'date'>) => {
    const { title, description, file, price } = props
    const id = nanoid(16)
    const date = String(Date.now())
    const owner = address as `0x${string}`

    if (!address) {
      toast.error('Please sign in first.')
      return
    }

    const res = await polybase
      .collection('File')
      .create([id, title, description, price, date, file, owner])
    return res
  }

  return {
    allAssets: (allAssets.data && allAssets.data.data) || undefined,
    myFiles: (myFiles.data && myFiles.data.data) || undefined,
    saveFile,
  }
}
