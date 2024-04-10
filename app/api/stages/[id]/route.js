import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const stage = await prisma.stage.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        matches: {
          include: {
            games: {
              include: {
                records: true,
              }
            },
            homeTeam: true,
            awayTeam: true,
          }
        },
      }
    })
    return Response.json(stage)
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
      const stage = await prisma.stage.update({ 
        where: { id },
        data,
      })
      return Response.json(stage)
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
      const stage = await prisma.stage.delete({ where: { id }})
      return Response.json(stage)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})