import { Form, Input, Space, Button, DatePicker, InputNumber } from "antd"
import { SelectTeam } from "@/app/components/SelectTeam"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        marginTop: 24,
      }}
      initialValues={initialValues}
      onFinish={async () => {
        const values = await form.validateFields()
        onSubmit(values)
      }}
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
        <SelectTeam mode="multiple" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
