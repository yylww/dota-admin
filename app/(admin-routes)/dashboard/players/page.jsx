'use client'

import { useState } from "react"
import { CollectionFormModal } from "./ModalForm"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { message } from "antd"
import { getPlayers, getPlayer, deletePlayer, createPlayer, updatePlayer } from "@/app/lib/player"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('players', getPlayers)
  const [query, setQuery] = useState({})
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const filterData = ({ teamId, nickname, id }) => {
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
    if (id) {
      result = result.filter(item => {
        if (item.id.toString().includes(id)) {
          return item
        }
      })
    }
    return result
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
          try {
            setId(id)
            const data = await getPlayer(id)
            setDetail(data)
            setOpen(true)
          } catch (error) {
            message.error(error.message, 10)
          }
        }}
        onDelete={async id => {
          try {
            await deletePlayer(id)
            message.success('操作成功')
            mutate()
          } catch (error) {
            message.error(error.message, 10)
          }
        }}  
      />
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          try {
            if (id) {
              await updatePlayer(id, values)
            } else {
              await createPlayer(values)
            }
            message.success('操作成功')
            mutate()
            setOpen(false)
          } catch (error) {
            message.error(error.message, 10)
          }
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}