const { PrismaClient } = require('@prisma/client');
const { default: axios } = require('axios');
const prisma = new PrismaClient()
const fs = require('fs')

const downloadImage = async (url, dest, name) => {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    // console.log(response.data)
    const writer = fs.createWriteStream(`./public/${dest}/${name}.png`);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        resolve(true);
        console.log(`${name} finished.`)
      });
      writer.on('error', (error) => {
        reject(false);
        console.log(`${name} error: ${error.message}`);
      });
    })
  } catch (error) {
    console.log(error.message)
    return false
  }
}

async function main() {
  
  // const { data } = await axios.get('https://www.dota2.com.cn/items/json')
  // const values = Object.values(data.itemdata)
  // console.log(values)
  // for (const item of values) {
  //   const imageName = item.img.split('.png')[0]
  //   const url = `https://www.dota2.com.cn/items/images/${imageName}.png`
  //   const finished = await downloadImage(url, 'items', imageName)
  //   console.log(finished)
  //   if (finished) {
  //     const id = Number(item.id)
  //     const name = item.img.split('_lg')[0]
  //     await prisma.item.upsert({
  //       where: { id },
  //       update: {},
  //       create: {
  //         id,
  //         cname: item.dname,
  //         name,
  //         cost: item.cost,
  //         image: `/items/${name}_lg.png`
  //       }
  //     })
  //   }
  // }

  // const games = await prisma.game.findMany()
  // const itemData = await prisma.item.findMany()
  // const handler = async (id, index) => {
  //   try {
  //     const { data } = await axios.get(`https://api.opendota.com/api/matches/${id}`)
  //     if (!data) return false
  //     const players = data.players
  //     players.map(async (player, j) => {
  //       const { item_neutral, purchase_time, aghanims_scepter, aghanims_shard } = player
  //       const items = []
  //       for (let k = 0; k < 6; k++) {
  //         if (player[`item_${k}`]) {
  //           const detail = itemData.find(item => item.id === player[`item_${k}`])
  //           if (!detail) {
  //             console.log(id, player.account_id, j, k, player[`item_${k}`])
  //           }
  //           const purchaseTime = purchase_time ? purchase_time[detail.name] : undefined
  //           items.push({ ...detail, purchaseTime })
  //         }
  //       }
  //       const neutral = itemData.find(item => item.id === item_neutral)
  //       const updateData = {
  //         items,
  //         neutral,
  //         scepter: !!aghanims_scepter,
  //         shard: !!aghanims_shard,
  //       }
  //       const record = await prisma.record.findUnique({
  //         where: {
  //           gameId: id,
  //           playerId: player.account_id
  //         }
  //       })
  //       await prisma.record.update({
  //         where: {
  //           id: record.id
  //         },
  //         data: {
  //           items: updateData,
  //         },
  //       })
  //     })
  //     console.log(id, 'finished', `${index}/${games.length}`)
  //   } catch (error) {
  //     console.log(id, error.message)
  //   }
  // }
  // for (let i = 0; i < games.length; i++) {
  //   setTimeout(() => {
  //     handler(games[i].id, i)
  //   }, i * 1050);
  // }

  // const { data } = await axios.get('https://www.dota2.com.cn/itemscategory/json')
  // const { basic, upgrade, neutral } = data.result
  // let arr = []
  // basic.map(item => {
  //   arr = [...arr, ...item.items]
  // })
  // upgrade.map(item => {
  //   arr = [...arr, ...item.items]
  // })
  // neutral.map(item => {
  //   arr = [...arr, ...item.items]
  // })
  // arr = [
  //   ...arr,
  //   { item_id: "117", name: "aegis", name_loc: "不朽之守护", cost: "0", img: "aegis_lg.png?3" },
  //   { item_id: "33", name: "cheese", name_loc: "奶酪", cost: "1000", img: "cheese_lg.png?3" },
  //   { item_id: "725", name: "aghanims_shard_roshan", name_loc: "阿哈利姆魔晶 - 消耗品", cost: "1400", img: "aghanims_shard_roshan_lg.png?3" },
  //   { item_id: "260", name: "refresher_shard", name_loc: "刷新球碎片", cost: "1000", img: "refresher_shard_lg.png?3" },
  //   { item_id: "1804", name: "roshans_banner", name_loc: "肉山的战旗", cost: "0", img: "roshans_banner_lg.png?3" },
  // ]
  // arr = arr.map(item => {
  //   const data = {
  //     id: Number(item.item_id),
  //     cname: item.name_loc,
  //     name: item.name,
  //     cost: item.cost,
  //     image: `/items/${item.img.split('?3')[0]}`
  //   }
  //   return data
  // })
  // await prisma.item.createMany({
  //   data: arr
  // })
  // console.log(arr)
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