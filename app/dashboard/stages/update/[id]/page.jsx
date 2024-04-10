'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import useSWR from "swr"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, isLoading, mutate } = useSWR(`/api/stages/${params.id}`, fetcher)
  const router = useRouter()

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
        console.log(values)
        const params ={
          ...values,
          tournamentId: values.tournamentId[0],
        }
        await fetch(`/api/stages/${params.id}`, { method: 'POST', body: JSON.stringify(params) })
        mutate()
        router.push('/dashboard/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}