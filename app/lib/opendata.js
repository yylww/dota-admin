import axios from "axios"
import { message } from "antd"

export const getRecentGameIds = async ({ homeTeamId, awayTeamId, bo }) => {
  try {
    const gameIds = []
    const { data } = await axios.get(`https://api.opendota.com/api/teams/${homeTeamId}/matches`)
    const matches = data.filter(item => item.opposing_team_id === awayTeamId).slice(0, bo)
    for (const item of matches) {
      const gameId = item.match_id
      const game = await fetch(`/api/games/${gameId}`).then(r => r.json())
      if (!game) {
        gameIds.push(`${gameId}`)
      }
    }
    console.log(111, gameIds)
    return gameIds
  } catch (error) {
    console.log('Failed', error)
    message.error(error, 10)
  }
}

export const getGameData = async (id) => {
  try {
    const { data } = await axios.get(`https://api.opendota.com/api/matches/${id}`)
    return data
  } catch (error) {
    console.log('Failed', error)
    message.error(error, 10)
  }
}