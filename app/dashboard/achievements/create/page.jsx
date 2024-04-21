'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import useSWR from "swr"
import { getTeams } from "@/app/lib/team"
import { createAchievement } from "@/app/lib/achievement"
import { message } from "antd"

export default function Page() {
  const router = useRouter()
  const { data, isLoading, error } = useSWR('teams', getTeams)
  if (error) {
    return <div>{ error.message }</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      onSubmit={async values => {
        for (const item of values.ranks) {
          const players = []
          item.teams.forEach(id => {
            const filterTeam = data.filter(team => team.id === id)[0]
            filterTeam.players.forEach(player => {
              players.push(player.id)
            })
          })
          const params = {
            ...item,
            tournamentId: values.tournamentId[0],
            players,
          }
          try {
            await createAchievement(params)
          } catch (error) {
            message.error(error.message)
          }
        }
        message.success('操作成功')
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}