import { Select } from "antd"
import { getRegions } from "@/app/lib/region"

export const SelectRegion = ({ value, onChange }) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await getRegions()
      setData(data)
    })()
  }, [])
  if (!data) {
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