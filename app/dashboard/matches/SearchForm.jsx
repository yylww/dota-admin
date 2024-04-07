import { CascaderTournament } from "@/app/components/CascaderTournament"
import { SelectTeam } from "@/app/components/SelectTeam"
import { Form, Col, Row, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"

export const SearchForm = ({query, onSubmit, onReset}) => {
  const [form] = useForm()
  const handleReset = () => {
    form.resetFields()
    onReset()
  }
  return (
    <Form
      form={form}
      name="searchForm"
      initialValues={{ query }}
      onFinish={(values) => {
        onSubmit({ 
          stageId: values.stage ? values.stage[1] : undefined, 
          teamId: values.teamId, 
        })
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="stage" label="">
            <CascaderTournament level="stage" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="teamId" label="">
            <SelectTeam />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Button type="primary">
            <Link href="/dashboard/matches/create">新建</Link>
          </Button>
        </Col>
      </Row>
    </Form>
  )
}