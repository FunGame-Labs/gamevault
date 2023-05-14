import { useCollection, usePolybase } from '@polybase/react'

import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

export interface FileData {
  id: string
  title: string
  description: string
  signedMessage: string
  hash: string
  owner: string
  users: string[]
}

export function useDBByAddress(address: string) {
  const polybase = usePolybase()

  /**
   * File
   */
  const myFiles = useCollection<FileData>(
    address ? polybase.collection('File').where('owner', '==', address) : null
  )
  const saveFile = async (props: Omit<FileData, 'id'>) => {
    const { title, description, signedMessage, hash, owner } = props
    const id = nanoid(16)

    if (!address) {
      toast.error('Please sign in first.')
      return
    }

    const res = await polybase
      .collection('File')
      .create([id, title, description, signedMessage, hash, owner])
    return res
  }
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

  const saveFile = async (props: Omit<FileData, 'id'>) => {
    const { title, description, signedMessage, hash, owner } = props
    const id = nanoid(16)

    if (!address) {
      toast.error('Please sign in first.')
      return
    }

    const res = await polybase
      .collection('File')
      .create([id, title, description, signedMessage, hash, owner])
    return res
  }

  return {
    myFiles: (myFiles.data && myFiles.data.data) || undefined,
    saveFile,
  }
}
