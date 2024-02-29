'use client'

import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import "./style.scss"
import { useRouter, useSearchParams } from "next/navigation"
import { mutate } from "swr"
import { useState } from "react"
import { login } from "@/app/api/login"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [loading, setLoading] = useState(false)

  return (
    <main className="container">
      <h2 className="title">登录</h2>
      <Form
        name="loginForm"
        onFinish={async values => {
          setLoading(true)
          const res = await mutate('login', () => login(values))
          setLoading(false)
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
          <Button type="primary" size="large" loading={loading} htmlType="submit" block className="test">登录</Button>
        </Form.Item>
      </Form>
    </main>
  )
}