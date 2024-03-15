'use client'

import { updateMatch, getMatch } from "@/app/api/match"
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { CollectionForm } from "../../CollectionForm"

export default function Page({ params }) {
  const id = params.id
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useSWR(['match', id], () => getMatch(id))
  const router = useRouter()
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <CollectionForm
      initialValues={{
        ...data,
        stageId: [data.tournament.id, data.stage.id],
        startTime: dayjs(data.startTime),
        teams: [data.teams[0].id, data.teams[1].id],
      }}
      onSubmit={async values => {
        console.log(values)
        await mutate(['match'], () => updateMatch(id, {
          ...values,
          tournamentId: values.stageId[0],
          stageId: values.stageId[1],
        }))
        mutate(key => Array.isArray(key) && key[0] === 'match')
        router.push('/matches')
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