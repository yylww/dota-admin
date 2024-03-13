import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { useRouter } from "next/navigation"

export const SearchForm = ({query, onSubmit, onReset}) => {
  const router = useRouter()
  const [form] = useForm()
  const handleReset = () => {
    form.setFieldValue('query', '')
    onReset()
  }
  const handleCreate = () => {
    router.push('/matches/create')
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
          <Form.Item name="query" label="">
            <Input style={{ maxWidth: 200 }} placeholder="输入要搜索的内容" allowClear />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleCreate}>新建</Button>
        </Col>
      </Row>
    </Form>
  )
}