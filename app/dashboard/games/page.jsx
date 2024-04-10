'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import useSWR from "swr"

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/games', fetcher)
  const [query, setQuery] = useState({ matchId: Number(searchParams.get('matchId')) })
  const filterData = ({ stageId, matchId, teamId }) => {
    let result = data
    if (stageId) {
      result = result.filter(item => item.stageId === stageId)
    }
    if (matchId) {
      result = result.filter(item => item.matchId === matchId)
    }
    if (teamId) {
      result = result.filter(item => item.radiantTeamId === teamId || item.direTeamId === teamId)
    }
    return result
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <SearchForm
        onSubmit={values => {
          setQuery(values)
        }}
        onReset={() => {
          const params = new URLSearchParams(searchParams)
          params.delete('matchId')
          replace(`${pathname}?${params.toString()}`)
          setQuery({})
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async (id) => {
          await fetch(`/api/games/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
    </>
  )
}