'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      onSubmit={async values => {
        await fetch('/api/tournaments', { method: 'POST', body: JSON.stringify(values) })
        router.push('/dashboard/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}