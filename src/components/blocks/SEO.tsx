import React, { PropsWithChildren } from 'react'

import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
  description?: string
  name?: string
}

export const SEO = ({ title, description, name, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Helmet>
        <title>{title ? `잡봇 | ${title}` : '잡봇 | 지원서 봇'} </title>
        <meta
          name="description"
          content={description ?? '지원서 작성을 도와주는 웹사이트 입니다.'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title ? `잡봇 | ${title}` : '잡봇 | 지원서 봇'} />
        <meta
          property="og:description"
          content={description ?? '지원서 작성을 도와주는 웹사이트 입니다.'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={import.meta.env.DEPLOY_URL} />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:creator" content={name ?? '잡봇 | 지원서 봇'} />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:title" content={title ?? '잡봇 | 지원서 봇'} />
        <meta
          name="twitter:description"
          content={description ?? '지원서 작성을 도와주는 웹사이트 입니다.'}
        />
        <meta property="og:image" content="https://job-bot.site/jobbothumbnail.png" />
        <meta property="og:site_name" content="https://job-bot.site" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      {children}
    </>
  )
}
