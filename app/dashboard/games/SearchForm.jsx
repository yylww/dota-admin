import { Form, Col, Row, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"
import { CascaderTournament } from "@/app/components/CascaderTournament"
import { SelectTeam } from "@/app/components/SelectTeam"

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
          stageId: values.tournament ? values.tournament[1] : undefined,
          teamId: values.teamId,
        })
      }}
    >
      <Row gutter={24}>
      <Col span={8}>
          <Form.Item name="tournament">
            <CascaderTournament level="stage" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="teamId">
            <SelectTeam />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ margin: '0 12px' }} onClick={handleReset}>重置</Button>
          <Link href="/dashboard/games/create">
            <Button type="primary">新建</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  )
}