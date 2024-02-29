import { Form, Modal, Input } from "antd"
import useSWR from "swr"
import { updateRegion, getRegion } from "@/app/api/region"
import { useEffect, useState } from "react"
import { mutate } from "swr"

export const UpdateForm = ({ open, regionId, onCancel }) => {
  const {data} = useSWR(regionId ? ['/regions', regionId] : null, () => getRegion(regionId))
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true)
        await mutate(['/regions', regionId], () => updateRegion(regionId, values))
        setConfirmLoading(false)
        onCancel()
      })
      // .catch((info) => {
      //   console.log('Validate Failed:', info);
      // })
  }

  useEffect(() => {
    function handler(data) {
      if (data) {
        const { cname, name } = data
        form.setFieldsValue({ cname, name })
      } 
    }
    handler(data)  
  }, [data])
  
  return (
    <Modal
      title='编辑'
      okText='确定'
      cancelText='取消'
      open={open}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="updateForm"
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
      </Form>
    </Modal>
  )
}