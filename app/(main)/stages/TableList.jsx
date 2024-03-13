import useSWR from "swr"
import { Table, Pagination, Space } from "antd"
import { getStageList, deleteStage } from "@/app/api/stage"
import { mutate } from "swr"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const TableList = ({query, current, pageSize, onPageChange}) => {
  const router = useRouter()
  const {data, isLoading} = useSWR(['getStageList', query, current, pageSize], () => getStageList({query, current, pageSize}))
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title' },
    { title: '赛事', dataIndex: ['tournament', 'title'] },
    { 
      title: '赛程',
      key: 'startDate',
      render: (_, record) => <span>{dayjs(record.startDate).format('YYYY-MM-DD')}至{dayjs(record.endDate).format('YYYY-MM-DD')}</span>
    },
    { 
      title: '类型',
      key: 'type',
      render: (_, record) => <span>{['循环赛', '双败淘汰赛', '单败淘汰赛'][record.type]}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' style={{ color: '#1677ff' }}>
          <Link href={`/stages/${record.id}`}>详情</Link>
          <a onClick={() => handleEdit(record.id)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const handleDelete = async (id) => {
    await mutate('deleteStage', () => deleteStage(id))
    mutate(['getStageList', query, current, pageSize])
  }
  const handleEdit = (id) => {
    router.push(`/stages/update/${id}`)
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