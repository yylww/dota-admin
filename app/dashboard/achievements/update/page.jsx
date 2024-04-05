'use client'

import { useState, useEffect } from "react"
import { getTournament } from "@/app/lib/tournament"
import { updateAchievement, createAchievement } from "@/app/lib/achievement"
import { getTeams } from "@/app/lib/team"
import { useRouter, useSearchParams } from "next/navigation"
import { CollectionForm } from "../CollectionForm"

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get('tournament')
  const [teamData, setTeamData] = useState([])
  const [tournamentData, setTournamentData] = useState(null)
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const teams = await getTeams()
      const tournament = await getTournament(+id)
      setTeamData(teams)
      setTournamentData(tournament)
    })()
  }, [])
  if (!tournamentData) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ranks: tournamentData.achievements.map(item => ({ ...item, teams: item.teams.map(team => team.id)})),
        tournamentId: [+id],
      }}
      onSubmit={async values => {
        console.log(values)
        for (const item of values.ranks) {
          const players = []
          item.teams.forEach(id => {
            const filterTeam = teamData.data.filter(team => team.id === id)[0]
            filterTeam.players.forEach(player => {
              players.push(player.id)
            })
          })
          const params = {
            ...item,
            tournamentId: id,
            players,
          }
          if (item.id) {
            await updateAchievement(item.id, params)
          } else {
            await createAchievement(params)
          }
        }
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
