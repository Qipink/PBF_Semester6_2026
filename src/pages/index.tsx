import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <head>
        <title>Praktikum Next.js Pages Router</title>
      </head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Praktikum Next.js Pages Router</h1>
          <p className="text-lg text-gray-600">Mahasiswa D4 Pengembangan Web</p>
        </div>
      </div>
    </div>
  )
}
