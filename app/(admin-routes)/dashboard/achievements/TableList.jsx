import { Table, Space } from "antd"
import Link from "next/link"

export const TableList = ({data, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '赛事', dataIndex: ['tournament', 'title'] },
    { 
      title: '队伍', 
      key: 'teams',
      render: (_, record) => (
        <Space>{ record.teams.length > 0 ? record.teams.map((item, index) => <span key={index}>&quot;{item.name}&quot;</span>) : 'TBD' }</Space>
      )
    },
    { 
      title: '排名', 
      key: 'rank',
      render: (_, record) => <span>第{record.rank}名</span>
    },
    { 
      title: '奖金', 
      key: 'bonus',
      render: (_, record) => <span>{record.bonus}美元</span>
    },
    { title: '积分', dataIndex: 'point' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <Link href={`/dashboard/achievements/update?tournament=${record.tournament.id}`}>编辑</Link>
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
      pagination={{
        size: 'default',
      }}
    />
  )
}