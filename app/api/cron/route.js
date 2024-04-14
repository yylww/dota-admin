import { CronJob } from "cron";
import prisma from "@/app/utils/db";
import { auth } from "@/auth";
import axios from "axios";
import { generateData } from "@/app/utils/generateData";

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const { id } = await req.json()
    const gameIds = []
    const job = new CronJob(
      '0 */10 * * * *',
      async () => {
        console.log('Start sync...')
        try {
          const match = await prisma.match.findUnique({ where: { id }})
          const { homeTeamId, awayTeamId, bo, status } = match
          const { data } = await axios.get(`https://api.opendota.com/api/teams/${homeTeamId}/matches`)
          const matches = data.slice(0, bo).filter(item => item.opposing_team_id === awayTeamId)
          console.log('Recent matches: ', matches.map(item => item.match_id).join(', '))
          for (const item of matches) {
            const gameId = `${item.match_id}`
            const gameExist = await prisma.game.findUnique({ where: { id: gameId }})
            console.log(`Check match ${gameId} is exist: `, gameExist)
            if (!gameExist) {
              console.log('Fetch opendata: ', gameId)
              const gameRes = await axios.get(`https://api.opendota.com/api/matches/${gameId}`)
              console.log('Fetch finished', gameId)
              const gameParams = generateData(gameRes.data)
              const createGameData = {
                ...gameParams,
                id: gameId,
                tournamentId: match.tournamentId,
                stageId: match.stageId,
                matchId: match.id,
                type: match.type,
              }
              console.log('Create game: ', gameId)
              const game = await prisma.game.create({
                data: {
                  ...createGameData,
                  records: {
                    create: createGameData.records,
                  },
                  bans: {
                    create: createGameData.bans
                  },
                  picks: {
                    create: createGameData.picks
                  },
                },
                include: {
                  match: true,
                },
              })
              // 创建game之后，更新match状态和比分
              let { homeTeamId, homeScore, awayScore, status, bo } = game.match
              if (homeTeamId === game.radiantTeamId) {
                game.radiantWin ? (homeScore += 1) : (awayScore += 1)
              } else {
                !game.radiantWin ? (homeScore += 1) : (awayScore += 1)
              }
              if (homeScore + awayScore === bo) {
                status = 2
              } else {
                status = [homeScore, awayScore].some(item => Number(item) > (bo / 2)) ? 2 : 1
              }
              await prisma.match.update({
                where: { id: game.matchId },
                data: {
                  homeScore,
                  awayScore,
                  status,
                }
              })
              console.log('Create finished', gameId)
              gameIds.push(game.id)
            }
          }
          if (status >= 2) {
            job.stop()
          }
        } catch (error) {
          console.log('Failed', error)
          job.stop()
        }
        
      }, 
      () => {
        console.log('complete', gameIds.join(', '))
      },
      true,
    )
    return Response.json({ message: 'success', status: 200 })
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})