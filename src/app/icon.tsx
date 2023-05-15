/* eslint-disable react/no-unescaped-entities */
import { ImageResponse } from 'next/server'

export const size = {
  width: 320,
  height: 320,
}
export const contentType = 'image/png'
export const runtime = 'edge'

import './globals.css'

export default function icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#7d5ce2',
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: '92px',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 200,
            background: '#d9d9d9',
            width: '80%',
            height: '80%',
            display: 'flex',
            fontFamily: 'fantasy',
            borderRadius: '72px',
            fontWeight: 900,
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7d5ce2',
          }}
        >
          B'
        </div>
      </div>
    ),
    size
  )
}
