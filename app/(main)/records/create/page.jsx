'use client'

import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import { createAchievement } from "@/app/api/achievement"
import { getAllTeam } from "@/app/api/team"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const { data, isLoading } = useSWR(['team'], getAllTeam)
  const { mutate } = useSWRConfig()
  const router = useRouter()
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      onSubmit={async values => {
        console.log(values)
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
          await mutate(['achievement'], () => createAchievement(params))
        }
        mutate(key => Array.isArray(key) && key[0] === 'achievement')
        router.push('/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}