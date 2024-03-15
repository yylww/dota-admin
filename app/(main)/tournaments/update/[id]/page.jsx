'use client'

import { updateTournament, getTournament } from "@/app/api/tournament"
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = params.id
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useSWR(['tournament', id], () => getTournament(id))
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
        console.log(values)
        await mutate(['tournament'], () => updateTournament(id, values))
        mutate(key => Array.isArray(key) && key[0] === 'tournament')
        router.push('/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}