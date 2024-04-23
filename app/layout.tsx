import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainLayout from "@/components/MainLayout";
import MainHeader from "@/components/MainHeader";
import KingLayout from '@/components/kingLayout';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CashierApp',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <KingLayout>
            {children}
          </KingLayout>
      </body>
    </html>
  )
}
