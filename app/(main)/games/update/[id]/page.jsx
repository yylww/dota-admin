'use client'

import { Form, Input, Space, Card, TextArea, Button, DatePicker, Select, InputNumber } from "antd"
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { updateStage, getStage } from "@/app/api/stage"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/navigation"
import { SelectTeams } from "@/app/components/SelectTeams"
import { SelectTournament } from "@/app/components/SelectTournament"
import dayjs from "dayjs"

export default function Page({ params }) {
  const id = params.id
  const { data, isLoading } = useSWR(['getStage', id], () => getStage(id))
  const router = useRouter()
  const [form] = Form.useForm()
  const {TextArea} = Input
  const handleChange = (values) => {
    console.log(values);
  }
  const handleFinish = async (values) => {
    console.log(values);
    await mutate(['updateStage'], () => updateStage(id, values))
    router.push('/stages')
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
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="所属赛事"
        name="tournamentId"
        rules={[{ required: true, message: '必填' }]}
      >
        <SelectTournament value={data.tournamentId} />
      </Form.Item>
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="规则"
        name="rule"
        rules={[{ required: true, message: '必填' }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '必填' }]}
      >
        <Select
          options={[
            { value: 0, label: '循环赛' },
            { value: 1, label: '双败淘汰赛' },
            { value: 2, label: '单败淘汰赛' },
          ]}
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
      <Form.Item label="分组">
        <Form.List name="groups">
          {(fields, { add, remove }, { errors }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 16,
              }}
            >
              {fields.map((field, index) => (
                <Space key={field.key}>
                  <Form.Item noStyle name={[field.name, 'teams']}>
                    { 
                      data.groups[index] 
                      ? <SelectTeams mode="multiple" values={data.groups[index].teams} />
                      : <SelectTeams mode="multiple" />
                    }
                  </Form.Item>
                  <CloseOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add field
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
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