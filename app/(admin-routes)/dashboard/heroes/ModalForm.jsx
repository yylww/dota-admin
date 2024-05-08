import { Form, Modal, Input, Upload, Button, InputNumber, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

const CollectionForm = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    onFormInstanceReady(form)
    setFileList(initialValues ? [{ 
      uid: '-1', 
      name: initialValues.name, 
      url: initialValues.avatar, 
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
        label="ID"
        name="id"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber />
      </Form.Item>
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
          action="/api/upload?des=heroes"
          name="file"
          accept="image/*"
          listType="picture"
          fileList={fileList}
          onChange={({ file, fileList }) => {
            let newFileList = [...fileList]
            newFileList = newFileList.slice(-1)
            newFileList.map(file => {
              if (file.response && file.response.status === 200) {
                file.url = file.response.url
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
        values.avatar = values.avatar.file ? values.avatar.file.response.url : values.avatar
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
