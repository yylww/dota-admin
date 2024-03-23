import { Form, Input, Space, Button, DatePicker, Select, Flex, InputNumber, Radio, Card } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { SelectTeam } from "@/app/components/SelectTeam"
import { CascaderTournament } from "@/app/components/CascaderTournament"
import { DoubleElimination, getMatchMapData } from "@/app/components/DoubleElimination";
import { useState } from "react";

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [mode, setMode] = useState(initialValues ? initialValues.mode : 0)
  const [matchMap, setMatchMap] = useState(initialValues ? initialValues.groups : null)
  const handleChange = (values) => {
    const [upperLen, lowerLen] = values.split(',')
    const result = getMatchMapData(Number(upperLen), Number(lowerLen))
    setMatchMap(result)
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
        console.log(values);
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
          ]}
          onChange={value => setMode(value)}
        />
      </Form.Item>
      {
        mode === 0 ?
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
                                      defaultValue={0}
                                      options={[
                                        { value: 0, label: '晋级' },
                                        { value: 1, label: '淘汰' },
                                        { value: 2, label: '加赛' },
                                        { value: 3, label: '胜者组' },
                                        { value: 4, label: '败者组' },
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
                              <Button type="dashed" onClick={() => subOpt.add()} block>
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
          {/* <Form.Item label="分组" rules={[{ required: true, message: '必填' }]}>
            <Form.List name="groups">
              {(fields, { add, remove }, { errors }) => (
                <Flex vertical gap="small">
                  {fields.map((field, index) => (
                    <Space key={field.key}>
                      <Form.Item noStyle name={[field.name, 'teams']}>
                        { 
                          initialValues.groups && initialValues.groups[index] 
                          ? <SelectTeam mode="multiple" value={initialValues.groups[index].teams} />
                          : <SelectTeam mode="multiple" />
                        }
                      </Form.Item>
                      <CloseOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </Flex>
              )}
            </Form.List>
          </Form.Item> */}
        </>
        : null
      }
      {
        mode === 1 ?
        <>
          {
            initialValues.id ? null :
            <Form.Item label="初始数据">
              <Input onBlur={e => handleChange(e.target.value)} />
            </Form.Item>
          }
          <Form.Item label="对阵图" name="groups">
            <DoubleElimination matchMap={matchMap} matches={initialValues.matches} editable={true} width={150} />
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
