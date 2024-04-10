import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const team = await prisma.team.findUnique({ where: { id }})
    return Response.json(team)
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
      const team = await prisma.team.update({ 
        where: { id },
        data,
      })
      return Response.json(team)
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
      const team = await prisma.team.delete({ where: { id }})
      return Response.json(team)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})