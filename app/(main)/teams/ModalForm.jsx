import { Form, Modal, Input, Upload, Button, InputNumber } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { SelectRegion } from "@/app/components/SelectRegion"

const CollectionForm = ({ initialValues, onFormInstanceReady }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    onFormInstanceReady(form)
    setFileList(initialValues ? [{ 
      uid: '-1', 
      name: initialValues.name, 
      url: `${staticURL}${initialValues.logo}`, 
      status: 'done' 
    }] : [])
  }, [])
  return (
    <Form
      form={form}
      name="modalForm"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        marginTop: 24,
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label="队伍ID"
        name="id"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber controls={false} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="队名"
        name="name"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="简称"
        name="tag"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="赛区"
        name="regionId"
        rules={[{ required: true, message: '必填' },]}
      >
        <SelectRegion />
      </Form.Item>
      <Form.Item
        label="Logo"
        name="logo"
        rules={[{ required: true, message: '必填' },]}
      >
        <Upload
          action={`${baseURL}/teams/logo/upload`}
          accept="image/*"
          listType="picture"
          fileList={fileList}
          headers={{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }}
          onChange={(info) => {
            let newFileList = [...info.fileList]
            newFileList = newFileList.slice(-1)
            newFileList.map(file => {
              if (file.response) {
                file.url = `${staticURL}${file.response.data.url}`
              }
              return file
            })
            setFileList(newFileList)
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </Form.Item>
    </Form>
  )
}

export const CollectionFormModal = ({ open, initialValues, onSubmit, onCancel }) => {
  const [formInstance, setFormInstance] = useState()
  return (
    <Modal
      title={ initialValues ? '编辑' : '新建' }
      okText='确定'
      cancelText='取消'
      open={open}
      onOk={async () => {
        const values = await formInstance?.validateFields()
        values.logo = values.logo.file ? values.logo.file.response.data.url : values.logo
        onSubmit(values)
      }}
      onCancel={onCancel}
      destroyOnClose
    >
      <CollectionForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance)
        }}
      />
    </Modal>
  )
}
