'use client'

import { useState } from "react";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/heroes', fetcher)
  const [query, setQuery] = useState(null)
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const filterData = (query) => {
    if (query) {
      return data.filter(item => {
        const { cname, name } = item
        return cname.includes(query) || name.toLowerCase().includes(query.toLowerCase())
      })
    }
    return data
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <SearchForm
        onSubmit={values => {
          setQuery(values.query)
        }}
        onReset={() => {
          setQuery(null)
        }}
        onCreate={() => {
          setId(null)
          setDetail(null)
          setOpen(true)
        }}
      />
      <TableList
        data={filterData(query)}
        onEdit={async (id) => {
          setId(id)
          const data = await fetch(`/api/heroes/${id}`).then(r => r.json())
          setDetail(data)
          setOpen(true)
        }}
        onDelete={async id => {
          await fetch(`/api/heroes/${id}`, { method: 'DELETE' })
          mutate()
        }}  
      />
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          const url = id ? `/api/heroes/${id}` : '/api/heroes'
          await fetch(url, { method: 'POST', body: JSON.stringify(values) })
          mutate()
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}