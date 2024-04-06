import { Cascader } from "antd"
import { getTournaments } from "@/app/lib/tournament"
import { useEffect, useState } from "react"

export const CascaderTournament = ({ level, value, onChange }) => {
  const [tournaments, setTournaments] = useState(null)
  useEffect(() => {
    async function handler() {
      const data = await getTournaments()
      setTournaments(data)
    }
    handler()
  }, [])
  if (!tournaments) {
    return <div>Loading...</div>
  }
  const options = tournaments.map((tournament) => {
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
      defaultValue={value}
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