import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getPlayerList, deletePlayer } from "@/app/api/player"
import { mutate } from "swr"

export const TableList = ({query, current, pageSize, onPageChange, onEdit}) => {
  const {data, isLoading} = useSWR(['getPlayerList', query, current, pageSize], () => getPlayerList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '游戏ID', dataIndex: 'gameId' },
    { title: '所属队伍', dataIndex: ['team', 'name'] },
    { title: '队伍位置', dataIndex: 'position' },
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
    await mutate('deletePlayer', () => deletePlayer(id))
    mutate(['getPlayerList', query, current, pageSize])
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