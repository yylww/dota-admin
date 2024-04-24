import dayjs from "dayjs"
import { getItems } from "./item"

export const generateData = async (fetchData) => {
  const itemData = await getItems()
  const startTime = dayjs(fetchData.start_time * 1000)
  const duration = fetchData.duration
  const radiantTeamId = fetchData.radiant_team_id
  const direTeamId = fetchData.dire_team_id
  const radiantScore = fetchData.radiant_score
  const direScore = fetchData.dire_score
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
  const records = fetchData.players.map(player => {
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
    const itemJSON = {
      equipments: items,
      neutral,
      scepter: aghanims_scepter,
      shard: aghanims_shard,
    }
    
    return {
      playerId: player.account_id,
      heroId: player.hero_id,
      radiant: player.isRadiant,
      win: !!player.win,
      xpm: player.xp_per_min,
      gpm: player.gold_per_min,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      level: player.level,
      heroDamage: player.hero_damage,
      towerDamage: player.tower_damage,
      lastHits: player.last_hits,
      denies: player.denies,
      netWorth: player.net_worth,
      healing: player.hero_healing,
      items: itemJSON,
    }
  })
  
  return {
    startTime,
    duration,
    radiantWin: records.filter(item => item.radiant)[0].win,
    radiantTeamId,
    direTeamId,
    radiantScore,
    direScore,
    bans,
    picks,
    records,
  }
}