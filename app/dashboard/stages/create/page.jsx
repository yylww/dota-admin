'use client'

import { useRouter } from "next/navigation"
import { createStage } from "@/app/lib/stage"
import { createMatch } from "@/app/lib/match"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const router = useRouter()

  const handleMatchData = (values, stageId) => {
    const arr = []
    values.groups.forEach(group => {
      const teams = group.list.map(item => item.teamId)
      for (let i = 0; i < teams.length - 1; i++) {
        const sliceTeams = teams.slice(i+1)
        for (let j = 0; j < sliceTeams.length; j++) {
          arr.push({
            homeTeamId: teams[i],
            awayTeamId: sliceTeams[j]
          })
        }
      }
    })
    return arr.map(item => ({
      startTime: new Date(),
      bo: values.bo,
      type: values.type,
      extra: false,
      tournamentId: values.tournamentId[0],
      stageId,  
      ...item,
    }))
  }
 
  return (
    <CollectionForm
      initialValues={{
        mode: 0,
      }}
      onSubmit={async values => {
        const stage = await createStage({
          ...values, 
          tournamentId: values.tournamentId[0],
        })
        if (values.mode === 0) {
          // 自动创建循环赛中所有系列赛
          const data = handleMatchData(values, stage.id)
          for (const item of data) {
            await createMatch(item)
          }
        }
        router.push('/dashboard/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}