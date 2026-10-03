import type { Metadata } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSans = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans',
})

const notoSerif = Noto_Serif_SC({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
})

export const metadata: Metadata = {
  title: '苏鑫五金家具 | SUXIN HARDWARE FURNITURE',
  description: '为探索独特设计的产品带来新的理念，实现理想化居住氛围。心怀敬畏遵循自然，让每一件家具独具一格。',
  keywords: ['五金家具', '佛山家具', '顺德家具', '定制家具', '五金配件'],
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
