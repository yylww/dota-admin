import { CascaderTournament } from "@/app/components/CascaderTournament"
import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"

export const SearchForm = ({query, onSubmit, onReset}) => {
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
        <Col span={8}>
          <Form.Item name="query" label="">
            <Input style={{ maxWidth: 200 }} placeholder="输入要搜索的内容" allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="match" label="">
            <CascaderTournament level="match" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Button type="primary">
            <Link href="/games/create">新建</Link>
          </Button>
        </Col>
      </Row>
    </Form>
  )
}