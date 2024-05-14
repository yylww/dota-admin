import { Form, Input, Space, Button, DatePicker, InputNumber, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { SelectTeam } from "@/app/components/admin/SelectTeam"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    setFileList(initialValues ? [{ 
      uid: '-1', 
      name: initialValues.title, 
      url: initialValues.logo, 
      status: 'done' 
    }] : [])
  }, [])
  return (
    <Form
      form={form}
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        marginTop: 24,
      }}
      initialValues={initialValues}
      onFinish={async () => {
        const values = await form.validateFields()
        values.logo = values.logo.file ? values.logo.file.response.url : values.logo
        onSubmit(values)
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="英文标题"
        name="title_en"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="赛事介绍"
        name="description"
        rules={[{ required: true, message: '必填' }]}
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        label="英文介绍"
        name="description_en"
        rules={[{ required: true, message: '必填' }]}
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        label="赛事logo"
        name="logo"
        rules={[{ required: true, message: '必填' },]}
      >
        <Upload
          action="/api/upload?des=tournaments"
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
      <Form.Item
        label="总奖金"
        name="bonus"
        rules={[{ required: true, message: '必填' }]}
      >
        <InputNumber
          style={{ width: 200 }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="startDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="参赛队伍"
        name="teams"
        rules={[{ required: true, message: '必填' }]}
      >
        <SelectTeam mode="multiple" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
