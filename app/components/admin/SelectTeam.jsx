import { Flex, Select } from "antd"
import { StopOutlined } from "@ant-design/icons"
import Image from "next/image"
import useSWR from "swr"
import { getTeams } from "@/app/lib/team"

export const SelectTeam = ({ mode, value, onChange }) => {
  const { data, isLoading, error } = useSWR('teams', getTeams)
  if (error) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.map((item) => {
    return {
      value: item.id,
      label: item.name,
      logo: item.logo,
    }
  })
  const filterOption = (input, option) => (
    option?.label ?? '').toLowerCase().includes(input.toLowerCase()
  )

  return (
    <Select
      showSearch
      mode={mode}
      value={value}
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
            <Image src={option.data.logo} width={0} height={0} sizes="100%" className="w-4 h-auto" alt={option.data.label} /> :
            option.data.logo
          }
          {option.data.label}
        </Flex>
      )}
    />
  )
}