'use client'

import { useEffect, useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination } from "antd"
import { getTournamentList, deleteTournament } from "@/app/lib/tournament"

export default function Page() {
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  const handleTableData = async () => {
    const take = pageSize
    const skip = (current - 1) * pageSize
    const data = await getTournamentList(query, take, skip)
    setTableData(data)
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
      />
      <TableList
        data={tableData.list}
        onDelete={async id => {
          await deleteTournament(id)
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
    </>
  )
}