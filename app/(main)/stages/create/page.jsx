'use client'

import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createStage } from "@/app/api/stage"
import { createMatch } from "@/app/api/match"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { mutate } = useSWRConfig()
  const router = useRouter()

  const handleMatchData = (values, stageId) => {
    const arr = []
    values.groups.forEach(group => {
      const { teams } = group
      for (let i = 0; i < teams.length - 1; i++) {
        const sliceTeams = teams.slice(i+1)
        for (let j = 0; j < sliceTeams.length; j++) {
          arr.push([teams[i], sliceTeams[j]])
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
      teams: item,
    }))
  }
 
  return (
    <CollectionForm
      initialValues={{
        mode: 0,
      }}
      onSubmit={async values => {
        const stage = await mutate(['stage'], () => createStage({
          ...values, 
          tournamentId: values.tournamentId[0],
        }))
        if (values.mode === 0) {
          // 自动创建循环赛中所有系列赛
          const data = handleMatchData(values, stage.id)
          for (const item of data) {
            await mutate(['match'], () => createMatch(item))
          }
        }
        mutate(key => Array.isArray(key) && key[0] === 'stage')
        mutate(key => Array.isArray(key) && key[0] === 'match')
        router.push('/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}