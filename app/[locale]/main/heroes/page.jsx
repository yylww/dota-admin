import { getHeroes } from "@/app/lib/hero"
import Image from "next/image"

export default async function Page() {
  const heroes = await getHeroes() 
  return (
    <div className="grid grid-cols-5 gap-2">
      {
        heroes.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative w-full">
              <Image 
                src={item.avatar} 
                width={0}
                height={0}
                sizes="100%"
                className="w-full h-auto"
                alt={item.name} 
                priority
              />
            </div>
            <div className="flex items-center justify-center h-8 border border-t-0">{item.cname}</div>
          </div>
        ))
      }
    </div>
  )
}
