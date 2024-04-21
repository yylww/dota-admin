'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import useSWR from "swr"
import { message } from "antd"
import { getTournament } from "@/app/lib/tournament"
import { createAchievement, updateAchievement } from "@/app/lib/achievement"

export default function Page({ searchParams }) {
  const id = Number(searchParams.tournament)
  const router = useRouter()
  const {data, isLoading, error, mutate} = useSWR('tournament', () => getTournament(id))
  if (error) {
    return <div>{ error.message }</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ranks: data.achievements.map(item => ({ ...item, teams: item.teams.map(team => team.id)})),
        tournamentId: [id],
      }}
      onSubmit={async values => {
        for (const item of values.ranks) {
          const players = []
          item.teams.forEach(id => {
            const filterTeam = data.teams.filter(team => team.id === id)[0]
            filterTeam.players.forEach(player => {
              players.push(player.id)
            })
          })
          const params = {
            ...item,
            tournamentId: id,
            players,
          }
          try {
            if (item.id) {
              await updateAchievement(id, params)
            } else {
              await createAchievement(params)
            }
          } catch (error) {
            message.error(error.message)
          }
        }
        message.success('操作成功')
        mutate()
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
