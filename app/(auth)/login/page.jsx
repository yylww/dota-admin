'use client'

import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import "./style.scss"
import { useRouter, useSearchParams } from "next/navigation"
import { useSWRConfig } from "swr"
import { login } from "@/app/api/login"

export default function Page() {
  const { mutate } = useSWRConfig()
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  return (
    <main className="container">
      <h2 className="title">登录</h2>
      <Form
        name="loginForm"
        onFinish={async values => {
          const res = await mutate('login', () => login(values))
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('username', res.username)
          router.push(callbackUrl)
        }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "please input your Username!"}
          ]}
        >
          <Input size="large" prefix={<UserOutlined className="icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "please input your Password!"}
          ]}
        >
          <Input size="large" prefix={<LockOutlined className="icon" />} type="password" placeholder="密码" />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" block className="test">登录</Button>
        </Form.Item>
      </Form>
    </main>
  )
}