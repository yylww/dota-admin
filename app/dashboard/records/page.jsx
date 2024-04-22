'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { message } from "antd"
import { deleteRecord, getRecords } from "@/app/lib/record"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('records', getRecords)
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
            await deleteRecord(id)
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