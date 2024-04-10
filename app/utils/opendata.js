import axios from "axios"
import { message } from "antd"

export const getRecentGames = async ({ homeTeamId, awayTeamId, bo }) => {
  try {
    const { data } = await axios.get(`https://api.opendota.com/api/teams/${homeTeamId}/matches`)
    const matches = data.filter(item => item.opposing_team_id === awayTeamId).slice(0, bo)
    return matches
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