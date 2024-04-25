import { Form, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
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
          teamId: values.teamId, 
          nickname: values.nickname,
        })
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="teamId">
          <SelectTeam />
        </Form.Item>
        <Form.Item name="nickname">
          <Input placeholder="选手昵称" />
        </Form.Item>
        <div className="flex gap-2 mb-8">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          {/* <Link href="/dashboard/records/create">
            <Button type="primary">新建</Button>
          </Link> */}
        </div>
      </div>
    </Form>
  )
}