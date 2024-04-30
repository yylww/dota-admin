'use client'

import { useState } from "react";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"
import { deleteStage, getStages } from "@/app/lib/stage";
import { message } from "antd";

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('/api/stages', getStages)
  const [query, setQuery] = useState({})
  const filterData = (query) => {
    if (query.tournamentId) {
      return data.filter(item => item.tournament.id === query.tournamentId)
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
          setQuery(values)
        }}
        onReset={() => {
          setQuery({})
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async id => {
          try {
            await deleteStage(id)
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