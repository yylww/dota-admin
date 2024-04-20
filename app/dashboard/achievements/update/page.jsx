'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import useSWR from "swr"

export default function Page({ searchParams }) {
  const id = Number(searchParams.tournament)
  const router = useRouter()
  const fetcher = url => fetch(url).then(r => r.json())
  const {data, isLoading, mutate} = useSWR(`/api/tournaments/${id}`, fetcher)
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
          const url = item.id ? `/api/achievements/${item.id}` : '/api/achievements'
          await fetch(url, { method: 'POST', body: JSON.stringify(params) })
        }
        mutate()
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
