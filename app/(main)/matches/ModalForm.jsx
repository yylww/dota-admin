import { Form, Modal, Input, Radio } from "antd"
import { useEffect, useState } from "react"

const CollectionForm = ({ onFormInstanceReady }) => {
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
      initialValues={{
        type: 0,
      }}
    >
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={0}>队长模式</Radio>
          <Radio value={1}>Solo赛</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="比赛ID"
        name="ids"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input placeholder="比赛ID，多个以空格分隔" />
      </Form.Item>
    </Form>
  )
}

export const CollectionFormModal = ({ open, onSubmit, onCancel }) => {
  const [formInstance, setFormInstance] = useState()
  return (
    <Modal
      title='添加比赛'
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
        onFormInstanceReady={(instance) => {
          setFormInstance(instance)
        }}
      />
    </Modal>
  )
}
