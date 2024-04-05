'use client'

import { useEffect, useState } from "react";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import { updatePlayer, createPlayer, getPlayer, deletePlayer, getPlayerList } from "@/app/lib/player"
import { Pagination } from "antd";

export default function Page() {
  
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  const handleTableData = async () => {
    const take = pageSize
    const skip = (current - 1) * pageSize
    const data = await getPlayerList(query, take, skip)
    setTableData(data)
  }
  const handleDetail = async (id) => {
    setId(id)
    setDetail(null)
    if (id) {
      const data = await getPlayer(id)
      setDetail(data)
    }
  }

  useEffect(() => {
    handleTableData()
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
        onCreate={async () => {
          await handleDetail(null)
          setOpen(true)
        }}
      />
      <TableList
        data={tableData.list}
        onEdit={async (id) => {
          await handleDetail(id)
          setOpen(true)
        }}
        onDelete={async id => {
          await deletePlayer(id)
          handleTableData()
        }}  
      />
      <div className="mt-4 text-right">
        <Pagination
          current={current} 
          pageSize={pageSize} 
          total={tableData.total}
          onChange={(current, pageSize) => {
            setCurrent(current)
            setPageSize(pageSize)
          }}
        />
      </div>
      <CollectionFormModal
        open={open}
        initialValues={detail}
        onSubmit={async values => {
          if (id) {
            await updatePlayer(id, {
              ...values,
              teamId: values.teamId || null,
            })
          } else {
            await createPlayer({
              ...values,
              teamId: values.teamId || null,
            })
          }
          await handleTableData()
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}