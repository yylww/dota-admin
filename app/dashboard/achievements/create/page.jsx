'use client'

import { useRouter } from "next/navigation"
import { CollectionForm } from "../CollectionForm"
import useSWR from "swr"

export default function Page() {
  const router = useRouter()
  const fetcher = url => fetch(url).then(r => r.json())
  const {data, isLoading} = useSWR('/api/teams', fetcher)
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
          await fetch('/api/achievements', { method: 'POST', body: JSON.stringify(params) })
        }
        router.push('/dashboard/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}