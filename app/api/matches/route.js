import { auth } from "@/auth";
import prisma from "@/app/utils/db";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams
  const take = searchParams.get('take') ? Number(searchParams.get('take')) : undefined
  const skip = searchParams.get('skip') ? Number(searchParams.get('skip')) : undefined
  const status = searchParams.get('status')
  const ids = searchParams.get('ids')
  const orderBy = searchParams.get('sort') ? JSON.parse(searchParams.get('sort')) : [{ status: 'asc'}, { startTime: 'desc' }]
  const where = {}
  if (status) {
    where.status = { equals: Number(status) }
  }
  if (ids) {
    const matchIds = ids.split(',').map(item => Number(item))
    where.OR = [
      { homeTeamId: matchIds[0], awayTeamId: matchIds[1] },
      { homeTeamId: matchIds[1], awayTeamId: matchIds[0] },
    ]
  }
  try {
    const matches = await prisma.match.findMany({
      where,
      take,
      skip,
      orderBy,
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
      }
    })
    return Response.json(matches)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    try {
      const data = await req.json()
      const match = await prisma.match.create({ data })
      return Response.json(match)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
});