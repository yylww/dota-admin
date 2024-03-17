'use client'

import { Form, Space, Button, Flex } from "antd"
import { getStage } from "@/app/api/stage"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"

export default function Page({ params }) {
  const { data, isLoading } = useSWR(['stage', params.id], () => getStage(params.id))
  const router = useRouter()
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      name="stage"
    >
      <Form.Item label="赛事">
        <span>{ data.tournament.title }{ data.title }</span>
      </Form.Item>
      <Form.Item label="规则">
        <div>{ data.rule }</div>
      </Form.Item>
      <Form.Item label="阶段赛程">
        <span>{ dayjs(data.startDate).format('YYYY-MM-DD') } 至 { dayjs(data.endDate).format('YYYY-MM-DD') }</span>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
        <Space>
          <Button type="primary">
            <Link href={`/stages/update/${params.id}`}>编辑</Link>
          </Button>
          <Button htmlType="button" onClick={() => router.push('/stages')}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}