import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: [
        {
          tournament: {
            createdAt: 'desc'
          },
        },
        { bonus: 'desc' },
      ],
      include: {
        tournament: true,
        teams: true,
      },
    })
    return Response.json(achievements)
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
      const achievement = await prisma.achievement.create({
        data: {
          ...data,
          teams: {
            connect: data.teams.map(id => ({ id })),
          },
          players: {
            connect: data.players.map(id => ({ id }))
          },
        }
      })
      return Response.json(achievement)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})