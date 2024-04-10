import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const achievement = await prisma.achievement.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        teams: true,
      }
    })
    return Response.json(achievement)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = Number(params.id)
    const data = await req.json()
    try {
      const achievement = await prisma.achievement.update({ 
        where: { id },
        data: {
          ...data,
          teams: {
            set: data.teams.map(id => ({ id })),
          },
          players: {
            set: data.players.map(id => ({ id })),
          },
        },
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

export const DELETE = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = Number(params.id)
    try {
      const achievement = await prisma.achievement.delete({ where: { id }})
      return Response.json(achievement)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})