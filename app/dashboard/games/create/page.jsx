'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import { message } from "antd"
import { createGame } from "@/app/lib/game"

export default function Page() {
  const router = useRouter()
  return (
    <CollectionForm
      initialValues={{
        type: 0,
      }}
      onSubmit={async values => {
        try {
          await createGame(values)
          message.success('操作成功')
          router.push('/dashboard/games')
        } catch (error) {
          message.error(error.message)
        }
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}