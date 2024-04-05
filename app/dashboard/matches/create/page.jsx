'use client'

import { useRouter } from "next/navigation"
import { createMatch } from "@/app/lib/match"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        type: 0,
        group: 0,
        extra: false,
      }}
      onSubmit={async values => {
        await createMatch({
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        })
        router.push('/dashboard/matches')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}