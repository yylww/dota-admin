import { Form, Modal, Input, InputNumber } from "antd"
import useSWR from "swr"
import { updatePlayer, getPlayer } from "@/app/api/player"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { SelectTeams } from "@/app/components/SelectTeams"

export const UpdateForm = ({ open, playerId, onCancel }) => {
  const {data, isLoading} = useSWR(playerId ? ['getPlayer', playerId] : null, () => getPlayer(playerId))
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        // setConfirmLoading(true)
        await mutate(['updatePlayer', playerId], () => updatePlayer(playerId, values))
        // setConfirmLoading(false)
        onCancel()
      })
      // .catch((info) => {
      //   console.log('Validate Failed:', info);
      // })
  }

  // useEffect(() => {
  //   function handler(data) {
  //     if (data) {
  //       const { name, gameId, position } = data
  //       form.setFieldsValue({ name, gameId, position })
  //     } 
  //   }
  //   handler(data)  
  // }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }
  
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
        initialValues={data}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: '必填' }]}
        >
          <InputNumber />
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
          label="队伍"
          name="teamId"
          rules={[{ required: true, message: '必填' },]}
        >
          <SelectTeams />
        </Form.Item>
        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '必填' },]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}