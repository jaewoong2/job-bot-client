import { Providers } from './provider'
import Layout from '@/components/Layout'

import './globals.css'
import GoogleScripts from '@/lib/GoogleScripts'
import Metatags from '@/components/atoms/Metatags'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <Metatags />
      <GoogleScripts />
      <link rel='canonical' href='https://job-bot.site' />
      <body suppressHydrationWarning={true}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
