import { Form, Modal, Input } from "antd"
import { createRegion } from "@/app/api/region"
import { useState } from "react"
import { mutate } from "swr"

export const AddForm = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true)
        await mutate('createRegion', () => createRegion(values))
        setConfirmLoading(false)
        handleCancel()
      })
      // .catch((info) => {
      //   console.log('Validate Failed:', info);
      // })
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
      confirmLoading={confirmLoading}
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