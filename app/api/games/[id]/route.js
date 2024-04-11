import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = params.id
  try {
    const game = await prisma.game.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        radiant: true,
        dire: true,
        records: true,
        bans: true,
        picks: true,
      },
    })
    return Response.json(game)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = params.id
    const data = await req.json()
    try {
      const game = await prisma.game.update({ 
        where: { id },
        data, 
      })
      return Response.json(game)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
});

export const DELETE = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = params.id
    try {
      // 删除game时，先删除相关records
      await prisma.game.update({
        where: { id },
        data: {
          records: {
            deleteMany: {},
          },
        },
      })
      const game = await prisma.game.delete({ where: { id }})
      return Response.json(game)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
})