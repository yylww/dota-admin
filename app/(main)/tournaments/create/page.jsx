'use client'

import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createTournament } from "@/app/api/tournament"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  return (
    <CollectionForm
      onSubmit={async values => {
        console.log(values)
        await mutate(['tournament'], () => createTournament(values))
        mutate(key => Array.isArray(key) && key[0] === 'tournament')
        router.push('/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}