'use client'

import { useEffect, useState } from "react"
import { TableList } from "./TableList"
import { SearchForm } from "./SearchForm"
import { Pagination } from "antd"
import { getGameList, deleteGame } from "@/app/lib/game"
import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(Number(searchParams.get('matchId')) || null)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  const handleTableData = async () => {
    const take = pageSize
    const skip = (current - 1) * pageSize
    const data = await getGameList(query, take, skip)
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
          console.log(values);
          setCurrent(1)
          setQuery(values.query[2])
        }}
        onReset={() => {
          setCurrent(1)
          setQuery(null)
        }}
      />
      <TableList
        data={tableData.list}
        onDelete={async (id) => {
          await deleteGame(id)
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