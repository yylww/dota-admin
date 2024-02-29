'use client'

import { SWRConfig } from 'swr'
import { message } from 'antd'

export const SWRProvider = ({ children }) => {
  return (
    <SWRConfig value={{ 
      onError: (error, key) => {
        console.log(error, key);
        if (error.response.status === 401) {
          // We can send the error to Sentry,
          // or show a notification UI.
          message.info('登录失效，请重新登录').then(() => window.location.replace('/login'));
        }
      }
    }}>
      { children }
    </SWRConfig>
  )
}