import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getGameList, deleteGame } from "@/app/api/game"
import { getTeamList } from "@/app/api/team"
import { mutate } from "swr"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const TableList = ({query, current, pageSize, onPageChange}) => {
  const router = useRouter()
  const {data, isLoading} = useSWR(['getGameList', query, current, pageSize], () => getGameList({query, current, pageSize}))
  const teams = useSWR(['getTeamList', query, current, pageSize], () => getTeamList({pageSize: 999}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { 
      title: '天辉',
      key: 'radiant',
      render: (_, record) => {
        const teamName = teams.data.list.filter(item => item.id === record.radiant.teamId)[0].name
        return <span>{teamName}{record.winner ? '' : ' winner'}</span>
      }
    },
    { 
      title: '夜魇',
      key: 'dire',
      render: (_, record) => {
        const teamName = teams.data.list.filter(item => item.id === record.dire.teamId)[0].name
        return <span>{teamName}{record.winner ? ' winner' : ''}</span>
      }
    },
    { title: '比分', dataIndex: 'score' },
    { 
      title: '开始时间',
      key: 'startTime',
      render: (_, record) => <span>{dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
          <Link href={`/games/${record.id}`}>详情</Link>
          <a onClick={() => handleEdit(record.id)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const handleDelete = async (id) => {
    await mutate('deleteGame', () => deleteGame(id))
    mutate(['getGameList', query, current, pageSize])
  }
  const handleEdit = (id) => {
    router.push(`/games/update/${id}`)
  }
  if (isLoading || teams.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Table 
        rowKey="id" 
        dataSource={data.list} 
        loading={isLoading} 
        columns={columns} 
        size="small" 
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 16 }}
        current={current} 
        pageSize={pageSize} 
        total={data.total}
        onChange={onPageChange}
      />
    </>
  )
}