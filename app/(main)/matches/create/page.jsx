'use client'

import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createMatch } from "@/app/api/match"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        type: 0,
        extra: false,
      }}
      onSubmit={async values => {
        console.log(values)
        await mutate(['match'], () => createMatch({
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        }))
        mutate(key => Array.isArray(key) && key[0] === 'match')
        router.push('/matches')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}