'use client'

import { Form, Space, Button } from "antd"
import { getStage } from "@/app/api/stage"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Page({ params }) {
  const { data, isLoading } = useSWR(['getStage', params.id], () => getStage(params.id))
  const router = useRouter()
  const handleReturn = () => {
    router.push('/stages')
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
        label="赛事规则"
        name="rule"
      >
        <div>{ data.rule }</div>
      </Form.Item>
      <Form.Item
        label="所属赛事"
        name="tournament"
      >
        <span>{ data.tournament.title }</span>
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
      >
        <span>{ ['循环赛', '双败淘汰赛', '单败淘汰赛'][data.type] }</span>
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
      <Form.Item label="分组">
        {
          data.groups.map((item, index) => (
            <div key={index}>
              <span>{item.teams}</span>
            </div>
          ))
        }
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary">
            <Link href={`/stages/update/${params.id}`}>编辑</Link>
          </Button>
          <Button htmlType="button" onClick={handleReturn}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}