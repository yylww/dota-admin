const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // const games = await prisma.game.findMany({ take: 5, skip: 5 })
  // console.log(games)
  // for (const item of games) {
  //   const radiantWin = item.records.filter(item => item.radiant)[0].win
  //   await prisma.game.update({
  //     where: { id: item.id },
  //     data: {
  //       radiantWin,
  //     }
  //   })
  // }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });