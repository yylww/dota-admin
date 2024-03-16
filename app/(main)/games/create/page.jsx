'use client'

import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createGame } from "@/app/api/game"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        type: 0,
      }}
      onSubmit={async values => {
        console.log(values)
        await mutate(['game'], () => createGame(values))
        mutate(key => Array.isArray(key) && key[0] === 'game')
        mutate(key => Array.isArray(key) && key[0] === 'record')
        router.push('/games')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}