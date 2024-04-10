import { Table } from "antd"

export const TableList = ({data, onDelete}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '选手', dataIndex: ['player', 'nickname'] },
    { title: '英雄', dataIndex: ['hero', 'cname'] },
    { 
      title: '比赛', 
      key: 'game',
      render: (_, record) => <span>{record.game.radiant.name} vs {record.game.dire.name}</span>
    },
    { 
      title: '天辉/夜魇', 
      key: 'radiant',
      render: (_, record) => <span>{record.radiant ? '天辉' : '夜魇'}</span>
    },
    { 
      title: '胜/败', 
      key: 'win',
      render: (_, record) => <span>{record.win ? '胜' : '败'}</span>
    },
    { title: '等级', dataIndex: 'level' },
    { title: '击杀', dataIndex: 'kills' },
    { title: '死亡', dataIndex: 'deaths' },
    { title: '助攻', dataIndex: 'assists' },
    { title: '正补', dataIndex: 'lastHits' },
    { title: '反补', dataIndex: 'denies' },
    { title: 'NET', dataIndex: 'netWorth' },
    { title: 'GPM', dataIndex: 'gpm' },
    { title: 'XPM', dataIndex: 'xpm' },
    { title: '英雄伤害', dataIndex: 'heroDamage' },
    { title: '塔伤害', dataIndex: 'towerDamage' },
    { title: '英雄治疗', dataIndex: 'healing' },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size='middle' style={{ color: '#1677ff' }}>
    //       <Link href={`/dashboard/records/update?game=${record.game.id}`}>编辑</Link>
    //       <a onClick={() => onDelete(record.id)}>删除</a>
    //     </Space>
    //   )
    // }
  ]
  return (
    <Table 
      rowKey="id" 
      dataSource={data} 
      columns={columns} 
      size="small" 
      pagination={{
        size: 'default',
      }}
    />
  )
}