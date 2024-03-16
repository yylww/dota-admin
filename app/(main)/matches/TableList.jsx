import { Table, Space } from "antd"
import dayjs from "dayjs"
import Link from "next/link"

export const TableList = ({data, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { 
      title: '赛事', 
      key: 'tournament',
      render: (_, record) => <span>{record.tournament.title}{ record.stage.title }</span>
    },
    { 
      title: '比赛队伍',
      key: 'teams',
      render: (_, record) => <span>{ record.teams[0].tag } vs { record.teams[1].tag }</span>
    },
    { 
      title: '开始时间',
      key: 'startTime',
      render: (_, record) => <span>{ dayjs(record.startTime).format('YYYY-MM-DD HH:mm') }</span>
    },
    // { 
    //   title: '比分',
    //   key: 'games',
    //   render: (_, record) => {
    //     let arr = [0, 0]
    //     record.games.map(item => {
    //       if (item.winner === 0) {
    //         if (item.radiant.teamId === record.teams[0].id) {
    //           arr[0] += 1
    //         } else {
    //           arr[1] += 1
    //         }
    //       } else {
    //         if (item.dire.teamId === record.teams[1].id) {
    //           arr[1] += 1
    //         } else {
    //           arr[0] += 1
    //         }
    //       }
    //     }) 
    //     return arr.join(':')
    //   }
    // },
    { 
      title: '类型',
      key: 'type',
      render: (_, record) => <span>{['线下赛', '线上赛'][record.type]}</span>
    },
    { 
      title: '是否加赛',
      key: 'overtime',
      render: (_, record) => <span>{record.overtime ? '是' : '否'}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <Link href={`/matches/${record.id}`}>详情</Link>
          <Link href={`/matches/update/${record.id}`}>编辑</Link>
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
      pagination={false}
    />
  )
}