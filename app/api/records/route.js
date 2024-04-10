import { auth } from "@/auth";
import prisma from "@/app/utils/db";

export const GET = async () => {
  try {
    const records = await prisma.record.findMany({
      include: {
        player: true,
        hero: true,
        game: {
          include: {
            radiant: true,
            dire: true,
          }
        },
      }
    })
    return Response.json(records)
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
      const record = await prisma.record.create({ data })
      return Response.json(record)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
});