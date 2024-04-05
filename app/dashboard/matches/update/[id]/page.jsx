'use client'

import { useEffect, useState } from "react"
import { updateMatch, getMatch } from "@/app/lib/match"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = params.id
  const router = useRouter()
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await getMatch(+id)
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
        stageId: [data.tournament.id, data.stage.id],
        startTime: dayjs(data.startTime),
        teams: [data.teams[0].id, data.teams[1].id],
      }}
      onSubmit={async values => {
        console.log(values)
        await updateMatch(id, {
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        })
        router.push('/dashboard/matches')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
