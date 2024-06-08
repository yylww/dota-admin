import Image from "next/image"

export const BanPick = ({ data }) => {
  const { bans, picks, duration, radiant, dire } = data
  const radiantBans = bans.filter(item => item.radiant)
  const direBans = bans.filter(item => !item.radiant)
  const radiantPicks = picks.filter(item => item.radiant)
  const direPicks = picks.filter(item => !item.radiant)
  return (
    <section className="p-2 md:p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-1 gap-3 justify-start items-center">
          <div className="relative w-8 md:w-10 h-8 md:h-10">
            <Image src={radiant.logo} fill sizes="100%" className="object-contain" alt={radiant.name} />
          </div>
          <div>{radiant.tag}</div>
        </div>
        <div className="text-black/60 flex-1 text-center text-sm">{ Math.floor(duration / 60) }m:{ (duration % 60) > 9 ? (duration % 60) : `0${duration % 60}` }s</div>
        <div className="flex flex-1 gap-3 justify-end items-center">
          <div>{dire.tag}</div>
          <div className="relative w-8 md:w-10 h-8 md:h-10">
            <Image src={dire.logo} fill sizes="100%" className="object-contain" alt={dire.name} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[1px]">
          {
            radiantBans.map((item, i) => (
              <div className="flex flex-col w-[23px] md:w-[48px] text-center" key={i}>
                <div className="relative w-[23px] md:w-[48px] h-[23px] md:h-[27px] rounded-sm overflow-hidden brightness-75" key={i}>
                  <Image src={item.hero.avatar} fill sizes="100%" className="object-cover" alt={item.hero.name} />
                </div>
                <div className="mt-[-2px] text-black/60 text-[10px] md:text-xs">{ item.order + 1 }</div>
              </div>
            ))
          }
        </div>
        <div className="flex gap-[1px]">
          {
            direBans.reverse().map((item, i) => (
              <div className="flex flex-col w-[23px] md:w-[48px] text-center" key={i}>
                <div className="relative w-[23px] md:w-[48px] h-[23px] md:h-[27px] rounded-sm overflow-hidden brightness-75" key={i}>
                  <Image src={item.hero.avatar} fill sizes="100%" className="object-cover" alt={item.hero.name} />
                </div>
                <div className="mt-[-2px] text-black/60 text-[10px] md:text-xs">{ item.order + 1 }</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[1px]">
          {
            radiantPicks.map((item, i) => (
              <div className="flex flex-col w-[23px] md:w-[48px] text-center" key={i}>
                <div className="relative w-[23px] md:w-[48px] h-[23px] md:h-[27px] rounded-sm overflow-hidden" key={i}>
                  <Image src={item.hero.avatar} fill sizes="100%" className="object-cover" alt={item.hero.name} />
                </div>
                <div className="mt-[-2px] text-black/60 text-[10px]">{ item.order + 1 }</div>
              </div>
            ))
          }
        </div>
        <div className="flex gap-[1px]">
          {
            direPicks.reverse().map((item, i) => (
              <div className="flex flex-col w-[23px] md:w-[48px] text-center" key={i}>
                <div className="relative w-[23px] md:w-[48px] h-[23px] md:h-[27px] rounded-sm overflow-hidden" key={i}>
                  <Image src={item.hero.avatar} fill sizes="100%" className="object-cover" alt={item.hero.name} />
                </div>
                <div className="mt-[-2px] text-black/60 text-[10px]">{ item.order + 1 }</div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
    
  )
} 