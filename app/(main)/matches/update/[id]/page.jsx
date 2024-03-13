'use client'

import { Form, Space, Button, DatePicker, InputNumber, Radio } from "antd"
import { updateMatch, getMatch } from "@/app/api/match"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/navigation"
import { SelectTeams } from "@/app/components/SelectTeams"
import { SelectStage } from "@/app/components/SelectStage"
import dayjs from "dayjs"

export default function Page({ params }) {
  const id = params.id
  const { data, isLoading } = useSWR(['getMatch', id], () => getMatch(id))
  const router = useRouter()
  const [form] = Form.useForm()
  const handleFinish = async (values) => {
    console.log(values);
    const params = {
      ...values,
      stageId: values.stageId[1],
    }
    await mutate(['updateMatch'], () => updateMatch(id, params))
    mutate(['getMatch', id])
    router.push('/matches')
  }
  const handleCancel = () => {
    router.back()
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="update-stage"
      autoComplete="off"
      initialValues={{
        ...data,
        stageId: [data.stage.tournament.id, data.stage.id],
        startTime: dayjs(data.startTime),
        teams: [data.teams[0].id, data.teams[1].id],
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="所属比赛"
        name="stageId"
        rules={[{ required: true, message: '必填' }]}
      >
        <SelectStage />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="startTime"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item
        label="BO"
        name="bo"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={0}>线下赛</Radio>
          <Radio value={1}>线上赛</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="是否加赛"
        name="extra"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={false}>否</Radio>
          <Radio value={true}>是</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
        label="比赛队伍" 
        name="teams"
        rules={[{ required: true, message: '必选' }]}
      >
        <SelectTeams mode="multiple" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={handleCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}