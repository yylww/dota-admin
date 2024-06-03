import clsx from "clsx"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

export const DetailComponent = ({ data }) => {
  const locale = useLocale()
  const t = useTranslations('Match')
  const { duration, radiant, dire, radiantScore, direScore, records, bans, picks } = data
  const radiants = records.filter(item => item.radiant)
  const dires = records.filter(item => !item.radiant)
  const sortRecords = [
    ...radiants.sort((a, b) => Number(a.player.position) - Number(b.player.position)),
    ...dires.sort((a, b) => Number(a.player.position) - Number(b.player.position)),
  ]
  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 md:flex-row mb-6">
        <div className="flex-1">
          <div className="flex justify-center md:justify-start items-center gap-4 h-16">
            <Image src={radiant.logo} width={0} height={0} sizes="100%" className="w-8 h-auto" alt={radiant.name} />
            <span className="text-2xl">{radiant.name}</span>
          </div>
          <div className="flex justify-center md:justify-start gap-1">
            {
              picks.filter(item => item.radiant).map((item, i) => (
                <div key={i} title={locale === 'en' ? item.hero.name : item.hero.cname}>
                  <Image src={item.hero.avatar} width={48} height={27} alt={item.hero.name} />
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="flex flex-1 gap-3 justify-center items-center text-gray-300">
            <span className={clsx("text-6xl", radiants[0].win ? "text-green-500" : "text-red-500" )}>
              { radiantScore }
            </span>
            <span className="text-3xl">vs</span>
            <span className={clsx("text-6xl", dires[0].win ? "text-green-500" : "text-red-500" )}>
              { direScore }
            </span>
          </div>
          <div>{ Math.floor(duration / 60) }m:{ duration % 60 }s</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center md:justify-start md:flex-row-reverse items-center gap-4 h-16">
            <Image src={dire.logo} width={0} height={0} sizes="100%" className="w-8 h-auto" alt={dire.name} />
            <span className="text-2xl">{dire.name}</span>
          </div>
          <div className="flex justify-center md:justify-start md:flex-row-reverse gap-1">
            {
              picks.filter(item => !item.radiant).map((item, i) => (
                <div key={i} title={locale === 'en' ? item.hero.name : item.hero.cname}>
                  <Image src={item.hero.avatar} width={48} height={27} alt={item.hero.name} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-6">
        <div className="flex flex-1 gap-1 grayscale">
          {
            bans.filter(item => item.radiant).map((item, i) => (
              <div key={i} title={locale === 'en' ? item.hero.name : item.hero.cname}>
                <Image src={item.hero.avatar} width={48} height={27} alt={item.hero.name} />
              </div>
            ))
          }
        </div>
        <div className="text-center text-2xl">BAN</div>
        <div className="flex flex-row-reverse flex-1 gap-1 grayscale">
          {
            bans.filter(item => !item.radiant).map((item, i) => (
              <div key={i} title={locale === 'en' ? item.hero.name : item.hero.cname}>
                <Image src={item.hero.avatar} width={48} height={27} alt={item.hero.name} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex justify-between text-center">
        <div className="max-w-20 overflow-hidden md:max-w-min">
          <div className="flex items-center h-10 border-b border-b-gray-200">{ t('player') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex items-center h-20 border-b border-b-gray-200">{ sortRecords[i].player.nickname }</div>)
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('hero') }</div>
          {
            sortRecords.map((item, i) => (
              <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200" title={locale === 'en' ? sortRecords[i].hero.name : sortRecords[i].hero.cname}>
                <Image src={sortRecords[i].hero.avatar} width={0} height={0} sizes="100%" className="w-12 md:w-16 h-auto" alt={sortRecords[i].hero.name} />
              </div>
            ))
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('level') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].level }</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('items') }</div>
          {
            sortRecords.map((item, i) => {
              const { equipments, neutral = {}, scepter = 0, shard = 0 } = sortRecords[i].items
              return (
                <div key={i} className="flex justify-center items-center gap-1 h-20 border-b border-b-gray-200">
                  <div className="grid grid-cols-3 gap-1 w-[120px]">
                    {
                      equipments.map((item, i) => (
                        <div key={i} className="relative" title={locale === 'en' ? item.name : item.cname}>
                          <Image src={item.image} width={0} height={0} sizes="100%" className="w-10 h-auto" alt={item.cname} />
                          { 
                            item.purchaseTime ? 
                            <span className="absolute left-0 bottom-0 w-full text-gray-300 text-xs text-center whitespace-nowrap bg-black bg-opacity-40">
                              { item.purchaseTime < 0 ? '-' : '' }{ Math.floor(Math.abs(item.purchaseTime) / 60) }:{ Math.abs(item.purchaseTime) % 60 }
                            </span> : null 
                          }
                        </div>
                      ))
                    }
                  </div>
                  <div title={locale === 'en' ? neutral.name : neutral.cname}>
                    <Image src={neutral.image} width={0} height={0} sizes="100%" className="w-10 h-auto" alt={neutral.cname} />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Image src={`/items/scepter_${scepter}.png`} width={0} height={0} sizes="100%" className="w-8 h-auto" alt="scepter" />
                    <Image src={`/items/shard_${shard}.png`} width={0} height={0} sizes="100%" className="w-8 h-auto" alt="shard" />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('kills') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200 text-green-500">{ sortRecords[i].kills }</div>)
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('deaths') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200 text-red-500">{ sortRecords[i].deaths }</div>)
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('assists') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].assists }</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('lastHits') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].lastHits }</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('denies') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].denies }</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('net') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ (sortRecords[i].netWorth / 1000).toFixed(1) }k</div>)
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('gpm') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].gpm }</div>)
          }
        </div>
        <div>
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('xpm') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ sortRecords[i].xpm }</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('heroDamage') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ (sortRecords[i].heroDamage / 1000).toFixed(1) }k</div>)
          }
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center items-center h-10 border-b border-b-gray-200">{ t('towerDamage') }</div>
          {
            sortRecords.map((item, i) => <div key={i} className="flex justify-center items-center h-20 border-b border-b-gray-200">{ (sortRecords[i].towerDamage / 1000).toFixed(1) }k</div>)
          }
        </div>
      </div>
      
    </div>
  )
}