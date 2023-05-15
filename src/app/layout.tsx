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
    images: [
      {
        url: '@/components/assets/잡봇.svg',
        width: 800,
        height: 600,
      },
      {
        url: '@/components/assets/잡봇.svg',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'ko-KR',
    type: 'website',
  },
}

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
