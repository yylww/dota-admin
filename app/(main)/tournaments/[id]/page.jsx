'use client'

import { Form, Space, Button } from "antd"
import { getTournament } from "@/app/api/tournament"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Page({ params }) {
  const { data, isLoading } = useSWR(['getTournament', params.id], () => getTournament(params.id))
  const router = useRouter()
  const handleReturn = () => {
    router.push('/tournaments')
  }
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
        <span>{ data.startDate }</span>
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endDate"
      >
        <span>{ data.endDate }</span>
      </Form.Item>
      <Form.Item label="排名">
        {
          data.result.map((item, index) => (
            <div key={index}>
              <span>{item.rank}</span>
              <span>{item.prize}</span>
              <span>{item.point}</span>
              <span>{item.teams}</span>
            </div>
          ))
        }
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary">
            <Link href={`/tournaments/update/${params.id}`}>编辑</Link>
          </Button>
          <Button htmlType="button" onClick={handleReturn}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}