import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const stages = await prisma.stage.findMany({
      include: {
        tournament: true,
      },
    })
    return Response.json(stages)
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
      const stage = await prisma.stage.create({ data })
      return Response.json(stage)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})