'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import useSWR from "swr"
import { CollectionForm } from "../../CollectionForm"
import { getStage, updateStage } from "@/app/lib/stage"
import { message } from "antd"

export default function Page({ params }) {
  const id = Number(params.id)
  const { data, isLoading, error, mutate } = useSWR(`/api/stages/${id}`, () => getStage(id))
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
        tournament: [data.tournamentId],
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      }}
      onSubmit={async values => {
        const params ={
          ...values,
          tournamentId: values.tournamentId[0],
        }
        try {
          await updateStage(id, JSON.parse(JSON.stringify(params)))
          message.success('操作成功')
          mutate()
          router.push('/dashboard/stages')
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