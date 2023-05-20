import { Providers } from './provider'
import Layout from '@/components/Layout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '잡봇 | 지원서 봇',
  description: '생성 AI를 이용하여 지원서 작성을 도와줘요',

  openGraph: {
    title: '잡봇 | 지원서 봇',
    description: '생성 AI를 이용하여 지원서 작성을 도와줘요',
    url: 'https://job-bot.site',
    siteName: '잡봇',
    images: IMAGES.잡봇,
    locale: 'ko-KR',
    type: 'website',
  },
  authors: { name: '@jaewoong2' },
}

import './globals.css'
import GoogleScripts from '@/lib/GoogleScripts'
import { IMAGES } from '@/constants'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
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
