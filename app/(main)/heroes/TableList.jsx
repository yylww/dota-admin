import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getHeroList, deleteHero } from "@/app/api/hero"
import { mutate } from "swr"

export const TableList = ({query, current, pageSize, onPageChange, onEdit}) => {
  const {data, isLoading} = useSWR(['getHeroList', query, current, pageSize], () => getHeroList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '中文名', dataIndex: 'cname' },
    { title: '英文名', dataIndex: 'name' },
    {
      title: '图片',
      dataIndex: 'avatar',
      render: (text) => <img width={60} src={`${process.env.NEXT_PUBLIC_STATIC_URL}${text}`} alt="" />
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
    await mutate('deleteHero', () => deleteHero(id))
    mutate(['getHeroList', query, current, pageSize])
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