
import { NextIntlClientProvider, useMessages } from 'next-intl'

export default function IntlClientProvider({ children }) {
  const messages = useMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      { children }
    </NextIntlClientProvider>
  )
}