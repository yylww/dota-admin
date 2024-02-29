import { Form, Modal, Input, Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { createHero } from "@/app/api/hero"
import { useState } from "react"
import { mutate } from "swr"

export const AddForm = ({ open, onCancel }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, avatar);
        const params = {
          cname: values.cname,
          name: values.name,
          avatar,
        }
        console.log(params);
        setConfirmLoading(true)
        await mutate('createHero', () => createHero(params))
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
      title='创建英雄'
      okText='确定'
      cancelText='取消'
      open={open}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="heroForm"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          marginTop: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="中文名"
          name="cname"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="英文名"
          name="name"
          rules={[{ required: true, message: '必填' },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="英雄头像"
          name="avatar"
          rules={[{ required: true, message: '必填' },]}
        >
          <Upload
            action={`${baseURL}/heroes/avatar/upload`}
            accept="image/*"
            listType="picture"
            maxCount={1}
            headers={{
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            onChange={({ file }) => {
              console.log(file)
              if (file.status === 'done') {
                setAvatar(file.response.data.url)
              }
            }}
          >
            <Button type="primary" icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}