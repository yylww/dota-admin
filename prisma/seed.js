const { PrismaClient } = require('@prisma/client');
const { default: axios } = require('axios');
const prisma = new PrismaClient()
const fs = require('fs')
const path = require('path')

const downloadImage = async (url, dest, name) => {
  let response
  try {
    response = await axios.get(url, { responseType: 'stream' });
  } catch (error) {
    console.log(111, error)
  }
  
  const writer = fs.createWriteStream(`./public/${dest}/${name}.png`);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve();
      console.log(`${name} finished.`)
    });
    writer.on('error', (error) => {
      reject();
      console.log(`${name} error: ${error.message}`);
    });
  })
}

async function main() {
  let arr = ['cheese_lg', 'aghanims_shard_roshan_lg', 'refresher_shard_lg']
  
  for (const item of arr) {
    const url = `https://www.dota2.com.cn/items/images/${item}.png`
    await downloadImage(url, 'items', item)
  }
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