'use client'

import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }) {
  const { user } = useAuth()

  if (!user) {
    return children
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
