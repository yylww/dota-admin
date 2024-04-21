import { Form, Input, Space, Button, Radio } from "antd"
import { CascaderTournament } from "@/app/components/CascaderTournament"
import { getGameData } from "@/app/lib/opendata"
import { generateData } from "@/app/lib/generateData"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm()
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
        const gameIds = values.gameId.split(' ')
        for (const gameId of gameIds) {
          const gameData = await getGameData(gameId)
          const gameParams = generateData(gameData)
          onSubmit({
            ...gameParams,
            ...values,
            id: gameId,
            tournamentId: values.matchId[0],
            stageId: values.matchId[1],
            matchId: values.matchId[2],
          })
        }
      }}
    >
      <Form.Item
        label="所属赛事"
        name="matchId"
        rules={[{ required: true, message: '必填' }]}
      >
        <CascaderTournament level="match" />
      </Form.Item>
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
        label="比赛数据"
        name="gameId"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input placeholder="比赛ID，多个以空格分隔" />
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
