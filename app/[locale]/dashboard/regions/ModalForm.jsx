import { Form, Modal, Input } from "antd"
import { useEffect, useState } from "react"

const CollectionForm = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    onFormInstanceReady(form)
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
        // formInstance?.resetFields()
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
