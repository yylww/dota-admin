import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"

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
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="query">
            <Input style={{ maxWidth: 200 }} placeholder="输入要搜索的内容" allowClear />
          </Form.Item>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={onCreate}>新建</Button>
        </Col>
      </Row>
    </Form>
  )
}