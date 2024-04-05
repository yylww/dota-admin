'use client'

import { useRouter } from "next/navigation"
import { createGame } from "@/app/lib/game"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        type: 0,
      }}
      onSubmit={async values => {
        console.log(values)
        await createGame(values)
        router.push('/dashboard/games')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}