import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const tournament = await prisma.tournament.findUnique({ 
      where: { id },
      include: {
        achievements: {
          include: {
            teams: true,
          },
        },
        teams: {
          include: {
            players: true,
          },
        },
      }
    })
    return Response.json(tournament)
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
      const tournament = await prisma.tournament.update({ 
        where: { id },
        data: {
          ...data,
          teams: {
            set: data.teams.map(id => ({ id })),
          },
        },
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

export const DELETE = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = Number(params.id)
    try {
      const tournament = await prisma.tournament.delete({ where: { id }})
      return Response.json(tournament)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})