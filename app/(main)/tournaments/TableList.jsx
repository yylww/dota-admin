import { Table, Space } from "antd"
import dayjs from "dayjs"
import Link from "next/link"

export const TableList = ({data, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '赛事', dataIndex: 'title' },
    { 
      title: '赛程',
      key: 'startDate',
      render: (_, record) => <span>{dayjs(record.startDate).format('YYYY-MM-DD')}至{dayjs(record.endDate).format('YYYY-MM-DD')}</span>
    },
    { 
      title: '总奖金',
      key: 'bonus',
      render: (_, record) => <span>{record.bonus}美元</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <Link href={`/tournaments/${record.id}`}>详情</Link>
          <Link href={`/tournaments/update/${record.id}`}>编辑</Link>
          {/* <a onClick={() => onDelete(record.id)}>删除</a> */}
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
      pagination={false}
    />
  )
}