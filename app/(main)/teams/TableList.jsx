import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getTeamList, deleteTeam } from "@/app/api/team"
import { mutate } from "swr"

export const TableList = ({query, current, pageSize, onPageChange, onEdit}) => {
  const {data, isLoading} = useSWR(['getTeamList', query, current, pageSize], () => getTeamList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '队名', dataIndex: 'name' },
    { 
      title: 'Logo',
      key: 'logo',
      render: (_, record) => (<img width={25} src={`${process.env.NEXT_PUBLIC_STATIC_URL}${record.logo}`} alt={record.name} />)
    },
    { 
      title: '选手',
      key: 'player',
      render: (_, record) => {
        const arr = record.players.map(item => item.nickname)
        return arr.join(', ')
      }
    },
    { 
      title: '赛区',
      key: 'regionId',
      render: (_, record) => (record.region.cname)
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
    await mutate('deleteTeam', () => deleteTeam(id))
    mutate(['getTeamList', query, current, pageSize])
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