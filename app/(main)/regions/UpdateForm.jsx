import { Form, Modal, Input } from "antd"
import useSWR from "swr"
import { updateRegion, getRegion } from "@/app/api/region"
import { useEffect } from "react"
import { useSWRConfig } from "swr"

export const UpdateForm = ({ open, regionId, onCancel }) => {
  console.log(regionId)
  const { mutate } = useSWRConfig()
  const {data, isLoading} = useSWR(regionId ? ['region', regionId] : null, () => getRegion(regionId))
  const [form] = Form.useForm()
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        await mutate(['region', regionId], () => updateRegion(regionId, values))
        mutate(key => Array.isArray(key) && key[0] === 'region', undefined, { revalidate: true })
        onCancel()
      })
  }

  // useEffect(() => {
  //   function handler(data) {
  //     if (data) {
  //       const { cname, name } = data
  //       form.setFieldsValue({ cname, name })
  //     } 
  //   }
  //   handler(data)  
  // }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (data) {
    console.log(data);
  }
  
  return (
    <Modal
      title='编辑'
      okText='确定'
      cancelText='取消'
      open={open}
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
        initialValues={data}
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