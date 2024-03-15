import { Form, Input, Space, Button, DatePicker, Select, Flex } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { SelectTeam } from "@/app/components/SelectTeam"
import { CascaderTournament } from "@/app/components/CascaderTournament"

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
        label="所属赛事"
        name="tournamentId"
        rules={[{ required: true, message: '必填' }]}
      >
        <CascaderTournament level="tournament" />
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
      <Form.Item label="分组" rules={[{ required: true, message: '必填' }]}>
        <Form.List name="groups">
          {(fields, { add, remove }, { errors }) => (
            <Flex vertical gap="small">
              {fields.map((field, index) => (
                <Space key={field.key}>
                  <Form.Item noStyle name={[field.name, 'teams']}>
                    { 
                      initialValues.groups && initialValues.groups[index] 
                      ? <SelectTeam mode="multiple" value={initialValues.groups[index].teams} />
                      : <SelectTeam mode="multiple" />
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
            </Flex>
          )}
        </Form.List>
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
