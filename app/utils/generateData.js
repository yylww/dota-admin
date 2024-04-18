import dayjs from "dayjs"

export const generateData = (fetchData) => {
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
  const records = fetchData.players.map(item => {
    const { item_neutral, purchase_time, aghanims_scepter, aghanims_shard } = item
    const items = []
    for (let k = 0; k < 6; k++) {
      if (item[`item_${k}`]) {
        const detail = itemData.find(item => item.id === item[`item_${k}`])
        if (detail) {
          const purchaseTime = purchase_time ? purchase_time[detail.name] : undefined
          items.push({ ...detail, purchaseTime })
        }
      }
    }
    const neutral = itemData.find(item => item.id === item_neutral)
    const itemJSON = {
      items,
      neutral,
      scepter: !!aghanims_scepter,
      shard: !!aghanims_shard,
    }
    
    return {
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
      items: itemJSON,
    }
  })
  
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