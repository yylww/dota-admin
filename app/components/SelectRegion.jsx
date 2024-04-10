import { Select } from "antd"
import useSWR from "swr"

export const SelectRegion = ({ value, onChange }) => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, isLoading, error } = useSWR('/api/regions', fetcher)
  if (error) {
    return <div>Error</div>
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