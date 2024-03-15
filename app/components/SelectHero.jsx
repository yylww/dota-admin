import { Select, Space } from "antd"
import useSWR from "swr"
import { getAllHero } from "../api/hero"

export const SelectHero = ({ mode, values, onChange }) => {
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const { data, error, isLoading } = useSWR(['hero'], getAllHero)
  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const options = data.map((item, index) => {
    return {
      value: item.id,
      label: item.cname,
      avatar: `${staticURL}${item.avatar}`,
    }
  })

  return (
    <Select
      showSearch
      mode={mode}
      defaultValue={values}
      style={{
        minWidth: '200px',
      }}
      placeholder="选择英雄"
      onChange={onChange}
      optionLabelProp="label"
      options={options}
      optionRender={(option) => (
        <Space>
          <img src={option.data.avatar} width={25} alt={option.data.label} />
          {option.data.label}
        </Space>
      )}
    />
  )
}