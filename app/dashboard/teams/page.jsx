'use client'

import { useState } from "react"
import { CollectionFormModal } from "./ModalForm"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import useSWR from "swr"
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from "@/app/lib/team"
import { message } from "antd"

export default function Page() {
  const { data, isLoading, error, mutate } = useSWR('/api/teams', getTeams)
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
            const data = await getTeam(id)
            setDetail(data)
            setOpen(true)
          } catch (error) {
            message.error(error.message)
          }
        }}
        onDelete={async id => {
          try {
            await deleteTeam(id)
            message.success('操作成功')
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
              await updateTeam(id, values)
            } else {
              await createTeam(values)
            }
            message.success('操作成功')
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