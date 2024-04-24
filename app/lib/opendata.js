import axios from "axios"
import { getGame } from "./game"

export const getRecentGameIds = async ({ homeTeamId, awayTeamId, bo }) => {
  try {
    const gameIds = []
    const { data } = await axios.get(`https://api.opendota.com/api/teams/${homeTeamId}/matches`)
    const matches = data.slice(0, bo).filter(item => item.opposing_team_id === awayTeamId)
    for (const item of matches) {
      const gameId = `${item.match_id}`
      const game = await getGame(gameId)
      if (!game) {
        gameIds.push(gameId)
      }
    }
    return gameIds
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}

export const getGameData = async (id) => {
  try {
    const { data } = await axios.get(`https://api.opendota.com/api/matches/${id}`)
    return data
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}