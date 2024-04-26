import { Form, Button } from "antd"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="tournament">
          <CascaderTournament level="tournament" />
        </Form.Item>
        <div className="flex gap-2 mb-6">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Link href="/dashboard/stages/create">
            <Button type="primary">新建</Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}