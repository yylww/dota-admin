'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { message } from "antd"
import { deleteTournament, getTournaments } from "@/app/lib/tournament"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('tournaments', getTournaments)
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
  
  if (error) {
    return <div>{ error.message }</div>
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
          try {
            await deleteTournament(id)
            message.success('操作成功')
            mutate()
          } catch (error) {
            message.error(error.message, 10)
          }
        }}    
      />
    </>
  )
}