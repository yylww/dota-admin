import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getRegionList, deleteRegion } from "@/app/api/region"
import { useSWRConfig } from "swr"

export const TableList = ({query, current, pageSize, onPageChange, onEdit}) => {
  const { mutate } = useSWRConfig()
  const {data, isLoading} = useSWR(['region', query, current, pageSize], () => getRegionList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '中文名', dataIndex: 'cname' },
    { title: '英文名', dataIndex: 'name' },
    { 
      title: '队伍数量',
      key: 'teamNumber',
      render: (_, record) => (<span>{ record.teams.length }</span>)
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <a onClick={() => onEdit(record.id)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const handleDelete = async (id) => {
    await mutate(['region', id], () => deleteRegion(id))
    mutate(key => Array.isArray(key) && key[0] === 'region', undefined, { revalidate: true })
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Table 
        rowKey="id" 
        dataSource={data.list} 
        columns={columns} 
        size="small" 
        pagination={false}
      /> 
      <Pagination
        style={{ marginTop: 16 }}
        current={current} 
        pageSize={pageSize} 
        total={data.total}
        onChange={onPageChange}
      />
    </>
  )
}