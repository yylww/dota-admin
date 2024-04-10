'use client'

import { useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { message } from "antd"
import { CollectionFormModal } from "./ModalForm"
import dayjs from "dayjs"
import useSWR from "swr"
import { getRecentGames, getGameData } from "@/app/utils/opendata"

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

  const generateData = (fetchData) => {
    const startTime = dayjs(fetchData.start_time * 1000)
    const duration = fetchData.duration
    const radiantTeamId = fetchData.radiant_team_id
    const direTeamId = fetchData.dire_team_id
    const bans = fetchData.picks_bans.filter(item => !item.is_pick).map(item => ({
      order: item.order,
      heroId: item.hero_id,
      radiant: item.team === 0,
    }))
    const picks = fetchData.picks_bans.filter(item => item.is_pick).map(item => ({
      order: item.order,
      heroId: item.hero_id,
      radiant: item.team === 0,
    }))
    const records = fetchData.players.map(item => ({
      playerId: item.account_id,
      heroId: item.hero_id,
      radiant: item.isRadiant,
      win: !!item.win,
      xpm: item.xp_per_min,
      gpm: item.gold_per_min,
      kills: item.kills,
      deaths: item.deaths,
      assists: item.assists,
      level: item.level,
      heroDamage: item.hero_damage,
      towerDamage: item.tower_damage,
      lastHits: item.last_hits,
      denies: item.denies,
      netWorth: item.net_worth,
      healing: item.hero_healing,
    }))
    
    return {
      startTime,
      duration,
      radiantWin: records.filter(item => item.radiant)[0].win,
      radiantTeamId,
      direTeamId,
      bans,
      picks,
      records,
    }
  }

  const createGame = async (data) => {
    fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  const handleSyncGame = async (match) => {
    const games = await getRecentGames(match)
    if (games.length > 0) {
      const gameIds = games.map(item => `${item.match_id}`)
      for (const gameId of gameIds) {
        const game = await fetch(`/api/games/${gameId}`).then(r => r.json())
        if (!game) {
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
      }
      mutate()
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