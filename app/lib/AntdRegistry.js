'use client'

import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs/lib'
// import type Entity from '@ant-design/cssinjs/lib/Cache'
import { useServerInsertedHTML } from 'next/navigation'

export default function StypedComponentsRegistry({ children }) {
  const cache = React.useMemo(() => createCache(), [])
  useServerInsertedHTML(() => (
    <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ))
  return <StyleProvider cache={cache}>{ children }</StyleProvider>
}