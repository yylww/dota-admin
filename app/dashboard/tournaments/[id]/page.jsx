'use client'

import { useEffect, useState } from "react"
import { Form, Space, Button, Flex, Table } from "antd"
import { getTournament } from "@/app/lib/tournament"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"
import Image from "next/image"

export default function Page({ params }) {
  const id = params.id
  const router = useRouter()
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await getTournament(+id)
      setData(data)
    })()
  }, [])
  if (!data) {
    return <div>Loading...</div>
  }
  const columns = [
    { 
      title: '排名',
      key: 'rank',
      render: (_, record) => `第${record.rank}名`,
    },
    { 
      title: '队伍',
      key: 'teams',
      render: (_, record) => (
        <div className="items-center">
          {
            record.teams.map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="relative w-[20px] h-[20px]">
                  <Image src={`${item.logo}`} fill sizes="100% 100%" alt={`${item.name}`} />
                </div>
                <span className="ml-2">{ item.name }</span>
              </div>
            ))
          }
        </div>
      )
    },
    { 
      title: '奖金',
      key: 'bonus',
      render: (_, record) => `${record.bonus}美元`
    },
    { title: '积分', dataIndex: 'point' },
  ]
  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      name="tournament"
    >
      <Form.Item label="标题">
        <span>{ data.title }</span>
      </Form.Item>
      <Form.Item label="赛事介绍">
        <div>{ data.description }</div>
      </Form.Item>
      <Form.Item label="赛事奖金">
        <span>{ data.bonus }美元</span>
      </Form.Item>
      <Form.Item label="赛程">
        <span>{ dayjs(data.startDate).format('YYYY-MM-DD') } 至 { dayjs(data.endDate).format('YYYY-MM-DD') }</span>
      </Form.Item>
      <Form.Item label="参赛队伍">
        <div className="flex flex-wrap gap-1">
          {
            data.teams.map((item, index) => (
              <div key={index} className="flex items-center border p-1 w-[160px]">
                <div className="relative w-[20px] h-[20px] mx-2">
                  <Image src={`${item.logo}`} fill sizes="100% 100%" alt={`${item.name}`} />
                </div>
                <span>{ item.name }</span>
              </div>
            ))
          }
        </div>
      </Form.Item>
      <Form.Item label="赛事排名">
        <Table 
          rowKey="rank" 
          dataSource={data.achievements} 
          columns={columns} 
          size="small" 
          pagination={false}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
        <Space>
          <Button type="primary">
            <Link href={`/dashboard/tournaments/update/${params.id}`}>编辑</Link>
          </Button>
          <Button htmlType="button" onClick={() => router.back()}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}