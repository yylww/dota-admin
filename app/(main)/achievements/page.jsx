'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";

export default function Page() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)

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
      <TableList
        query={query}
        current={current}
        pageSize={pageSize}
        onPageChange={(current, pageSize) => {
          setCurrent(current)
          setPageSize(pageSize)
        }}
      />
    </>
  )
}