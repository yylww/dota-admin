'use client'

import { useState } from "react";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/stages', fetcher)
  const [query, setQuery] = useState({})
  const filterData = (query) => {
    if (query.tournamentId) {
      return data.filter(item => item.tournament.id === query.tournamentId)
    }
    return data
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
          await fetch(`/api/stages/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
    </>
  )
}