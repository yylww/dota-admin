import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getRegionList, deleteRegion } from "@/app/api/region"
import { mutate } from "swr"

export const TableList = ({query, current, pageSize, onPageChange, onEdit}) => {
  const {data, isLoading} = useSWR(['getRegionList', query, current, pageSize], () => getRegionList({query, current, pageSize}))
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
    await mutate('deleteRegion', () => deleteRegion(id))
    mutate(['getRegionList', query, current, pageSize])
  }
  return (
    <>
      { 
        data ? 
        <Table 
          rowKey="id" 
          dataSource={data.list} 
          loading={isLoading} 
          columns={columns} 
          size="small" 
          pagination={false}
        /> : null 
      }
      { 
        data ? 
        <Pagination
          style={{ marginTop: 16 }}
          current={current} 
          pageSize={pageSize} 
          total={data.total}
          onChange={onPageChange}
        /> : null 
      }
    </>
  )
}