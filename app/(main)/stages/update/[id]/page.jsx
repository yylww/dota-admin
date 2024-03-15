'use client'

import { updateStage, getStage } from "@/app/api/stage"
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = params.id
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useSWR(['stage', id], () => getStage(id))
  const router = useRouter()
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      }}
      onSubmit={async values => {
        console.log(values)
        await mutate(['stage'], () => updateStage(id, values))
        mutate(key => Array.isArray(key) && key[0] === 'stage')
        router.push('/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}