import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as bcrypy from 'bcrypt'
const path = require('path')
const fs = require('fs')

const roundsOfHashing = 10;
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

  // const data = require('./data/createGame.json')
  // const bans = data.bans
  // const picks = data.picks
  // const records = data.records
  // // console.log(bans, picks, records)
  // await prisma.game.create({ 
  //   data: {
  //     ...data,
  //     bans: {
  //       create: bans,
  //     },
  //     picks: {
  //       create: picks,
  //     },
  //     records: {
  //       create: records,
  //     },
  //   }
  // }) 

  // const des = path.join(__dirname, '/data')
  // const data = await prisma.stage.findMany({ include: { matches: true }})
  // console.log(data, data.length);
  
  // fs.writeFile(`${des}/player_records.json`, JSON.stringify(data), () => {
  //   console.log('success')
  // })
  
  
  // create team and player
  // const teamId = 8588969
  // const ids = [165110440,424661031,221532774,285282252,326327879];
  // const { data } = await axios.get(`https://api.opendota.com/api/teams/${teamId}`)
  // await prisma.team.create({
  //   data: {
  //     id: data.team_id,
  //     name: data.name,
  //     logo: `/teams/${data.name.split(' ').join('_')}.png`,
  //     regionId: 4,
  //     tag: data.tag,
  //   }
  // })
  // for (let i = 0; i < ids.length; i++) {
  //   const { data } = await axios.get(`https://api.opendota.com/api/players/${ids[i]}`)
  //   // const names = ['nesfeer', 'Ainkrad', 'AfterLife', 'grip', 'pantomem']
  //   await prisma.player.create({
  //     data: {
  //       id: ids[i],
  //       nickname: data.profile.name,
  //       // nickname: names[i],
  //       status: 0,
  //       teamId,
  //       position: `${i+1}`,
  //     }
  //   })
  // }

  // const passwordKvo = await bcrypy.hash('123456', roundsOfHashing);
  // await prisma.user.upsert({
  //   where: { email: 'kvo@qq.com' },
  //   update: {
  //     password: passwordKvo,
  //   },
  //   create: {
  //     email: 'kvo@qq.com',
  //     name: 'Kvo',
  //     password: passwordKvo,
  //   },
  // });

  // const { data } = await axios.get('https://www.dota2.com/datafeed/herolist?language=schinese')
  // const heroesData = data.result.data.heroes.map(item => ({
  //   id: item.id,
  //   cname: item.name_loc,
  //   name: item.name_english_loc,
  //   avatar: `/heroes/${item.name.split('hero_')[1]}.png`
  // }))
  // await prisma.hero.createMany({ data: heroesData })

  // const regionsData = [
  //   { id: 1, name: 'North America', cname: '北美' },
  //   { id: 2, name: 'South America', cname: '南美' },
  //   { id: 3, name: 'Europe', cname: '欧洲' },
  //   { id: 4, name: 'CIS', cname: '独联体' },
  //   { id: 5, name: 'China', cname: '中国' },
  //   { id: 6, name: 'Southeast Asia', cname:	'东南亚' },
  //   { id: 7, name: 'MENA', cname:	'中东及北非' },
  // ]
  // await prisma.region.createMany({ data: regionsData })
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