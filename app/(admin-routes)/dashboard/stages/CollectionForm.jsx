import { Form, Input, Space, Button, DatePicker, Select, Flex, InputNumber, Radio, Card } from "antd"
import { CloseOutlined } from "@ant-design/icons";
import { SelectTeam } from "@/app/components/SelectTeam"
import { CascaderTournament } from "@/app/components/CascaderTournament"
import { DoubleElimination } from "@/app/components/DoubleElimination";
import { useState } from "react";
import { SingleElimination } from "@/app/components/SingleElimination";

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [mode, setMode] = useState(initialValues ? initialValues.mode : 0)
  const [matchMap, setMatchMap] = useState(initialValues ? initialValues.groups : null)
  const [upper, setUpper] = useState([])
  const [lower, setLower] = useState([])
  const [single, setSingle] = useState([])
  // 填充数据
  const makeArr = (number) => {
    const arr = []
    for (let i = 0; i < number; i++) {
      arr[i] = { teams: [] }
    }
    return arr
  }
  const handleUpperChange = (values) => {
    const arr = values.split(',')
    setUpper(arr.map(item => ({ upper: makeArr(item) })))
  }
  const handleLowerChange = (values) => {
    const arr = values.split(',')
    setLower(arr.map(item => ({ lower: makeArr(item) })))
  }
  const handleSingleChange = (values) => {
    const arr = values.split(',')
    setSingle(arr.map(item => makeArr(item)))
  }
  const handleDouble = () => {
    const result = upper.map((item, index) => {
      return {
        upper: item.upper,
        lower: lower[index].lower
      }
    })
    result.push({ final: [{ teams: [] }] })
    setMatchMap(result)
  }
  const handleSingle = () => {
    setMatchMap(single)
  }
  return (
    <Form
      form={form}
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 800,
        marginTop: 24,
      }}
      initialValues={initialValues}
      onFinish={async () => {
        const values = await form.validateFields()
        onSubmit(values)
      }}
    >
      <Form.Item
        label="所属赛事"
        name="tournamentId"
        rules={[{ required: true, message: '必填' }]}
      >
        <CascaderTournament level="tournament" />
      </Form.Item>
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="规则"
        name="rule"
        rules={[{ required: true, message: '必填' }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="startDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endDate"
        rules={[{ required: true, message: '必填' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="类型"
        name="mode"
        rules={[{ required: true, message: '必填' }]}
      >
        <Select
          options={[
            { value: 0, label: '循环赛' },
            { value: 1, label: '双败淘汰赛' },
            { value: 2, label: '单败淘汰赛' },
            { value: 3, label: 'GSL赛制' },
          ]}
          onChange={value => setMode(value)}
        />
      </Form.Item>
      {
        (mode === 0 || mode === 3) ?
        <>
          <Form.Item
            label="Bo"
            name="bo"
            rules={[{ required: true, message: '必填' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="比赛类型"
            name="type"
            rules={[{ required: true, message: '必填' }]}
          >
            <Radio.Group>
              <Radio value={0}>线下赛</Radio>
              <Radio value={1}>线上赛</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="分组">
            <Form.List name="groups">
              {(fields, { add, remove }) => (
                <Flex vertical gap='small'>
                  {fields.map((field) => (
                    <Card
                      size="small"
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item labelCol={{ span: 4 }} label="Name" name={[field.name, 'name']}>
                        <Input />
                      </Form.Item>

                      {/* Nest Form.List */}
                      <Form.Item labelCol={{ span: 4 }} label="List">
                        <Form.List name={[field.name, 'list']}>
                          {(subFields, subOpt) => (
                            <Flex vertical gap="small">
                              {subFields.map((subField) => (
                                <Flex gap="small" key={subField.key}>
                                  <Form.Item noStyle name={[subField.name, 'teamId']}>
                                    <SelectTeam />
                                  </Form.Item>
                                  <Form.Item noStyle name={[subField.name, 'status']}>
                                    <Select
                                      options={[
                                        { value: 0, label: '晋级' },
                                        { value: 1, label: '淘汰' },
                                        { value: 2, label: '加赛' },
                                        { value: 3, label: '胜者组' },
                                        { value: 4, label: '败者组' },
                                        { value: 5, label: '待定' },
                                      ]}
                                    />
                                  </Form.Item>
                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Flex>
                              ))}
                              <Button type="dashed" onClick={() => subOpt.add({ status: 5 })} block>
                                + Add Sub Item
                              </Button>
                            </Flex>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                  </Button>
                </Flex>
              )}
            </Form.List>
          </Form.Item>
        </>
        : null
      }
      {
        mode === 1 ?
        <>
          {
            initialValues.id ? null : 
            <Form.Item label="对阵图数据">
              <Flex gap="small">
                <Input onChange={e => handleUpperChange(e.target.value)} />
                <Input onChange={e => handleLowerChange(e.target.value)} />
                <Button type="primary" onClick={handleDouble}>生成对阵图</Button>
              </Flex>
            </Form.Item>
          }
          <Form.Item label="对阵图" name="groups">
            <DoubleElimination matchMap={matchMap} matches={initialValues.matches} editable={true} />
          </Form.Item>
        </>
        : null
      }
      {
        mode === 2 ?
        <>
          {
            initialValues.id ? null : 
            <Form.Item label="对阵图数据">
              <Flex gap="small">
                <Input onChange={e => handleSingleChange(e.target.value)} />
                <Button type="primary" onClick={handleSingle}>生成对阵图</Button>
              </Flex>
            </Form.Item>
          }
          <Form.Item label="对阵图" name="groups">
            <SingleElimination matchMap={matchMap} matches={initialValues.matches} editable={true} />
          </Form.Item>
        </>
        : null
      }
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
