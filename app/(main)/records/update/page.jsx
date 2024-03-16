'use client'

import { getTournament } from "@/app/api/tournament"
import { updateAchievement, createAchievement } from "@/app/api/achievement"
import { getAllTeam } from "@/app/api/team"
import useSWR, { useSWRConfig } from "swr"
import { useRouter, useSearchParams } from "next/navigation"
import { CollectionForm } from "../CollectionForm"

export default function Page({ params }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('tournament')
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useSWR(['tournament', id], () => getTournament(id))
  const teamData = useSWR(['team'], getAllTeam)
  const router = useRouter()
  if (isLoading || teamData.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ranks: data.result.map(item => ({ ...item, teams: item.teams.map(team => team.id)})),
        tournamentId: [data.result[0].tournamentId],
      }}
      onSubmit={async values => {
        console.log(values)
        for (const item of values.ranks) {
          const players = []
          item.teams.forEach(id => {
            const filterTeam = teamData.data.filter(team => team.id === id)[0]
            filterTeam.players.forEach(player => {
              players.push(player.id)
            })
          })
          const params = {
            ...item,
            tournamentId: values.tournamentId[0],
            players,
          }
          if (item.id) {
            // 更新已有achievement
            await mutate(['achievement'], () => updateAchievement(item.id, params))
          } else {
            // 新增achievement
            await mutate(['achievement'], () => createAchievement(params))
          }
        }
        mutate(key => Array.isArray(key) && key[0] === 'achievement')
        router.push('/achievements')
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}

{/* <Form.Item label="排名">
      <Form.List name="result">
        {(fields, { add, remove }, { errors }) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 16,
            }}
          >
            {fields.map((field, index) => (
              <Space key={field.key}>
                <Form.Item noStyle name={[field.name, 'rank']}>
                  <Input placeholder="rank" />
                </Form.Item>
                <Form.Item noStyle name={[field.name, 'prize']}>
                  <InputNumber
                    placeholder="prize"
                    style={{ width: 100 }}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                </Form.Item>
                <Form.Item noStyle name={[field.name, 'point']}>
                  <Input placeholder="point" />
                </Form.Item>
                <Form.Item noStyle name={[field.name, 'teams']}>
                  {
                    data.result && data.result[index]
                    ? <SelectTeam mode="multiple" value={data.result[index].teams} />
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
          </div>
        )}
      </Form.List>
    </Form.Item> */}