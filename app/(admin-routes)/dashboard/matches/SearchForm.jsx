import { CascaderTournament } from "@/app/components/admin/CascaderTournament"
import { SelectTeam } from "@/app/components/admin/SelectTeam"
import { Form, Button, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import Link from "next/link"

export const SearchForm = ({query, onSubmit, onReset}) => {
  const [form] = useForm()
  const handleReset = () => {
    form.setFieldValue('tournament', null)
    form.setFieldValue('teamId', null)
    form.setFieldValue('status', null)
    onReset()
  }
  return (
    <Form
      form={form}
      name="searchForm"
      initialValues={query}
      onFinish={(values) => onSubmit(values)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        <Form.Item name="tournament">
          <CascaderTournament level="stage" />
        </Form.Item>
        <Form.Item name="teamId">
          <SelectTeam />
        </Form.Item>
        <Form.Item name="status">
          <Select 
            placeholder="选择比赛状态"
            options={[
              {value: 0, label: '未开始'}, 
              {value: 1, label: '进行中'}, 
              {value: 2, label: '已结束'},
            ]} 
          />
        </Form.Item>
        <div className="flex gap-2 mb-6">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Link href="/dashboard/matches/create"> 
            <Button type="primary">新建</Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}