import { auth } from "@/auth";
import prisma from "@/app/utils/db";

export const GET = async () => {
  try {
    const games = await prisma.game.findMany({
      orderBy: [
        { startTime: 'desc' },
      ],
      include: {
        radiant: true,
        dire: true,
        records: true,
      }
    })
    return Response.json(games)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const data = await req.json()
    try {
      const game = await prisma.game.create({
        data: {
          ...data,
          records: {
            create: data.records,
          },
          bans: {
            create: data.bans
          },
          picks: {
            create: data.picks
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
      return Response.json(game)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
});