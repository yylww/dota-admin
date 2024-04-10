import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        stages: {
          include: {
            matches: {
              include: {
                homeTeam: true,
                awayTeam: true,
              }
            },
          }
        },
      }
    })
    return Response.json(tournaments)
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
      const tournament = await prisma.tournament.create({
        data: {
          ...data,
          teams: {
            connect: data.teams.map(id => ({ id })),
          },
        }
      })
      return Response.json(tournament)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})