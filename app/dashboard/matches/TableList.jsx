import React, { useContext, useEffect, useRef, useState } from "react"
import { Table, Space, Form, DatePicker, Select, Spin, Input } from "antd"
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
    let fieldValue = null
    if (dataIndex === 'startTime') {
      fieldValue = dayjs(record[dataIndex])
    } 
    if (dataIndex === 'score') {
      fieldValue = `${record.homeScore}:${record.awayScore}`
    } 
    if (dataIndex === 'status') {
      fieldValue = record[dataIndex]
    } 
    form.setFieldsValue({
      [dataIndex]: fieldValue,
    })
  }
  const save = async (id) => {
    try {
      let values = await form.validateFields()
      if (dataIndex === 'startTime' && dayjs(values.startTime).unix() === dayjs(record.startTime).unix()) {
        return false
      }
      if (dataIndex === 'score') {
        const [homeScore, awayScore] = values.score.split(':').map(score => Number(score))
        if (homeScore === record.homeScore && awayScore === record.awayScore) {
          return false
        } else {
          values = { homeScore, awayScore }
        }
      }
      if (dataIndex === 'status' && values.status === record.status) {
        return false
      }
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
        { dataIndex === 'startTime' ? <DatePicker showTime format="YYYY-MM-DD HH:mm" ref={inputRef} onOk={() => save(record.id)} /> : null }
        { dataIndex === 'status' ? <Select
            onBlur={() => save(record.id)}
            ref={inputRef} 
            options={[
              {value: 0, label: '未开始'}, 
              {value: 1, label: '进行中'}, 
              {value: 2, label: '已结束'},
            ]} 
          /> : null 
        }
        { dataIndex === 'score' ? <Input style={{ width: "50px" }} ref={inputRef} onBlur={() => save(record.id)} /> : null }
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
  onUpdateGame,
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
      sorter: (a, b) => dayjs(a.startTime).unix() - dayjs(b.startTime).unix(),
      editable: true,
    },
    { 
      title: '比分', 
      key: 'score',
      dataIndex: 'score',
      render: (_, record) => <div>{ record.homeScore }:{ record.awayScore }</div>,
      editable: true,
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
            {/* { flag ? null : <a onClick={() => onAddGame(record)}>添加比赛</a> } */}
            <a onClick={() => onUpdateGame(record)}>更新</a>
            <a onClick={() => onSyncGame(record)}>{syncLoading ? <Spin size="small" /> : '同步'}</a>
            {/* { flag ? null : <a onClick={() => onAuto(record.id)}>{record.sync ? '暂停' : '开启'}</a> } */}
            <Link href={`/dashboard/games?matchId=${record.id}`}>详情</Link>
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