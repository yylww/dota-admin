'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR, { useSWRConfig } from "swr";
import { updatePlayer, createPlayer, getPlayer, deletePlayer, getPlayerList } from "@/app/api/player"
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
  const detailData = useSWR(id ? ['player', id] : null, () => getPlayer(id))
  const listData = useSWR(['player', query, current, pageSize], () => getPlayerList({query, current, pageSize}))
  
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
              await mutate(['player', id], () => deletePlayer(id))
              mutate(key => Array.isArray(key) && key[0] === 'player')
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
            if (id) {
              await mutate(['player', id], () => updatePlayer(id, {
                ...values,
                teamId: values.teamId || null,
              }))
            } else {
              await mutate(['player'], () => createPlayer({
                ...values,
                teamId: values.teamId || null,
              }))
            }
            mutate(key => Array.isArray(key) && key[0] === 'player')
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