'use client'

import { Form, Input, Space, Card, TextArea, Button, DatePicker, InputNumber } from "antd"
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { createTournament } from "@/app/api/tournament"
import { mutate } from "swr"
import { useRouter } from "next/navigation"
import { SelectTeams } from "@/app/components/SelectTeams"

export default function Page() {
  const router = useRouter()
  const [form] = Form.useForm()
  const {TextArea} = Input
  const handleChange = (values) => {
    console.log(values);
  }
  const handleFinish = async (values) => {
    console.log(values);
    await mutate(['createTournament'], () => createTournament(values))
    router.push('/tournaments')
  }
  const handleCancel = () => {
    console.log('cancel');
  }
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="create-tournament"
      autoComplete="off"
      onFinish={handleFinish}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="赛事介绍"
        name="description"
        rules={[{ required: true, message: '必填' }]}
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        label="总奖金"
        name="bonus"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber
          style={{ width: 200 }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="startDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="参赛队伍"
        name="teams"
        rules={[{ required: true, message: '必填' }]}
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