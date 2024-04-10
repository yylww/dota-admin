'use client'

import { useState } from "react";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/players', fetcher)
  const [query, setQuery] = useState({})
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const filterData = ({ teamId, nickname }) => {
    let result = data
    if (teamId) {
      result = result.filter(item => item.teamId === teamId)
    }
    if (nickname) {
      result = result.filter(item => {
        if (item.nickname.toLowerCase().includes(nickname.toLowerCase())) {
          return item
        }
      })
    }
    return result
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <SearchForm
        onSubmit={values => {
          setQuery(values)
        }}
        onReset={() => {
          setQuery({})
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
          const data = await fetch(`/api/players/${id}`).then(r => r.json())
          setDetail(data)
          setOpen(true)
        }}
        onDelete={async id => {
          await fetch(`/api/players/${id}`, { method: 'DELETE' })
          mutate()
        }}  
      />
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          const url = id ? `/api/players/${id}` : '/api/players'
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