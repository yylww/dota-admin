import { Form, Button, Input } from "antd"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="query">
          <Input placeholder="英雄名称" allowClear />
        </Form.Item>
        <div className="flex gap-2 mb-8">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={onCreate}>新建</Button>
        </div>
      </div>
    </Form>
  )
}