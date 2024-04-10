import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { SelectTeam } from "@/app/components/SelectTeam"

export const SearchForm = ({onSubmit, onReset, onCreate}) => {
  const [form] = useForm()
  const handleReset = () => {
    form.resetFields()
    onReset()
  }
  return (
    <Form
      form={form}
      name="searchForm"
      onFinish={(values) => {
        onSubmit({  
          teamId: values.teamId, 
          nickname: values.nickname,
        })
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="teamId">
            <SelectTeam />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="nickname">
            <Input placeholder="选手昵称" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={onCreate}>新建</Button>
        </Col>
      </Row>
    </Form>
  )
}