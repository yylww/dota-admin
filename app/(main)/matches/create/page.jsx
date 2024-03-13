'use client'

import { Form, Space, Button, DatePicker, InputNumber, Radio } from "antd"
import { mutate } from "swr"
import { useRouter } from "next/navigation"
import { SelectTeams } from "@/app/components/SelectTeams"
import { createMatch } from "@/app/api/match"
import { SelectStage } from "@/app/components/SelectStage"

export default function Page() {
  const router = useRouter()
  const [form] = Form.useForm()
  const handleFinish = async (values) => {
    console.log(values);
    const params = {
      ...values,
      stageId: values.stageId[1],
    }
    await mutate(['createMatch'], () => createMatch(params))
    router.push('/matches')
  }
  const handleCancel = () => {
    console.log('cancel');
  }
  
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="create-match"
      autoComplete="off"
      initialValues={{
        bo: 2,
        type: 1,
        extra: false,
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
        <DatePicker showTime />
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