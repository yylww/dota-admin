import { Form, Button, Input } from "antd"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="query">
          <Input placeholder="赛事标题" allowClear />
        </Form.Item>
        <div className="flex gap-2 mb-6">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Link href="/dashboard/tournaments/create">
            <Button type="primary">新建</Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}