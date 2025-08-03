import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '../components/Providers'

export const metadata: Metadata = {
  title: 'Halı Mağazası',
  description: 'El dokuma ve modern halılar için en iyi adres',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
