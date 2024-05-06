import { Form, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"
import { CascaderTournament } from "@/app/components/admin/CascaderTournament"
import { SelectTeam } from "@/app/components/admin/SelectTeam"

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="tournament">
          <CascaderTournament level="stage" />
        </Form.Item>
        <Form.Item name="teamId">
          <SelectTeam />
        </Form.Item>
        <div className="flex gap-2 mb-6">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Link href="/dashboard/games/create">
            <Button type="primary">新建</Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}