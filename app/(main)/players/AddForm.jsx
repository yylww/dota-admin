import { Form, Modal, Input } from "antd"
import { createTeam } from "@/app/api/team"
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
        await mutate('createTeam', () => createTeam(values))
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
          label="姓名"
          name="name"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="游戏ID"
          name="gameId"
          rules={[{ required: true, message: '必填' },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="位置"
          name="position"
          rules={[{ required: true, message: '必填' },]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}