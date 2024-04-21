'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import { message } from "antd"
import { createStage } from "@/app/lib/stage"
import { createMatch } from "@/app/lib/match"

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
        bo: 3,
        type: 0,
      }}
      onSubmit={async values => {
        const params = {
          ...values, 
          tournamentId: values.tournamentId[0],
        }
        try {
          const stage = await createStage(JSON.parse(JSON.stringify(params)))
          if (values.mode === 0) {
            // 自动创建循环赛中所有系列赛
            const data = handleMatchData(values, stage.id)
            for (const item of data) {
              await createMatch(JSON.parse(JSON.stringify(item)))
            }
          }
        } catch (error) {
          message.error(error.message)
        }
        message.success('操作成功')
        router.push('/dashboard/stages')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}