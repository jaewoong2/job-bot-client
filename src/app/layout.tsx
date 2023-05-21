import { Providers } from './provider'
import Layout from '@/components/Layout'

import './globals.css'
import GoogleScripts from '@/lib/GoogleScripts'
import Metatags from '@/components/atoms/Metatags'

// export const metadata: Metadata = {
//   title: '잡봇 | 지원서 봇',
//   description: '생성 AI를 이용하여 지원서 작성을 도와줘요',

//   openGraph: {
//     title: '잡봇 | 지원서 봇',
//     description: '생성 AI를 이용하여 지원서 작성을 도와줘요',
//     url: 'https://www.job-bot.site',
//     siteName: '잡봇',
//     images: IMAGES.다크잡봇,
//     locale: 'ko-KR',
//     type: 'website',
//   },
//   keywords: '잡봇, 지원서 봇, 생성AI, 지원서, 자소서',
//   twitter: {
//     card: 'summary',
//     title: '잡봇 | 지원서 봇',
//     site: 'https://www.job-bot.site',
//     images: IMAGES.다크잡봇,
//     description: '생성 AI를 이용하여 지원서 작성을 도와줘요',
//   },
//   authors: { name: '@jaewoong2' },
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <Metatags />
        <GoogleScripts />
      </head>
      <link rel='canonical' href='https://job-bot.site' />
      <body suppressHydrationWarning={true}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
