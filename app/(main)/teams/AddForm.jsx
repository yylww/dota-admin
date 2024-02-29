import { Form, Modal, Input, Select, Upload, Button } from "antd"
import { createTeam } from "@/app/api/team"
import { getRegionList } from "@/app/api/region"
import { useState } from "react"
import useSWR, { mutate } from "swr"
import { UploadOutlined } from "@ant-design/icons"

export const AddForm = ({ open, onCancel }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const { data } = useSWR(['getRegionList'], getRegionList)

  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [logo, setLogo] = useState('')
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        const params = {
          name: values.name,
          regionId: values.regionId,
          logo,
        }
        setConfirmLoading(true)
        await mutate('createTeam', () => createTeam(params))
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
          label="队名"
          name="name"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        {
          data ?
          <Form.Item
            label="赛区"
            name="regionId"
            rules={[{ required: true, message: '必填' },]}
          >
            <Select
              options={data.list.map(item => ({ value: item.id, label: <span>{ item.cname }</span> }))}
            /> 
          </Form.Item> : null
        }
        <Form.Item
          label="Logo"
          name="logo"
          rules={[{ required: true, message: '必填' },]}
        >
          <Upload
            action={`${baseURL}/teams/logo/upload`}
            accept="image/*"
            listType="picture"
            maxCount={1}
            headers={{
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            onChange={({ file }) => {
              console.log(file)
              if (file.status === 'done') {
                setLogo(file.response.data.url)
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