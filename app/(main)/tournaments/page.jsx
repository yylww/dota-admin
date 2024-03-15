'use client'

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination } from "antd"
import useSWR from "swr"
import { getTournamentList, deleteTournament } from "@/app/api/tournament"

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)

  const {data, isLoading} = useSWR(['tournament', query, current, pageSize], () => getTournamentList({query, current, pageSize}))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    query ? params.set('query', query) : params.delete('query')
    current ? params.set('current', current) : params.delete('current')
    pageSize ? params.set('pageSize', pageSize) : params.delete('pageSize')
    replace(`${pathname}?${params.toString()}`)
  }, [query, current, pageSize])
  
  return (
    <>
      <SearchForm
        query={query}
        onSubmit={values => {
          setCurrent(1)
          setQuery(values.query)
        }}
        onReset={() => {
          setCurrent(1)
          setQuery('')
        }}
      />
      {
        isLoading ? '' :
        <>
          <TableList
            data={data.list}
            onDelete={async id => {
              await mutate(['tournament', id], () => deleteTournament(id))
              mutate(key => Array.isArray(key) && key[0] === 'tournament')
            }}    
          />
          <Pagination
            style={{ marginTop: 16 }}
            current={current} 
            pageSize={pageSize} 
            total={data.total}
            onChange={(current, pageSize) => {
              setCurrent(current)
              setPageSize(pageSize)
            }}
          />
        </>
      }
    </>
  )
}