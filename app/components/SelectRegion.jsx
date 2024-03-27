import { Select } from "antd"
import useSWR from "swr"
import { getAllRegion } from "../api/region"

export const SelectRegion = ({ value, onChange }) => {
  const { data, error, isLoading } = useSWR(['region'], getAllRegion)
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.map((item) => {
    return {
      value: item.id,
      label: item.cname,
    }
  })

  return (
    <Select
      showSearch
      defaultValue={value}
      style={{
        minWidth: '200px',
      }}
      placeholder="选择赛区"
      onChange={onChange}
      options={options}
    />
  )
}