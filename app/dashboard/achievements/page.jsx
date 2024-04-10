'use client'

import { useState } from "react";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/achievements', fetcher)
  const [query, setQuery] = useState({})
  const filterData = ({tournamentId, teamId}) => {
    let result = data
    if (tournamentId) {
      result = result.filter(item => item.tournamentId === tournamentId)
    }
    if (teamId) {
      result = result.filter(item => item.teams.some(team => team.id === teamId))
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
          setQuery('')
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async id => {
          await fetch(`/api/achievements/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
    </>
  )
}