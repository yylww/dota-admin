'use client'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export const Achievements = ({ data }) => {
  const t = useTranslations('tips')
  const formatter = new Intl.NumberFormat()
  const [expand, setExpand] = useState(false)
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <td className="h-[30px] font-medium border text-center">#</td>
            <td className="h-[30px] font-medium border text-left pl-4">Team</td>
            <td className="h-[30px] font-medium border text-center">$USD</td>
            { data[0] && data[0].point ? <td className="h-[30px] font-medium border text-center">Points</td> : null }
          </tr>
        </thead>
        <tbody>
          {
            data.slice(0, expand ? data.length : 4).map((rowData, i) => (
              <tr key={i} className="bg-gray-100 text-center">
                <td className="w-[45px] border">{ rowData.rank }</td>
                <td className="border">
                  { 
                    rowData.teams.length > 0 ?
                    <div className="flex flex-col gap-1 py-2">
                      {
                        rowData.teams.map((team, j) => (
                          <div key={j} className="flex gap-2 items-center pl-1">
                            <div className="flex justify-center items-center w-10">
                              <Image src={`${team.logo}`} width={0} height={0} sizes="100%" className="w-auto h-5" alt={team.name} />
                            </div>
                            <span className="text-sm">{ team.name }</span>
                          </div>
                        ))
                      }
                    </div> : 
                    <div className="text-left pl-2">TBD</div>
                  }
                </td>
                <td className="h-[30px] border">{ formatter.format(rowData.bonus) }</td>
                { rowData.point ? <td className="h-[30px] border">{ rowData.point }</td> : null }
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-2">
        <button onClick={() => setExpand(!expand)}>
          { 
            expand ? 
            <span className="flex items-center">{ t('shrink') }<ChevronUpIcon className="w-4" /></span> : 
            <span className="flex items-center">{ t('expand') }<ChevronDownIcon className="w-4" /></span> 
          }
        </button>
      </div>
    </div>
  )
}