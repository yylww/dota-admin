import { Form, Input, Space, Button, InputNumber, Flex } from "antd"
import { PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { SelectTeam } from "@/app/components/SelectTeam"
import { CascaderTournament } from "@/app/components/CascaderTournament"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 800,
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
      <Form.Item label="排名">
        <Form.List name="ranks">
          {(fields, { add, remove }, { errors }) => (
            <Flex vertical gap="small">
              {fields.map((field, index) => (
                <Space key={field.key}>
                  <Form.Item noStyle name={[field.name, 'rank']}>
                    <Input placeholder="rank" />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'bonus']}>
                    <InputNumber
                      placeholder="bonus"
                      style={{ width: 100 }}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'point']}>
                    <InputNumber placeholder="point" />
                  </Form.Item>
                  <Form.Item noStyle name={[field.name, 'teams']}>
                    {
                      initialValues.ranks && initialValues.ranks[index]
                      ? <SelectTeam mode="multiple" value={initialValues.ranks[index].teams} />
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
