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
import { usePathname, useRouter } from 'next/navigation'

export default function MainLayout({ children }) {
  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const pathname = usePathname().split('/')[1]
  const selectedKey = ['dashboard', 'heroes', 'regions', 'teams', 'players', 'tournaments', 'stages', 'matches', 'games', 'achievements'].indexOf(pathname)
  const router = useRouter()
  const username = !window ? 'Guest' : window.localStorage.getItem('username')

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
            {
              key: '5',
              icon: <TeamOutlined />,
              label: (
                <Link href='/tournaments'>赛事管理</Link>
              ),
            },
            {
              key: '6',
              icon: <TeamOutlined />,
              label: (
                <Link href='/stages'>阶段赛管理</Link>
              ),
            },
            {
              key: '7',
              icon: <TeamOutlined />,
              label: (
                <Link href='/matches'>系列赛管理</Link>
              ),
            },
            {
              key: '8',
              icon: <TeamOutlined />,
              label: (
                <Link href='/games'>比赛管理</Link>
              ),
            },
            {
              key: '9',
              icon: <TeamOutlined />,
              label: (
                <Link href='/achievements'>赛事排名管理</Link>
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
