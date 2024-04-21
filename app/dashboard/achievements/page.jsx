'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { deleteAchievement, getAchievements } from "@/app/lib/achievement"
import { message } from "antd"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('achievements', getAchievements)
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
          setQuery('')
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async id => {
          try {
            await deleteAchievement(id)
            message.success('操作成功')
            mutate()
          } catch (error) {
            message.error(error.message)
          }
        }}    
      />
    </>
  )
}