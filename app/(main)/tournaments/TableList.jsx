import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getTournamentList, deleteTournament } from "@/app/api/tournament"
import { mutate } from "swr"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const TableList = ({query, current, pageSize, onPageChange}) => {
  const router = useRouter()
  const {data, isLoading} = useSWR(['getTournamentList', query, current, pageSize], () => getTournamentList({query, current, pageSize}))
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
          <a onClick={() => handleEdit(record.id)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const handleDelete = async (id) => {
    await mutate('deleteTournament', () => deleteTournament(id))
    mutate(['getTournamentList', query, current, pageSize])
  }
  const handleEdit = (id) => {
    router.push(`/tournaments/update/${id}`)
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