'use client'

import { useState, useEffect } from "react"
import { updateTournament, getTournament } from "@/app/lib/tournament"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = params.id
  const router = useRouter()
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await getTournament(+id)
      setData(data)
    })()
  }, [])
  if (!data) {
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
        await updateTournament(id, values)
        router.push('/dashboard/tournaments')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}