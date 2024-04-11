import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"

export const SearchForm = ({onSubmit, onReset}) => {
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
          <Form.Item name="query" label="">
            <Input placeholder="赛事标题" allowClear />
          </Form.Item>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Link href="/dashboard/tournaments/create">
            <Button type="primary">新建</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  )
}