'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        bo: 3,
        status: 0,
        type: 0,
        group: 0,
        extra: false,
      }}
      onSubmit={async values => {
        const params = {
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        }
        await fetch('/api/matches', { method: 'POST', body: JSON.stringify(params) })
        router.push('/dashboard/matches')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}