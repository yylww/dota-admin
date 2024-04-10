'use client'

import { useState } from "react";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import useSWR from "swr"

export default function Page() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, mutate, isLoading } = useSWR('/api/teams', fetcher)
  const [query, setQuery] = useState({})
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const filterData = ({ teamName, nickname }) => {
    let result = data
    if (teamName) {
      result = result.filter(item => {
        const { name, tag } = item
        return name.toLowerCase().includes(teamName.toLowerCase()) || tag.toLowerCase().includes(teamName.toLowerCase()) 
      })
    }
    if (nickname) {
      result = result.filter(item => item.players.some(player => player.nickname.toLowerCase().includes(nickname.toLowerCase())))
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
          const data = await fetch(`/api/teams/${id}`).then(r => r.json())
          setDetail(data)
          setOpen(true)
        }}
        onDelete={async id => {
          await fetch(`/api/teams/${id}`, { method: 'DELETE' })
          mutate()
        }}  
      />
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          const url = id ? `/api/teams/${id}` : '/api/teams'
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