import { auth } from "@/auth";
import prisma from "@/app/utils/db";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams
  const status = searchParams.get('status') ? Number(searchParams.get('status')) : undefined
  const take = searchParams.get('take') ? Number(searchParams.get('take')) : undefined
  const skip = searchParams.get('status') ? Number(searchParams.get('status')) : undefined
  
  try {
    const matches = await prisma.match.findMany({
      where: {
        status: {
          equals: status,
        },
      },
      take,
      skip,
      orderBy: [
        { status: 'asc'},
        { startTime: 'desc' },
      ],
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