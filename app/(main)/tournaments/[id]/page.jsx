'use client'

import { Form, Space, Button, Flex } from "antd"
import { getTournament } from "@/app/api/tournament"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"

export default function Page({ params }) {
  const { data, isLoading } = useSWR(['tournament', params.id], () => getTournament(params.id))
  const router = useRouter()
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      name="tournament"
    >
      <Form.Item
        label="标题"
        name="title"
      >
        <span>{ data.title }</span>
      </Form.Item>
      <Form.Item
        label="赛事介绍"
        name="description"
      >
        <div>{ data.description }</div>
      </Form.Item>
      <Form.Item
        label="赛事介绍"
        name="bonus"
      >
        <span>{ data.bonus }美元</span>
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="startDate"
      >
        <span>{ dayjs(data.startDate).format('YYYY-MM-DD') }</span>
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endDate"
      >
        <span>{ dayjs(data.endDate).format('YYYY-MM-DD') }</span>
      </Form.Item>
      <Form.Item label="参赛队伍">
        <Flex wrap="wrap" gap="small">
          {
            data.teams.map((item, index) => (
              <Flex key={index} gap="small" align="center" style={{ border: '1px solid #ddd', padding: 6 }}>
                <img width={20} height={20} src={`${process.env.NEXT_PUBLIC_STATIC_URL}${item.logo}`} alt={`${item.name} logo`} />
                <span>{ item.name }</span>
              </Flex>
            ))
          }
        </Flex>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary">
            <Link href={`/tournaments/update/${params.id}`}>编辑</Link>
          </Button>
          <Button htmlType="button" onClick={() => router.push('/tournaments')}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}