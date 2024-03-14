import { Form, Modal, Input } from "antd"
import { createRegion } from "@/app/api/region"
import { useSWRConfig } from "swr"

export const AddForm = ({ open, onCancel }) => {
  const { mutate } = useSWRConfig()
  const [form] = Form.useForm()
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        await mutate(['region'], () => createRegion(values))
        mutate(key => Array.isArray(key) && key[0] === 'region', undefined, { revalidate: true })
        handleCancel()
      })
  }
  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }
  
  return (
    <Modal
      title='创建'
      okText='确定'
      cancelText='取消'
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="addForm"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          marginTop: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="中文"
          name="cname"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="英文"
          name="name"
          rules={[{ required: true, message: '必填' },]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}