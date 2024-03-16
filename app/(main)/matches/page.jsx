'use client'

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination } from "antd"
import useSWR, { useSWRConfig } from "swr"
import { getMatchList, deleteMatch } from "@/app/api/match"

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)

  const { mutate } = useSWRConfig()
  const {data, isLoading} = useSWR(['match', query, current, pageSize], () => getMatchList({query, current, pageSize}))

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
              await mutate(['match', id], () => deleteMatch(id))
              mutate(key => Array.isArray(key) && key[0] === 'match')
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