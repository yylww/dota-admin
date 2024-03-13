import { Cascader } from "antd"
import useSWR from "swr"
import { getTournamentList } from "../api/tournament"

export const SelectMatch = ({ value, onChange }) => {
  const { data, error, isLoading } = useSWR(['getTournamentList'], () => getTournamentList({ pageSize: 99 }))
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.list.map((tournament) => {
    return {
      value: tournament.id,
      label: tournament.title,
      children: tournament.stages.map(stage => ({
        value: stage.id,
        label: stage.title,
        children: stage.matches.map(match => ({
          value: match.id,
          label: <span>{match.teams[0].tag} vs {match.teams[1].tag}</span>
        }))
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