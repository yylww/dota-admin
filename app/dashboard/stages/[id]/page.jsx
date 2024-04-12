'use client'

import useSWR from "swr"
import { Form, Space, Button } from "antd"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"
import { Group } from "./Group"
import { DoubleElimination } from "@/app/components/DoubleElimination"
import { Standings } from "./Standings"
import { SingleElimination } from "@/app/components/SingleElimination"

export default function Page({ params }) {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, isLoading } = useSWR(`/api/stages/${params.id}`, fetcher)
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
      <Form.Item label="比赛类型">
        <div>{ ['循环赛', '双败淘汰赛', '单败淘汰赛', 'GSL赛制'][data.mode] }</div>
      </Form.Item>
      <Form.Item label="阶段赛程">
        <span>{ dayjs(data.startDate).format('YYYY-MM-DD') } 至 { dayjs(data.endDate).format('YYYY-MM-DD') }</span>
      </Form.Item>
      {
        data.mode === 0 ?
        data.groups.map((group, index) => (
          <div key={index}>
            <Form.Item label={`积分榜${index + 1}`}>
              <Standings list={group.list} matches={data.matches} />
            </Form.Item>
            <Form.Item label={`小组${index + 1}`}>
              <Group list={group.list} matches={data.matches.filter(item => !item.extra)} />
            </Form.Item>
          </div>
        )) : null
      }
      {
        data.mode === 1 ?
        <Form.Item label="对阵图">
          <DoubleElimination matchMap={data.groups} matches={data.matches} status="display" />
        </Form.Item> : null
      }
      {
        data.mode === 2 ?
        <Form.Item label="对阵图">
          <SingleElimination matchMap={data.groups} matches={data.matches} status="display" />
        </Form.Item> : null
      }
      {
        data.mode === 3 ?
        data.groups.map((group, index) => (
          <div key={index}>
            <Form.Item label={`小组${index + 1}`}>
              <Standings list={group.list} matches={data.matches} />
            </Form.Item>
          </div>
        )) : null
      }
      
      <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
        <Space>
          <Link href={`/dashboard/stages/update/${params.id}`}>
            <Button type="primary">编辑</Button>
          </Link>
          <Button htmlType="button" onClick={() => router.back()}>返回列表</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}