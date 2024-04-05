'use client'

import { useEffect, useState } from "react";
import { CollectionFormModal } from "./ModalForm";
import { TableList } from "./TableList";
import { SearchForm } from "./SearchForm";
import { updateTeam, createTeam, getTeam, deleteTeam, getTeamList } from "@/app/lib/team"
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
    const data = await getTeamList(query, take, skip)
    setTableData(data)
  }
  const handleDetail = async (id) => {
    setId(id)
    setDetail(null)
    if (id) {
      const data = await getTeam(id)
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
          await deleteTeam(id)
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
            await updateTeam(id, values)
          } else {
            await createTeam(values)
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