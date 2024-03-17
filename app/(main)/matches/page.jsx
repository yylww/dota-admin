'use client'

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination, message } from "antd"
import { CollectionFormModal } from "./ModalForm"
import useSWR, { useSWRConfig } from "swr"
import axios from 'axios'
import dayjs from "dayjs"
import { getMatchList, deleteMatch, updateMatch } from "@/app/api/match"
import { createGame } from "@/app/api/game"

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)

  const { mutate } = useSWRConfig()
  const {data, isLoading} = useSWR(['match', query, current, pageSize], () => getMatchList({query, current, pageSize}))

  const [open, setOpen] = useState(false)
  const [rowData, setRowData] = useState({})

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    query ? params.set('query', query) : params.delete('query')
    current ? params.set('current', current) : params.delete('current')
    pageSize ? params.set('pageSize', pageSize) : params.delete('pageSize')
    replace(`${pathname}?${params.toString()}`)
  }, [query, current, pageSize])

  const generateData = (fetchData) => {
    const startTime = dayjs(fetchData.start_time * 1000)
    const duration = fetchData.duration
    const radiantTeamId = fetchData.radiant_team_id
    const direTeamId = fetchData.dire_team_id
    const bans = fetchData.picks_bans.filter(item => item.is_pick === false).map(item => item.hero_id)
    const picks = fetchData.picks_bans.filter(item => item.is_pick === true).map(item => item.hero_id)
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
      radiantTeamId,
      direTeamId,
      bans,
      picks,
      records,
    }
  }
  return (
    <>
      <SearchForm
        query={query}
        onSubmit={values => {
          setCurrent(1)
          setQuery(values.query)
        }}
        onReset={() => {
          setCurrent(1)
          setQuery('')
        }}
      />
      {
        isLoading ? '' :
        <>
          <TableList
            data={data.list}
            onCellSave={async (id, values) => {
              await mutate(['match'], () => updateMatch(id, values))
              mutate(key => Array.isArray(key) && key[0] === 'match')
            }}
            onEdit={(values) => {
              setOpen(true)
              setRowData(values)
            }}
            onDelete={async id => {
              await mutate(['match', id], () => deleteMatch(id))
              mutate(key => Array.isArray(key) && key[0] === 'match')
            }}    
          />
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            current={current} 
            pageSize={pageSize} 
            total={data.total}
            onChange={(current, pageSize) => {
              setCurrent(current)
              setPageSize(pageSize)
            }}
          />
          <CollectionFormModal
            open={open}
            onSubmit={async (values) => {
              const gameIds = values.ids.split(' ')
              for (const gameId of gameIds) {
                const matchTeamIds = rowData.teams.map(item => item.id)
                const { data } = await axios.get(`https://api.opendota.com/api/matches/${gameId}`)
                if (!matchTeamIds.includes(data.radiant_team_id) || !matchTeamIds.includes(data.dire_team_id)) {
                  message.error(`ID不匹配: ${gameId}`)
                  return false
                }
                const gameData = generateData(data)
                await mutate(['game'], () => createGame({
                  ...gameData,
                  id: gameId,
                  tournamentId: rowData.tournamentId,
                  stageId: rowData.stageId,
                  matchId: rowData.id,
                  type: values.type,
                }))
                mutate(key => Array.isArray(key) && key[0] === 'match')
                mutate(key => Array.isArray(key) && key[0] === 'game')
                mutate(key => Array.isArray(key) && key[0] === 'record')
              }
              setOpen(false)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </>
      }
    </>
  )
}