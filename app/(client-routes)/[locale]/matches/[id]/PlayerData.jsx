import { CircleStackIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

export const PlayerData = ({ data, radiant }) => {
  const locale = useLocale()
  const t = useTranslations('Match')
  const kills = data.reduce((prev, current) => prev + current.kills, 0)
  const money = data.reduce((prev, current) => prev + current.netWorth, 0)
  return (
    <section className="flex-1 mt-2">
      <div className={clsx("flex justify-between items-center border-t-2", radiant ? "border-t-[#aac660]" : "border-t-[#f38365]")}>
        <div className={clsx("flex items-center gap-2 h-8 px-2 pb-[2px] rounded-br-md text-white", radiant ? "bg-[#aac660]" : "bg-[#f38365]")}>
          <span className="text-sm">{ radiant ? t('radiant') : t('dire') }</span>
          <span>{ data[0].win ? t('win') : t('lose') }</span>
        </div>
        <div className="flex justify-end items-center gap-2 pr-2 text-xs">
          <span className="flex items-center">
            <span className="text-black/60">{t('kill')}</span>
            <span className="text-sm font-bold">{kills}</span></span>
          <span className="flex items-center">
            <CircleStackIcon className="w-3 text-yellow-500" />
            <span className="text-sm font-bold">{ money }</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {
          data.map((item, i) => {
            const { hero, level, player, heroDamage, netWorth, kills, deaths, assists, items } = item
            const { equipments, neutral = {}, scepter = 0, shard = 0 } = items
            return (
              <div className="p-2 md:p-4 border-b last:border-0 border-b-black/5" key={i}>
                <div className="flex gap-2 h-[45px] md:h-[54px]">
                  <div className="relative h-full rounded-[4px] overflow-hidden">
                    <Image src={hero.avatar} width={0} height={0} sizes="100%" className="block h-full w-auto" alt={hero.name} />
                    <div className="absolute bottom-0 px-[2px] bg-black/60 text-xs text-white/95">{ level }</div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between text-xs">
                    <div className={clsx("text-sm md:text-base", radiant ? "text-[#aac660]" : "text-[#f38365]")}>{ player.nickname }</div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-black/60">{t('money')} </span><span className="font-bold">{ netWorth }</span>
                      </div>
                      <div className="flex text-center">
                        <span>{kills} / {deaths} / {assists}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-black/60">{t('damage')} </span><span className="font-bold">{ heroDamage }</span>
                      </div>
                      <div>
                        <span className="text-black/60">KDA </span><span className="font-bold">{ deaths > 0 ? ((kills + assists) / deaths).toFixed(1) : (kills + assists) }</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] h-full">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col justify-center items-center">
                        <Image src={`/items/scepter_${scepter}.png`} width={0} height={0} sizes="100%" className="w-[20px] md:w-[23px] h-auto" alt="scepter" />
                        <Image src={`/items/shard_${shard}.png`} width={0} height={0} sizes="100%" className="w-[20px] md:w-[23px] h-auto" alt="shard" />
                      </div>
                      <div className="rounded-sm overflow-hidden" title={locale === 'en' ? neutral.name : neutral.cname}>
                        <Image src={neutral.image} width={0} height={0} sizes="100%" className="w-[20px] md:w-[23px] h-auto" alt={neutral.cname} />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-[2px] w-[90px] md:w-[100px] h-full">
                      {
                        equipments.map((item, i) => (
                          <div key={i} className="relative rounded-sm overflow-hidden" title={locale === 'en' ? item.name : item.cname}>
                            <Image src={item.image} fill sizes="100%" className="w-full h-full" alt={item.cname} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}