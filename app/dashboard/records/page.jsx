'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/records', fetcher)
  const [query, setQuery] = useState({})
  const filterData = ({ teamId, nickname }) => {
    let result = data
    if (teamId) {
      result = result.filter(item => item.game.radiantTeamId === teamId || item.game.direTeamId === teamId)
    }
    if (nickname) {
      result = result.filter(item => item.player.nickname.toLowerCase().includes(nickname.toLowerCase()))
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
          setQuery({})
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async id => {
          await fetch(`/api/records/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
    </>
  )
}