import { Form, Modal, Input, InputNumber, Select } from "antd"
import { useEffect, useState } from "react"
import { SelectTeam } from "@/app/components/SelectTeam"

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
        label="ID"
        name="id"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber style={{ width: '100%' }} />
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
        label="状态"
        name="status"
        rules={[{ required: true, message: '必填' },]}
      >
        <Select
          options={[
            { value: 0, label: '现役' },
            { value: 1, label: '活跃' },
            { value: 2, label: '退役' },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="队伍"
        name="teamId"
      >
        <SelectTeam />
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
