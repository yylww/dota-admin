'use client'

import { useEffect, useState } from "react"
import { updateStage, getStage } from "@/app/lib/stage"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = Number(params.id)
  const router = useRouter()
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await getStage(+id)
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
        tournament: [data.tournamentId],
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      }}
      onSubmit={async values => {
        console.log(values)
        await updateStage(id, {
          ...values,
          tournamentId: values.tournamentId[0],
        })
        router.push('/dashboard/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}