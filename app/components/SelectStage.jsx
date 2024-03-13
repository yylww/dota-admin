import { Cascader } from "antd"
import useSWR from "swr"
import { getTournamentList } from "../api/tournament"

export const SelectStage = ({ value, onChange }) => {
  const { data, error, isLoading } = useSWR(['getTournamentList'], () => getTournamentList({ pageSize: 99 }))
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.list.map((item, index) => {
    return {
      value: item.id,
      label: item.title,
      children: item.stages.map(stage => ({
        value: stage.id,
        label: stage.title,
      }))
    }
  })

  return (
    <Cascader
      showSearch
      defaultValue={value}
      style={{
        minWidth: '200px',
      }}
      placeholder="选择所属赛事"
      onChange={onChange}
      options={options}
    />
  )
}