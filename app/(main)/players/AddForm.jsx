import { Form, Modal, Input, InputNumber } from "antd"
import { createPlayer } from "@/app/api/player"
import { useState } from "react"
import { mutate } from "swr"
import { SelectTeams } from "@/app/components/SelectTeams"

export const AddForm = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        // setConfirmLoading(true)
        await mutate('createPlayer', () => createPlayer(values))
        // setConfirmLoading(false)
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
          label="ID"
          name="id"
          rules={[{ required: true, message: '必填' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="游戏ID"
          name="nickname"
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
        <Form.Item
          label="队伍"
          name="teamId"
          rules={[{ required: true, message: '必填' },]}
        >
          <SelectTeams />
        </Form.Item>
        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '必填' },]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}