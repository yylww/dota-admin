'use client'

import { useRouter } from "next/navigation"
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
        await fetch('/api/games', { method: 'POST', body: JSON.stringify(data) })
        router.push('/dashboard/games')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}