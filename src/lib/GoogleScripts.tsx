'use client'

import Script from 'next/script'
import React from 'react'
import * as gtag from './gtags'

const GoogleScripts = () => {
  gtag.useGtag()

  return (
    <>
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-XG605Y4FZR' strategy='afterInteractive' />
      <Script id='gtag-init' strategy='afterInteractive'>
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XG605Y4FZR');`}
      </Script>
      <Script
        async
        strategy='afterInteractive'
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2848693550059581'
        crossOrigin='anonymous'
      />
    </>
  )
}

export default GoogleScripts
