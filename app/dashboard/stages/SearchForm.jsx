import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"
import { CascaderTournament } from "@/app/components/CascaderTournament"

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
      onFinish={(values) => {
        onSubmit({ 
          tournamentId: values.tournament ? values.tournament[0] : undefined,
        })
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="tournament">
            <CascaderTournament level="tournament" />
          </Form.Item>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Link href="/dashboard/stages/create">
            <Button type="primary">新建</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  )
}