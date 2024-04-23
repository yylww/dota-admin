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
import { getItems } from "@/app/lib/item"
import { updateRecord } from "@/app/lib/record"
import { usePathname, useRouter } from "next/navigation"

export default function Page({ searchParams }) {
  const { tournament, teamId, status } = searchParams
  const pathname = usePathname()
  const { replace } = useRouter()
  const [query, setQuery] = useState({ 
    tournament: tournament ? tournament.split(',').map(n => +n) : null,
    teamId: teamId ? +teamId : null,
    status: status ? +status : null,
  })
  const [open, setOpen] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const [rowData, setRowData] = useState({})
  const { data, isLoading, error, mutate } = useSWR('matches', getMatches)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{ error.message }</div>
  }

  const handleSearchParams = (values) => {
    const params = new URLSearchParams(values)
    const { tournament, teamId, status } = values
    tournament ? params.set('tournament', tournament.join(',')) : params.delete('tournament')
    teamId ? params.set('teamId', teamId) : params.delete('teamId')
    typeof status === 'number' ? params.set('status', status) : params.delete('status')
    replace(`${pathname}?${params.toString()}`)
  }

  const filterData = ({ tournament, teamId, status }) => {
    let result = data
    if (tournament) {
      result = result.filter(item => item.stageId === tournament[1])
    }
    if (teamId) {
      result = result.filter(item => item.homeTeamId === teamId || item.awayTeamId === teamId)
    }
    if (typeof status === 'number') {
      result = result.filter(item => item.status === status)
    }
    return result
  }

  return (
    <>
      <SearchForm
        query={query}
        onSubmit={values => {
          setQuery(values)
          handleSearchParams(values)
        }}
        onReset={() => {
          setQuery({})
          handleSearchParams({})
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
        onUpdateGame={async ({ games }) => {
          if (games.length <= 0) return 
          setSyncLoading(true)
          for (const game of games) {
            try {
              const itemData = await getItems()
              const gameData = await getGameData(game.id)
              const { players } = gameData
              players.map(async (player) => {
                const { item_neutral, purchase_log, aghanims_scepter, aghanims_shard } = player
                const items = []
                for (let k = 0; k < 6; k++) {
                  if (player[`item_${k}`]) {
                    const detail = itemData.find(item => item.id === player[`item_${k}`])
                    if (detail) {
                      const purchase = purchase_log ? purchase_log.findLast(item => item.key === detail.name) : null
                      const purchaseTime = purchase ? purchase.time : undefined
                      items.push({ ...detail, purchaseTime })
                    }
                  }
                }
                const neutral = itemData.find(item => item.id === item_neutral)
                const updateData = {
                  equipments: items,
                  neutral,
                  scepter: aghanims_scepter,
                  shard: aghanims_shard,
                }
                const record = game.records.find(item => item.playerId === player.account_id)
                await updateRecord(record.id, { items: updateData })
              })
            } catch (error) {
              message.error(error.message, 10)
            }
          }
          message.success('操作成功')
          setSyncLoading(false)
        }}
        onSyncGame={async (match) => {
          setSyncLoading(true)
          try {
            const gameIds = await getRecentGameIds(match)
            if (gameIds.length > 0) {
              for (const gameId of gameIds) {
                const gameData = await getGameData(gameId)
                const gameParams = await generateData(gameData)
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