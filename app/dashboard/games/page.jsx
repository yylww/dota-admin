'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { usePathname, useRouter } from "next/navigation"
import useSWR from "swr"
import { message } from "antd"
import { deleteGame, getGames } from "@/app/lib/game"

export default function Page({ searchParams }) {
  const pathname = usePathname();
  const { replace } = useRouter()
  const { data, isLoading, error, mutate } = useSWR('games', getGames)
  const [query, setQuery] = useState({ matchId: Number(searchParams.matchId) })
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
          const params = new URLSearchParams(searchParams)
          params.delete('matchId')
          replace(`${pathname}?${params.toString()}`)
          setQuery({})
        }}
      />
      <TableList
        data={filterData(query)}
        onDelete={async (id) => {
          try {
            await deleteGame(id)
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