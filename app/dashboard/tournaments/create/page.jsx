'use client'

import { useRouter } from "next/navigation"
import { createTournament } from "@/app/lib/tournament"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      onSubmit={async values => {
        console.log(values)
        await createTournament(values)
        router.push('/dashboard/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}