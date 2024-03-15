'use client'

import { Form, Input, Space, Radio, Button } from "antd"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/navigation"
import { createGame } from "@/app/api/game"
import { SelectMatch } from "@/app/components/CascaderTournament"
import { useState } from "react"
import axios from "axios"
import { getTeamList } from "@/app/api/team"
import dayjs from "dayjs"

export default function Page() {
  const { data, isLoading } = useSWR('getTeamList', () => getTeamList({ pageSize: 999 }))
  const router = useRouter()
  const [form] = Form.useForm()
  const [url, setUrl] = useState('')
  const handleFinish = async (values) => {
    const res = await axios.get(url)
    if (res.status === 200) {
      const obj = generateData(res.data)
      console.log(obj);
      await mutate(['createGame'], () => createGame({
        ...values, 
        matchId: values.matchId[2],
        ...obj,
      }))
      router.push('/games')
    }
  }
  const handleCancel = () => {
    console.log('cancel');
  }
  
  const generateData = (fetchData) => {
    const startTime = dayjs(fetchData.start_time * 1000)
    const duration = fetchData.duration
    const radiantTeamId = fetchData.radiant_team_id
    const direTeamId = fetchData.dire_team_id
    const radiantScore = fetchData.radiant_score
    const direScore = fetchData.dire_score
    const bans = fetchData.picks_bans.filter(item => item.is_pick === false)
    const radiantBans = bans.filter(item => item.team === 0)
    const direBans = bans.filter(item => item.team === 1)
    const picks = fetchData.picks_bans.filter(item => item.is_pick === true)
    const radiantPicks = picks.filter(item => item.team === 0)
    const direPicks = picks.filter(item => item.team === 1)
    const handleRadiantDireData = (teamId, bansData, picksData, playersData) => {
      return {
        teamId,
        bans: bansData.map(item => item.hero_id),
        data: picksData.map(item => {
          const playerData = playersData.filter(player => player.hero_id === item.hero_id)[0]
          return {
            heroId: item.hero_id,
            playerId: playerData.account_id,
            xpm: playerData.xp_per_min,
            gpm: playerData.gold_per_min,
            kills: playerData.kills,
            deaths: playerData.deaths,
            assists: playerData.assists,
            level: playerData.level,
            heroDamage: playerData.hero_damage,
            towerDamage: playerData.tower_damage,
            lastHits: playerData.last_hits,
            denies: playerData.denies,
          }
        }),
      }
    }
    const radiant = handleRadiantDireData(radiantTeamId, radiantBans, radiantPicks, fetchData.players)
    const dire = handleRadiantDireData(direTeamId, direBans, direPicks, fetchData.players)
    
    return {
      startTime,
      duration,
      radiant,
      dire,
      score: `${radiantScore}:${direScore}`,
      winner: fetchData.radiant_win ? 0 : 1,
    }
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="create-game"
      autoComplete="off"
      initialValues={{
        type: 0,
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="所属赛事"
        name="matchId"
        rules={[{ required: true, message: '必填' }]}
      >
        <SelectMatch />
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
      <Form.Item label="比赛数据">
        <Input onChange={e => setUrl(e.target.value)} placeholder="输入比赛链接" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="button" onClick={handleCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}