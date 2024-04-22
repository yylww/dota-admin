'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"
import useSWR from "swr"
import { getTournament, updateTournament } from "@/app/lib/tournament"
import { message } from "antd"

export default function Page({ params }) {
  const id = Number(params.id)
  const { data, isLoading, error, mutate } = useSWR('tournament', () => getTournament(id))
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
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
        teams: data.teams.map(item => item.id),
      }}
      onSubmit={async values => {
        try {
          await updateTournament(id, JSON.parse(JSON.stringify(values)))
          message.success('操作成功')
          mutate()
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