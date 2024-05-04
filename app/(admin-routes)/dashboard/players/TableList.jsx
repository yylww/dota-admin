import { Table, Space } from "antd"

export const TableList = ({data, onEdit, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '游戏ID', dataIndex: 'nickname' },
    { title: '所属队伍', dataIndex: ['team', 'name'] },
    { title: '队伍位置', dataIndex: 'position' },
    { 
      title: '状态', 
      key: 'status',
      render: (_, record) => <span>{['现役', '活跃', '退役'][record.status]}</span>
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