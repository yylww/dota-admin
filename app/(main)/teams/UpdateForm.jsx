import { Form, Modal, Input, Select, Upload, Button } from "antd"
import useSWR from "swr"
import { updateTeam, getTeam } from "@/app/api/team"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { getRegionList } from "@/app/api/region"
import { UploadOutlined } from "@ant-design/icons"

export const UpdateForm = ({ open, teamId, onCancel }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const regionData = useSWR(['getRegionList'], getRegionList)
  const {data} = useSWR(teamId ? ['/teams', teamId] : null, () => getTeam(teamId))
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        const params = {
          name: values.name,
          logo: values.logo.file.response.data.url,
          regionId: values.regionId,
        }
        setConfirmLoading(true)
        await mutate(['/teams', teamId], () => updateTeam(teamId, params))
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
        const { name, logo, regionId } = data
        form.setFieldsValue({ name, logo, regionId })
        setFileList([{ 
          uid: '-1', 
          name, 
          url: `${staticURL}${logo}`, 
          status: 'done' 
        }])
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
          label="队名"
          name="name"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        {
          regionData.data ?
          <Form.Item
            label="赛区"
            name="regionId"
            rules={[{ required: true, message: '必填' },]}
          >
            <Select
              options={regionData.data.list.map(item => ({ value: item.id, label: <span>{ item.cname }</span> }))}
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