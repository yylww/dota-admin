'use client'

import { useEffect, useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination, message } from "antd"
import { CollectionFormModal } from "./ModalForm"
import axios from 'axios'
import dayjs from "dayjs"
import { getMatchList, deleteMatch, updateMatch } from "@/app/lib/match"
import { createGame } from "@/app/lib/game"

export default function Page() {
  const [query, setQuery] = useState({})
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [rowData, setRowData] = useState({})
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  const handleTableData = async () => {
    const take = pageSize
    const skip = (current - 1) * pageSize
    const data = await getMatchList(query, take, skip)
    setTableData(data)
  }

  useEffect(() => {
    handleTableData()
  }, [query.stageId, query.teamId, current, pageSize])

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
  return (
    <>
      <SearchForm
        query={query}
        onSubmit={values => {
          setCurrent(1)
          setQuery(values)
        }}
        onReset={() => {
          setCurrent(1)
          setQuery({})
        }}
      />
      <TableList
        data={tableData.list}
        onCellSave={async (id, values) => {
          await updateMatch(id, values)
          handleTableData()
        }}
        onAddGame={(values) => {
          setOpen(true)
          setRowData(values)
        }}
        onDelete={async id => {
          await deleteMatch(id)
          handleTableData()
        }}    
      />
      <div className="mt-4 text-right">
        <Pagination
          current={current} 
          pageSize={pageSize} 
          total={tableData.total}
          onChange={(current, pageSize) => {
            setCurrent(current)
            setPageSize(pageSize)
          }}
        />
      </div>
      <CollectionFormModal
        open={open}
        onSubmit={async (values) => {
          const gameIds = values.ids.split(' ')
          for (const gameId of gameIds) {
            const matchTeamIds = [rowData.homeTeamId, rowData.awayTeamId]
            let opendota = null
            try {
              const res = await axios.get(`https://api.opendota.com/api/matches/${gameId}`)
              opendota = res.data
            } catch (error) {
              message.error('opendata error: ', error.message)
            }
            if (!matchTeamIds.includes(opendota.radiant_team_id) || !matchTeamIds.includes(opendota.dire_team_id)) {
              message.error(`ID不匹配: ${gameId}`)
              return false
            }
            const gameData = generateData(opendota)
            await createGame({
              ...gameData,
              id: gameId,
              tournamentId: rowData.tournamentId,
              stageId: rowData.stageId,
              matchId: rowData.id,
              type: values.type,
            })
          }
          await handleTableData()
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}