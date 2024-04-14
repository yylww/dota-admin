import { fetcher } from "@/app/utils/fetcher"
import Image from "next/image"

export default async function Page() {
  const heroes = await fetcher('/api/heroes')  
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
                style={{
                  width: '100%',
                  height: 'auto',
                }} 
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
