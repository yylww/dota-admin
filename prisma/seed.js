const { PrismaClient } = require('@prisma/client')
const { default: axios } = require('axios')
const prisma = new PrismaClient()

async function main() {

  // const games = await prisma.game.findMany()
  // const itemData = await prisma.item.findMany()
  // const handler = async (id, index) => {
  //   try {
  //     const { data } = await axios.get(`https://api.opendota.com/api/matches/${id}`)
  //     if (!data) return false
  //     const players = data.players
  //     players.map(async (player, j) => {
  //       const { item_neutral, purchase_log, aghanims_scepter, aghanims_shard } = player
  //       const items = []
  //       for (let k = 0; k < 6; k++) {
  //         if (player[`item_${k}`]) {
  //           const detail = itemData.find(item => item.id === player[`item_${k}`])
  //           const purchase = purchase_log ? purchase_log.findLast(item => item.key === detail.name) : null
  //           const purchaseTime = purchase ? purchase.time : undefined
  //           items.push({ ...detail, purchaseTime })
  //         }
  //       }
  //       const neutral = itemData.find(item => item.id === item_neutral)
  //       const updateData = {
  //         equipments: items,
  //         neutral,
  //         scepter: aghanims_scepter,
  //         shard: aghanims_shard,
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