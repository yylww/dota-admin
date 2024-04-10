'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"
import useSWR from "swr"

export default function Page({ params }) {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, isLoading, mutate } = useSWR(`/api/tournaments/${params.id}`, fetcher)
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
        teams: data.teams.map(item => item.id),
      }}
      onSubmit={async values => {
        await fetch(`/api/tournaments/${params.id}`, { method: 'POST', body: JSON.stringify(values) })
        mutate()
        router.push('/dashboard/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}