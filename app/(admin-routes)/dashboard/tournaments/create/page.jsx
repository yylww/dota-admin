'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import { createTournament } from "@/app/lib/tournament"
import { message } from "antd"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      onSubmit={async values => {
        try {
          await createTournament(JSON.parse(JSON.stringify(values)))
          message.success('操作成功')
          router.push('/dashboard/tournaments')
        } catch (error) {
          message.error(error.message, 10)
        }
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}