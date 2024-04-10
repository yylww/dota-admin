'use client'

import { useState } from "react";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/tournaments', fetcher)
  const [query, setQuery] = useState(null)
  const filterData = (query) => {
    if (query) {
      return data.filter(item => {
        const { title } = item
        return title.includes(query)
      })
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
          setQuery(values.query)
        }}
        onReset={() => {
          setQuery('')
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async id => {
          await fetch(`/api/tournaments/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
    </>
  )
}