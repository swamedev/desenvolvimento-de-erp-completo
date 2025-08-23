'use client'

import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-dark-200 glass border-b border-gray-700/30">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Painel de Controle</h2>
          <p className="text-sm text-gray-400">Bem-vindo ao futuro da gestão</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-sm text-primary-400">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center neon-border">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}