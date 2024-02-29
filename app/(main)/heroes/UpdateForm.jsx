import { Form, Modal, Input, Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import useSWR from "swr"
import { updateHero, getHero } from "@/app/api/hero"
import { useEffect, useState } from "react"
import { mutate } from "swr"

export const UpdateForm = ({ open, heroId, onCancel }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const {data} = useSWR(heroId ? ['/heroes', heroId] : null, () => getHero(heroId))
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = {
          cname: values.cname,
          name: values.name,
          avatar: values.avatar.file.response.data.url,
        }
        setConfirmLoading(true)
        await mutate(['/heroes', heroId], () => updateHero(heroId, params))
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
        const { cname, name, avatar } = data
        form.setFieldsValue({ cname, name, avatar })
        setFileList([{ 
          uid: '-1', 
          name, 
          url: `${staticURL}${avatar}`, 
          status: 'done' 
        }])
      } 
    }
    handler(data)  
  }, [data])
  
  return (
    <Modal
      title='编辑英雄'
      okText='确定'
      cancelText='取消'
      open={open}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="updateHeroForm"
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
            fileList={fileList}
            headers={{
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            onChange={({ file, fileList }) => {
              let newFileList = [...fileList]
              newFileList = newFileList.slice(-1)
              newFileList.map(file => {
                if (file.response) {
                  file.url = file.response.data.url
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
    </Modal>
  )
}