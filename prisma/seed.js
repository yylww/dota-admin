const { PrismaClient } = require('@prisma/client')
const { default: axios } = require('axios')
const prisma = new PrismaClient()

async function main() {
  
}

// execute the main function
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })