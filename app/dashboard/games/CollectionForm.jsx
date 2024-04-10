import { Form, Input, Space, Button, Radio } from "antd"
import { CascaderTournament } from "@/app/components/CascaderTournament"
import dayjs from "dayjs"
import { getGameData } from "@/app/utils/opendata"

export const CollectionForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm()
  const generateData = (fetchData) => {
    const startTime = dayjs(fetchData.start_time * 1000)
    const duration = fetchData.duration
    const radiantTeamId = fetchData.radiant_team_id
    const direTeamId = fetchData.dire_team_id
    const bans = fetchData.picks_bans.filter(item => !item.is_pick).map(item => ({
      order: item.order,
      heroId: item.hero_id,
      radiant: item.team === 0,
    }))
    const picks = fetchData.picks_bans.filter(item => item.is_pick).map(item => ({
      order: item.order,
      heroId: item.hero_id,
      radiant: item.team === 0,
    }))
    const records = fetchData.players.map(item => ({
      playerId: item.account_id,
      heroId: item.hero_id,
      radiant: item.isRadiant,
      win: !!item.win,
      xpm: item.xp_per_min,
      gpm: item.gold_per_min,
      kills: item.kills,
      deaths: item.deaths,
      assists: item.assists,
      level: item.level,
      heroDamage: item.hero_damage,
      towerDamage: item.tower_damage,
      lastHits: item.last_hits,
      denies: item.denies,
      netWorth: item.net_worth,
      healing: item.hero_healing,
    }))
    
    return {
      startTime,
      duration,
      radiantWin: records.filter(item => item.radiant)[0].win,
      radiantTeamId,
      direTeamId,
      bans,
      picks,
      records,
    }
  }
  return (
    <Form
      form={form}
      name="form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        marginTop: 24,
      }}
      initialValues={initialValues}
      onFinish={async () => {
        const values = await form.validateFields()
        const gameIds = values.gameId.split(' ')
        for (const gameId of gameIds) {
          const gameData = await getGameData(gameId)
          const gameParams = generateData(gameData)
          onSubmit({
            ...gameParams,
            ...values,
            id: gameId,
            tournamentId: values.matchId[0],
            stageId: values.matchId[1],
            matchId: values.matchId[2],
          })
        }
      }}
    >
      <Form.Item
        label="所属赛事"
        name="matchId"
        rules={[{ required: true, message: '必填' }]}
      >
        <CascaderTournament level="match" />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '必填' }]}
      >
        <Radio.Group>
          <Radio value={0}>队长模式</Radio>
          <Radio value={1}>Solo赛</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="比赛数据"
        name="gameId"
        rules={[{ required: true, message: '必填' }]}
      >
        <Input placeholder="比赛ID，多个以空格分隔" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
