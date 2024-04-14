import React, { useContext, useEffect, useRef, useState } from "react"
import { Table, Space, Form, DatePicker, Select, Spin } from "antd"
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
      [dataIndex]: dataIndex === 'startTime' ? dayjs(record[dataIndex]) : record[dataIndex],
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
        {
          dataIndex === 'startTime' ?
          <DatePicker showTime format="YYYY-MM-DD HH:mm" ref={inputRef} onOk={() => save(record.id)} /> :
          <Select
            onBlur={() => save(record.id)}
            ref={inputRef} 
            options={[
              {value: 0, label: '未开始'}, 
              {value: 1, label: '进行中'}, 
              {value: 2, label: '已结束'},
            ]} 
          />
        }
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>
        { children }
      </div>
    )
  }
  return <td {...restProps}>{ childNode }</td>
}

export const TableList = ({
  data, 
  onCellSave, 
  onAddGame, 
  onSyncGame, 
  onAuto, 
  syncLoading, 
  onDelete,
}) => {
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
      render: (_, record) => <span>{ record.homeTeam.tag } vs { record.awayTeam.tag }</span>
    },
    { 
      title: '开始时间',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (_, record) => <span>{ dayjs(record.startTime).format('YYYY-MM-DD HH:mm') }</span>,
      editable: true,
    },
    { 
      title: '比分', 
      key: 'score',
      render: (_, record) => {
        const arr = [record.homeScore, record.awayScore]
        return <Link href={`/dashboard/games?matchId=${record.id}`}>{arr.join(':')}</Link>
      },
    },
    { 
      title: '状态', 
      dataIndex: 'status',
      render: (_, record) => ['未开始', '进行中', '已结束'][record.status],
      editable: true,
    },
    { 
      title: '类型',
      key: 'type',
      render: (_, record) => <span>{['线下', '线上'][record.type]}</span>
    },
    { 
      title: '是否加赛',
      key: 'extra',
      render: (_, record) => <span>{record.extra ? '是' : '否'}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        let flag = false
        const { homeScore, awayScore, bo } = record
        const scores = [homeScore, awayScore]
        if (homeScore + awayScore >= bo) {
          flag = true
        } else {
          flag = scores.some(item => Number(item) > (bo / 2))
        }
        return (
          <Space size='middle' style={{ color: '#1677ff' }}>
            { flag ? null : <a onClick={() => onAddGame(record)}>添加比赛</a> }
            {/* { flag ? null : <a onClick={() => onSyncGame(record)}>{syncLoading ? <Spin size="small" /> : '同步'}</a> } */}
            { flag ? null : <a onClick={() => onAuto(record.id)}>{record.sync ? '暂停' : '开启'}</a> }
            <Link href={`/dashboard/matches/update/${record.id}`}>编辑</Link>
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
      pagination={{
        size: 'default',
      }}
    />
  )
}