'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import { createMatch } from "@/app/lib/match"
import { message } from "antd"

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
        try {
          await createMatch(JSON.parse(JSON.stringify(params)))
          message.success('操作成功')
          router.push('/dashboard/matches')
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