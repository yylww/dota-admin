import { Form, Modal, Input } from "antd"
import useSWR from "swr"
import { updatePlayer, getPlayer } from "@/app/api/player"
import { useEffect, useState } from "react"
import { mutate } from "swr"

export const UpdateForm = ({ open, playerId, onCancel }) => {
  const {data} = useSWR(playerId ? ['/heroes', playerId] : null, () => getPlayer(playerId))
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true)
        await mutate(['/player', playerId], () => updatePlayer(playerId, values))
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
        const { name, gameId, position } = data
        form.setFieldsValue({ name, gameId, position })
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
          label="姓名"
          name="name"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="游戏ID"
          name="gameId"
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
      </Form>
    </Modal>
  )
}