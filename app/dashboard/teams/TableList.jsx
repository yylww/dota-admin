import { Table, Space } from "antd"
import Image from "next/image"

export const TableList = ({data, onEdit, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '队名', dataIndex: 'name' },
    { 
      title: 'Logo',
      key: 'logo',
      render: (_, record) => (
        <div className="flex w-[25px]">
          <Image
            src={`${record.logo}`}
            width={25}
            height={25}
            style={{
              width: '100%',
              height: 'auto',
            }}
            alt={`${record.name}`} 
          />
        </div>
      )
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