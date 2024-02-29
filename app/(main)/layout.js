'use client'

import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  RobotOutlined,
  GlobalOutlined,
  FlagOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function MainLayout({ children }) {
  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const pathname = usePathname()
  const selectedKey = ['/dashboard', '/heroes', '/regions', '/teams', '/players'].indexOf(pathname)
  const router = useRouter()
  const username = localStorage.getItem('username') || 'Guest'

  const handleSignOut = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    router.push(`/login?callbackUrl=${pathname}${location.search}`)
  }

  return (
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${selectedKey}`]}
          items={[
            {
              key: '0',
              icon: <DashboardOutlined />,
              label: (
                <Link href='/dashboard'>仪表盘</Link>
              ),
            },
            {
              key: '1',
              icon: <RobotOutlined />,
              label: (
                <Link href='/heroes'>英雄管理</Link>
              ),
            },
            {
              key: '2',
              icon: <GlobalOutlined />,
              label: (
                <Link href='/regions'>赛区管理</Link>
              ),
            },
            {
              key: '3',
              icon: <FlagOutlined />,
              label: (
                <Link href='/teams'>战队管理</Link>
              ),
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: (
                <Link href='/players'>选手管理</Link>
              ),
            },
          ]}
        />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute',
            bottom: 0,
            fontSize: '16px',
            width: 64,
            height: 64,
            color: '#fff',
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            height: 48,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button type='link' onClick={() => handleSignOut()}>{username}</Button>
        </Header>
        <Content
          style={{
            margin: 12,
            padding: 16,
            minHeight: 280,
            overflow: 'auto',
            background: colorBgContainer,
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  )
}
