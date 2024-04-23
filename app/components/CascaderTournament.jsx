import { Cascader } from "antd"
import useSWR from "swr"
import { getTournaments } from "../lib/tournament"

export const CascaderTournament = ({ level, value, onChange }) => {
  const { data, isLoading, error } = useSWR('tournaments', getTournaments)
  if (error) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.map((tournament) => {
    switch (level) {
      case 'tournament':
        return {
          value: tournament.id,
          label: tournament.title,
        }
      case 'stage':
        return {
          value: tournament.id,
          label: tournament.title,
          children: tournament.stages.map(stage => ({
            value: stage.id,
            label: stage.title,
          }))
        }
      case 'match':
        return {
          value: tournament.id,
          label: tournament.title,
          children: tournament.stages.map(stage => ({
            value: stage.id,
            label: stage.title,
            children: stage.matches.map(match => ({
              value: match.id,
              label: `${match.homeTeam.tag} vs ${match.awayTeam.tag}`,
            }))
          }))
        }
      default:
        return {
          value: tournament.id,
          label: tournament.title,
          children: tournament.stages.map(stage => ({
            value: stage.id,
            label: stage.title,
            children: stage.matches.map(match => ({
              value: match.id,
              label: `${match.teams[0].tag} vs ${match.teams[1].tag}`,
            }))
          }))
        }
    }
  })
  const filter = (inputValue, path) => path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  return (
    <Cascader
      value={value}
      style={{
        minWidth: '200px',
      }}
      placeholder="选择所属赛事"
      onChange={onChange}
      options={options}
      showSearch={{ filter }}
    />
  )
}