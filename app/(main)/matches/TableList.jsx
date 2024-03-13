import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getMatchList, deleteMatch } from "@/app/api/match"
import { mutate } from "swr"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const TableList = ({query, current, pageSize, onPageChange}) => {
  const router = useRouter()
  const {data, isLoading} = useSWR(['getMatchList', query, current, pageSize], () => getMatchList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { 
      title: '赛事', 
      key: 'tournament',
      render: (_, record) => <span>{record.stage.tournament.title}{ record.stage.title }</span>
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
    { 
      title: '比分',
      key: 'games',
      render: (_, record) => {
        let arr = [0, 0]
        record.games.map(item => {
          if (item.winner === 0) {
            if (item.radiant.teamId === record.teams[0].id) {
              arr[0] += 1
            } else {
              arr[1] += 1
            }
          } else {
            if (item.dire.teamId === record.teams[1].id) {
              arr[1] += 1
            } else {
              arr[0] += 1
            }
          }
        }) 
        return arr.join(':')
      }
    },
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
          <a onClick={() => handleEdit(record.id)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const handleDelete = async (id) => {
    await mutate('deleteMatch', () => deleteMatch(id))
    mutate(['getMatchList', query, current, pageSize])
  }
  const handleEdit = (id) => {
    router.push(`/matches/update/${id}`)
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