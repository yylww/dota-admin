'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import useSWR from "swr"
import { CollectionForm } from "../../CollectionForm"
import { getMatch, updateMatch } from "@/app/lib/match"
import { message } from "antd"

export default function Page({ params }) {
  const id = Number(params.id)
  const { data, isLoading, error, mutate } = useSWR('match', () => getMatch(id))
  const router = useRouter()
  if (error) {
    return <div>{ error.message }</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ...data,
        stageId: [data.tournament.id, data.stage.id],
        startTime: dayjs(data.startTime),
      }}
      onSubmit={async values => {
        const params = {
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        }
        try {
          await updateMatch(id, JSON.parse(JSON.stringify(params)))
          message.success('操作成功')
          mutate()
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
