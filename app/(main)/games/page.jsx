'use client'

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination } from "antd"
import useSWR, { useSWRConfig } from "swr"
import { getGameList, deleteGame } from "@/app/api/game"

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [matchId, setMatchId] = useState(searchParams.get('matchId') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)

  const { mutate } = useSWRConfig()
  const {data, isLoading} = useSWR(['game', query, matchId, current, pageSize], () => getGameList({query, matchId, current, pageSize}))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    query ? params.set('query', query) : params.delete('query')
    matchId ? params.set('matchId', matchId) : params.delete('matchId')
    current ? params.set('current', current) : params.delete('current')
    pageSize ? params.set('pageSize', pageSize) : params.delete('pageSize')
    replace(`${pathname}?${params.toString()}`)
  }, [query, matchId, current, pageSize])
  
  return (
    <>
      <SearchForm
        query={query}
        onSubmit={values => {
          setCurrent(1)
          setQuery(values.query)
          setMatchId(values.match[2])
        }}
        onReset={() => {
          setCurrent(1)
          setQuery('')
          setMatchId('')
        }}
      />
      {
        isLoading ? '' :
        <>
          <TableList
            data={data.list}
            onDelete={async (id, records) => {
              await mutate(['game', id], () => deleteGame(id))
              mutate(key => Array.isArray(key) && key[0] === 'record')
              mutate(key => Array.isArray(key) && key[0] === 'game')
            }}    
          />
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
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