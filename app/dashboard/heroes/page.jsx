'use client'

import { useState } from "react"
import { CollectionFormModal } from "./ModalForm"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { message } from "antd"
import { createHero, deleteHero, getHero, getHeroes, updateHero } from "@/app/lib/hero"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('/api/heroes', getHeroes)
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
  
  if (error) {
    return <div>{ error.message }</div>
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
          try {
            setId(id)
            const data = await getHero(id)
            setDetail(data)
            setOpen(true)
          } catch (error) {
            message.error(error.message)
          }
        }}
        onDelete={async id => {
          try {
            await deleteHero(id)
            mutate()
          } catch (error) {
            message.error(error.message)
          }
        }}  
      />
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          try {
            if (id) {
              await updateHero(id, values)
            } else {
              await createHero(values)
            }
            mutate()
            setOpen(false)
          } catch (error) {
            message.error(error.message)
          }
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}