import { Flex, Select } from "antd"
import { getTeams } from "@/app/lib/team"
import { StopOutlined } from "@ant-design/icons"
import Image from "next/image"
import { useState, useEffect } from "react"
import useSWR from "swr"

export const SelectTeam = ({ mode, value, onChange }) => {
  const fetcher = url => fetch(url).then(res => res.json())
  const { data, isLoading } = useSWR('/api/teams', fetcher)
  // const [data, setData] = useState(null)
  // useEffect(() => {
  //   (async () => {
  //     const data = await getTeams()
  //     setData(data)
  //   })()
  // }, [])
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
      defaultValue={value}
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
            <Image src={option.data.logo} width={15} height={15} style={{ width: "15px", height: "auto" }} alt={option.data.label} /> :
            option.data.logo
          }
          {option.data.label}
        </Flex>
      )}
    />
  )
}