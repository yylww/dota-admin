'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import useSWR from "swr"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, isLoading, mutate } = useSWR(`/api/matches/${params.id}`, fetcher)
  const router = useRouter()

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
        await fetch(`/api/matches/${params.id}`, { method: 'POST', body: JSON.stringify(params) })
        mutate()
        router.push('/dashboard/matches')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
