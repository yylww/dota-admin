'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR, { useSWRConfig } from "swr";
import { updateHero, createHero, getHero, deleteHero, getHeroList } from "@/app/api/hero"
import { Pagination } from "antd";

export default function Page() {
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter() 

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [current, setCurrent] = useState(Number(searchParams.get('current')) || 1)
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10)
  
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const { mutate } = useSWRConfig()
  const detailData = useSWR(id ? ['hero', id] : null, () => getHero(id))
  const listData = useSWR(['hero', query, current, pageSize], () => getHeroList({query, current, pageSize}))
  
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
        onCreate={() => {
          setId(null)
          setOpen(true)
        }}
      />
      {
        listData.isLoading ? '' : 
        <>
          <TableList
            data={listData.data.list}
            onEdit={id => {
              setId(id)
              setOpen(true)
            }}
            onDelete={async id => {
              await mutate(['hero', id], () => deleteHero(id))
              mutate(key => Array.isArray(key) && key[0] === 'hero')
            }}  
            onChange={(current, pageSize) => {
              setCurrent(current)
              setPageSize(pageSize)
            }}
          />
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            current={current} 
            pageSize={pageSize} 
            total={listData.data.total}
            onChange={(current, pageSize) => {
              setCurrent(current)
              setPageSize(pageSize)
            }}
          />
        </>
      }
      {
        detailData.isLoading ? '' :
        <CollectionFormModal
          open={open}
          initialValues={detailData.data}
          onSubmit={async values => {
            const params = {
              ...values,
              avatar: values.avatar.file ? values.avatar.file.response.data.url : values.avatar,
            }
            if (id) {
              await mutate(['hero', id], () => updateHero(id, params))
            } else {
              await mutate(['hero'], () => createHero(params))
            }
            mutate(key => Array.isArray(key) && key[0] === 'hero')
            setOpen(false)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      }
    </>
  )
}