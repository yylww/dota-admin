'use client'

import { Form, Input, Space, Card, TextArea, Button, DatePicker, Select, InputNumber } from "antd"
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { updateTournament, getTournament } from "@/app/api/tournament"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/navigation"
import { SelectTeams } from "@/app/components/SelectTeams"
import dayjs from "dayjs"

export default function Page({ params }) {
  const id = params.id
  const { data, isLoading } = useSWR(['getTournament', id], () => getTournament(id))
  const router = useRouter()
  const [form] = Form.useForm()
  const {TextArea} = Input
  const handleChange = (values) => {
    console.log(values);
  }
  const handleFinish = async (values) => {
    console.log(values);
    await mutate(['updateTournament'], () => updateTournament(id, values))
    router.push('/tournaments')
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
      name="create-tournament"
      autoComplete="off"
      initialValues={{
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
      }}
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
      <Form.Item label="排名">
        <Form.List name="result">
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
                  <Form.Item noStyle name={[field.name, 'rank']}>
                    <Input placeholder="rank" />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'prize']}>
                    <InputNumber
                      placeholder="prize"
                      style={{ width: 100 }}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'point']}>
                    <Input placeholder="point" />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'teams']}>
                    {
                      data.result[index]
                      ? <SelectTeams mode="multiple" values={data.result[index].teams} />
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