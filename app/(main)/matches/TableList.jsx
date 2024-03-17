import React, { useContext, useEffect, useRef, useState } from "react"
import { Table, Space, Form, DatePicker } from "antd"
import dayjs from "dayjs"
import Link from "next/link"

const EditableContext = React.createContext(null)
const EditeableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])
  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: dayjs(record[dataIndex]),
    })
  }
  const save = async (id) => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave(id, values)
    } catch (error) {
      console.log('Save failed: ', error)
    }
  }
  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm" ref={inputRef} onOk={() => save(record.id)} />
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>
        { children }
      </div>
    )
  }
  return <td {...restProps}>{ childNode }</td>
}

export const TableList = ({data, onCellSave, onEdit, onDelete}) => {
  const defaultColumns = [
    { title: 'ID', dataIndex: 'id' },
    { 
      title: '赛事', 
      key: 'tournament',
      render: (_, record) => <span>{record.tournament.title}{ record.stage.title }</span>
    },
    { 
      title: '比赛队伍',
      key: 'teams',
      render: (_, record) => <span>{ record.teams[0].tag } vs { record.teams[1].tag }</span>
    },
    { 
      title: '开始时间',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (_, record) => <span>{ dayjs(record.startTime).format('YYYY-MM-DD HH:mm') }</span>,
      editable: true,
    },
    { title: '比分', dataIndex: 'score' },
    { 
      title: '类型',
      key: 'type',
      render: (_, record) => <span>{['线下赛', '线上赛'][record.type]}</span>
    },
    { 
      title: '是否加赛',
      key: 'overtime',
      render: (_, record) => <span>{record.overtime ? '是' : '否'}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        let flag = false
        if (record.games && record.games.length === record.bo) {
          flag = true
        } else {
          flag = record.score.split(':').some(item => Number(item) > (record.bo / 2))
        }
        return (
          <Space size='middle' style={{ color: '#1677ff' }}>
            { flag ? null : <a onClick={() => onEdit(record)}>添加比赛</a> }
            <Link href={`/matches/update/${record.id}`}>编辑</Link>
            <a onClick={() => onDelete(record.id)}>删除</a>
          </Space>
        )
      }
    }
  ]
  const components = {
    body: {
      row: EditeableRow,
      cell: EditableCell,
    },
  }
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: onCellSave,
      })
    }
  })
  return (
    <Table 
      rowKey="id" 
      components={components}
      dataSource={data} 
      columns={columns} 
      size="small" 
      pagination={false}
    />
  )
}