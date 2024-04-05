'use client'

import { useRouter } from "next/navigation"
import { createAchievement } from "@/app/lib/achievement"
import { getTeams } from "@/app/lib/team"
import { CollectionForm } from "../CollectionForm"
import { useEffect, useState } from "react"

export default function Page() {
  const [teamData, setTeamData] = useState([])
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const data = await getTeams()
      setTeamData(data)
    })()
  }, [])
  return (
    <CollectionForm
      onSubmit={async values => {
        console.log(values)
        for (const item of values.ranks) {
          const players = []
          item.teams.forEach(id => {
            const filterTeam = teamData.filter(team => team.id === id)[0]
            filterTeam.players.forEach(player => {
              players.push(player.id)
            })
          })
          const params = {
            ...item,
            tournamentId: values.tournamentId[0],
            players,
          }
          await createAchievement(params)
        }
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}