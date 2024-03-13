import { Select, Space } from "antd"
import useSWR from "swr"
import { getTeamList } from "../api/team"

export const SelectTeams = ({ mode, value, onChange }) => {
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const { data, error, isLoading } = useSWR(['teams'], () => getTeamList({ pageSize: 99 }))
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.list.map((item, index) => {
    return {
      value: item.id,
      label: item.name,
      logo: `${staticURL}${item.logo}`,
    }
  })
  const filterOption = (input, option) => (
    option?.label ?? '').toLowerCase().includes(input.toLowerCase()
  )

  return (
    <Select
      showSearch
      mode={mode}
      defaultValue={value}
      style={{
        minWidth: '200px',
      }}
      placeholder="选择队伍"
      onChange={onChange}
      filterOption={filterOption}
      optionLabelProp="label"
      options={options}
      optionRender={(option) => (
        <Space>
          <img src={option.data.logo} width={25} alt={option.data.label} />
          {option.data.label}
        </Space>
      )}
    />
  )
}