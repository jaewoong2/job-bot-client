import { ImageResponse } from 'next/server'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
export const runtime = 'edge'

import './globals.css'

export default function icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: '#7d5ce2',
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 18,
            background: '#d9d9d9',
            width: '80%',
            height: '80%',
            display: 'flex',
            borderRadius: 999,
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
          }}
        >
          b
        </div>
      </div>
    ),
    size
  )
}
