'use client'

import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createStage } from "@/app/api/stage"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { mutate } = useSWRConfig()
  const router = useRouter()
 
  return (
    <CollectionForm
      onSubmit={async values => {
        console.log(values)
        await mutate(['stage'], () => createStage(values))
        mutate(key => Array.isArray(key) && key[0] === 'stage')
        router.push('/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}