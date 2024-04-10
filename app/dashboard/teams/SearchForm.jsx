import { Form, Col, Row, Button, Input, Flex } from "antd"
import { useForm } from "antd/es/form/Form"
import { SelectTeam } from "@/app/components/SelectTeam"

export const SearchForm = ({query, onSubmit, onReset, onCreate}) => {
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
          teamName: values.teamName, 
          nickname: values.nickname,
        })
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="teamName">
            <Input placeholder="搜索队伍" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="nickname">
            <Input placeholder="搜索选手" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Flex justify="flex-end" gap="small">
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" onClick={onCreate}>新建</Button>
          </Flex>
        </Col>
      </Row>
    </Form>
  )
}