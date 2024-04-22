'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { message } from "antd"
import { CollectionFormModal } from "./ModalForm"
import useSWR from "swr"
import { getRecentGameIds, getGameData } from "@/app/lib/opendata"
import { generateData } from "@/app/lib/generateData"
import { deleteMatch, getMatches, updateMatch } from "@/app/lib/match"
import { createGame } from "@/app/lib/game"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('matches', getMatches)
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
  if (error) {
    return <div>{ error.message }</div>
  }

  const handleSyncGame = async (match) => {
    try {
      const gameIds = await getRecentGameIds(match)
      if (gameIds.length > 0) {
        for (const gameId of gameIds) {
          const gameData = await getGameData(gameId)
          const gameParams = await generateData(gameData)
          console.log(gameParams)
          await createGame(JSON.parse(JSON.stringify({
            ...gameParams,
            id: gameId,
            tournamentId: match.tournamentId,
            stageId: match.stageId,
            matchId: match.id,
            type: match.type,
          })))
        }
        message.success('操作成功')
        mutate()
      } else {
        message.warning('暂无相关比赛')
      }
      setSyncLoading(false)
    } catch (error) {
      message.error(error.message, 10)
    }
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
          try {
            await updateMatch(id, JSON.parse(JSON.stringify(values)))
            message.success('操作成功')
            mutate()
          } catch (error) {
            message.error(error.message, 10)
          }
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
          try {
            await deleteMatch(id)
            mutate()
          } catch (error) {
            message.error(error.message, 10)
          }
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
            try {
              await createGame(JSON.parse(JSON.stringify({
                ...gameParams,
                id: gameId,
                tournamentId: rowData.tournamentId,
                stageId: rowData.stageId,
                matchId: rowData.id,
                type: values.type,
              })))
            } catch (error) {
              message.error(error.message, 10)
            }
          }
          message.success('操作成功')
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