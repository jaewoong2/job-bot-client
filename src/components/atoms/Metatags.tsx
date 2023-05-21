import Head from 'next/head'
import React from 'react'

const Metatags = () => {
  return (
    <Head>
      <title>잡봇 | 지원서 봇</title>
      <meta name='description' content='생성 AI를 이용하여 지원서 작성을 도와줘요'></meta>
      <meta name='author' content='@jaewoong2'></meta>
      <meta name='keywords' content='잡봇, 지원서 봇, 생성AI, 지원서, 자소서'></meta>
      <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
      <meta property='og:title' content='잡봇 | 지원서 봇'></meta>
      <meta property='og:description' content='생성 AI를 이용하여 지원서 작성을 도와줘요'></meta>
      <meta property='og:url' content='https://www.job-bot.site/'></meta>
      <meta property='og:site_name' content='잡봇'></meta>
      <meta property='og:locale' content='ko-KR'></meta>
      <meta
        property='og:image'
        content='https://ywnfqdpcmgtllkshgzsl.supabase.co/storage/v1/object/public/image/dark-jobbot.png'
      ></meta>
      <meta property='og:type' content='website'></meta>
      <meta name='twitter:card' content='summary'></meta>
      <meta name='twitter:site' content='https://www.job-bot.site'></meta>
      <meta name='twitter:title' content='잡봇 | 지원서 봇'></meta>
      <meta name='twitter:description' content='생성 AI를 이용하여 지원서 작성을 도와줘요'></meta>
      <meta
        name='twitter:image'
        content='https://ywnfqdpcmgtllkshgzsl.supabase.co/storage/v1/object/public/image/dark-jobbot.png'
      ></meta>
    </Head>
  )
}

export default Metatags
