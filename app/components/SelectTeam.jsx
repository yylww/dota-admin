import { Flex, Select } from "antd"
import useSWR from "swr"
import { getAllTeam } from "../api/team"
import { StopOutlined } from "@ant-design/icons"

export const SelectTeam = ({ mode, valueType, value, onChange }) => {
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const { data, error, isLoading } = useSWR(['team'], getAllTeam)
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.map((item, index) => {
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
      options={[
        { value: 0, label: '无', logo: <StopOutlined /> },
        ...options,
      ]}
      optionRender={(option) => (
        <Flex align="center" gap="small">
          {
            option.data.value ?
            <img src={option.data.logo} width={15} alt={option.data.label} /> :
            option.data.logo
          }
          {option.data.label}
        </Flex>
      )}
    />
  )
}