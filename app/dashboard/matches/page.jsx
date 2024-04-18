'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { message } from "antd"
import { CollectionFormModal } from "./ModalForm"
import useSWR from "swr"
import { getRecentGameIds, getGameData } from "@/app/utils/opendata"
import { generateData } from "@/app/utils/generateData"

export default function Page() {

  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/matches', fetcher)
  const [query, setQuery] = useState({})
  const [open, setOpen] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const [rowData, setRowData] = useState({})

  const filterData = ({ stageId, teamId }) => {
    let result = data
    if (stageId) {
      result = result.filter(item => item.stageId === stageId)
    }
    if (teamId) {
      result = result.filter(item => item.homeTeamId === teamId || item.awayTeamId === teamId)
    }
    return result
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  const createGame = async (data) => {
    await fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  const handleSyncGame = async (match) => {
    const gameIds = await getRecentGameIds(match)
    console.log(gameIds)
    if (gameIds.length > 0) {
      for (const gameId of gameIds) {
        const gameData = await getGameData(gameId)
        const gameParams = generateData(gameData)
        await createGame({
          ...gameParams,
          id: gameId,
          tournamentId: match.tournamentId,
          stageId: match.stageId,
          matchId: match.id,
          type: match.type,
        })
      }
      await mutate()
    } else {
      message.warning('暂无相关比赛')
    }
    setSyncLoading(false)
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
        onCellSave={async (id, values) => {
          await fetch(`/api/matches/${id}`, { method: 'POST', body: JSON.stringify(values)})
          mutate()
        }}
        onAddGame={(values) => {
          setOpen(true)
          setRowData(values)
        }}
        onSyncGame={(values) => {
          setSyncLoading(true)
          handleSyncGame(values)
        }}
        onAuto={async (id) => {
          const data = await fetch('/api/cron', { method: 'POST', body: JSON.stringify({ id })}).then(r => r.json())
          message.success(data.message)
        }}
        syncLoading={syncLoading}
        onDelete={async id => {
          await fetch(`/api/matches/${id}`, { method: 'DELETE' })
          mutate()
        }}    
      />
      <CollectionFormModal
        open={open}
        onSubmit={async (values) => {
          const gameIds = values.ids.split(' ')
          for (const gameId of gameIds) {
            const gameData = await getGameData(gameId)
            const matchTeamIds = [rowData.homeTeamId, rowData.awayTeamId]
            if (!matchTeamIds.includes(gameData.radiant_team_id) || !matchTeamIds.includes(gameData.dire_team_id)) {
              message.error(`ID不匹配: ${gameId}`)
              return false
            }
            const gameParams = generateData(gameData)
            await createGame({
              ...gameParams,
              id: gameId,
              tournamentId: rowData.tournamentId,
              stageId: rowData.stageId,
              matchId: rowData.id,
              type: values.type,
            })
          }
          mutate()
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}