import { Form, Radio, Space, Button, DatePicker, InputNumber } from "antd"
import { SelectTeam } from "@/app/components/admin/SelectTeam"
import { CascaderTournament } from "@/app/components/admin/CascaderTournament"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
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
        label="所属比赛"
        name="stageId"
        rules={[{ required: true, message: '必填' }]}
      >
        <CascaderTournament level="stage" />
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
        label="状态"
        name="status"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={0}>未开始</Radio>
          <Radio value={1}>进行中</Radio>
          <Radio value={2}>已结束</Radio>
        </Radio.Group>
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
        label="淘汰赛分组"
        name="group"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={0}>其他</Radio>
          <Radio value={1}>胜者组</Radio>
          <Radio value={2}>败者组</Radio>
          <Radio value={3}>总决赛</Radio>
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
        label="主队" 
        name="homeTeamId"
        rules={[{ required: true, message: '必选' }]}
      >
        <SelectTeam />
      </Form.Item>
      <Form.Item 
        label="客队" 
        name="awayTeamId"
        rules={[{ required: true, message: '必选' }]}
      >
        <SelectTeam />
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
