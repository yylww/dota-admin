import { Table, Space } from "antd"
import dayjs from "dayjs"
import Link from "next/link"

export const TableList = ({data, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { 
      title: '天辉',
      key: 'radiant',
      render: (_, record) => {
        const teamName = record.radiant.tag
        return <span>{teamName} {record.radiantWin ? '胜者' : ''}</span>
      }
    },
    { 
      title: '夜魇',
      key: 'dire',
      render: (_, record) => {
        const teamName = record.dire.tag
        return <span>{teamName} {record.radiantWin ? '' : '胜者'}</span>
      }
    },
    { 
      title: '比分', 
      key: 'score',
      render: (_, record) => {
        const radiantScore = record.records.map(item => item.radiant ? item.kills : 0).reduce((a, b) => a + b)
        const direScore = record.records.map(item => item.radiant ? 0 : item.kills).reduce((a, b) => a + b)
        return <span>{radiantScore}:{direScore}</span>
      }
    },
    { 
      title: '开始时间',
      key: 'startTime',
      render: (_, record) => <span>{dayjs(record.startTime).format('YYYY-MM-DD HH:mm')}</span>
    },
    { 
      title: '比赛时长',
      key: 'duration',
      render: (_, record) => {
        const seconds = record.duration % 60
        const minutes = Math.floor(record.duration / 60)
        return `${minutes}m${seconds}s`
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <Link href={`/dashboard/games/${record.id}`}>详情</Link>
          <Link href={`/dashboard/games/update/${record.id}`}>编辑</Link>
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