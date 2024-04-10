import { Table, Space } from "antd"
import Image from "next/image"

export const TableList = ({ data, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '中文名', dataIndex: 'cname' },
    { title: '英文名', dataIndex: 'name' },
    {
      title: '图片',
      dataIndex: 'avatar',
      render: (_, record) => (
        <div className="relative w-[60px] h-[36px]">
          <Image
            src={`${record.avatar}`}
            fill 
            sizes="60px 36px"
            alt={`${record.name}`} 
          />
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <a onClick={() => onEdit(record.id)}>编辑</a>
          <a onClick={() => onDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  return (
    <Table 
      rowKey="id" 
      dataSource={data} 
      columns={columns} 
      size="small" 
      pagination={{
        size: 'default',
      }}
    />
  )
}