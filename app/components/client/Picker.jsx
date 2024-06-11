'use client'

import { useQueryParams } from "@/app/hooks/useQueryParams"
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"

export default function Picker({ type, data, placeholder }) {
  const [searchParams, handleSearchParams] = useQueryParams()
  const id = searchParams[type] ? Number(searchParams[type]) : undefined
  const itemData = data.find(item => item.value === id)
  const pickerText = itemData ? itemData.label : placeholder
  const [text, setText] = useState(pickerText)
  const [open, setOpen] = useState(false)
  const handleClick = ({value, label}) => {
    handleSearchParams(type, value)
    setText(label)
    setOpen(false)
  }
  return (
    <section className="z-30">
      <div className="flex gap-1 justify-center items-center h-8 border border-black/5 rounded-md px-2" onClick={() => setOpen(true)}>
        <span className="text-black/70 text-sm">{text}</span>
        { open ? <CaretUpOutlined /> : <CaretDownOutlined /> }
      </div>
      <div className={clsx("fixed top-0 left-0 flex flex-col justify-end w-full h-full bg-black/50", open ? "block" : "hidden")} onClickCapture={() => setOpen(false)}>
        <div className="flex flex-col gap-3 max-h-[40%] overflow-y-auto py-4 bg-white text-black/70">
          {
            data.map((item, i) => (
              <div className="flex justify-center text-xl md:text-base cursor-pointer" onClick={() => handleClick(item)} key={i}>
                <div className="flex gap-1 items-center">
                  {
                    type === 'team' ? 
                    <div className="relative w-6 h-4">
                      <Image src={item.logo ?? '/teams/Dota2_logo.png'} fill sizes="100%" className="object-contain" alt={item.label} />
                    </div> : null
                  }
                  <span>{ item.label }</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
    
  )
}