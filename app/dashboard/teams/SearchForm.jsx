import { Form, Col, Row, Button, Input, Flex } from "antd"
import { useForm } from "antd/es/form/Form"

export const SearchForm = ({query, onSubmit, onReset, onCreate}) => {
  const [form] = useForm()
  const handleReset = () => {
    form.setFieldValue('query', '')
    onReset()
  }
  return (
    <Form
      form={form}
      name="searchForm"
      initialValues={{ query }}
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="query">
            <Input style={{ maxWidth: 200 }} placeholder="输入要搜索的内容" allowClear />
          </Form.Item>
        </Col>
        <Col span={12}>
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