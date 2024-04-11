const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

}

// execute the main function
main()
  .then(async () => {
    // change schema.prisma url 后执行一次 npx prisma db seed
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });