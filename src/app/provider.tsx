// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig>
      <CacheProvider>
        <ChakraProvider resetCSS>{children}</ChakraProvider>
      </CacheProvider>
    </SWRConfig>
  )
}
