'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, Package, Users, DollarSign, 
  BarChart3, Settings, LogOut, Rocket
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const menuItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Produtos', href: '/products', icon: Package },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Vendas', href: '/sales', icon: DollarSign },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="w-64 bg-dark-300 glass border-r border-gray-700/50">
      {/* Header futurista */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-500 rounded-lg neon-border">
            <Rocket size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              NEBULA ERP
            </h1>
            <p className="text-gray-400 text-sm">Sistema Futurista</p>
          </div>
        </div>
      </div>

      {/* Menu com efeito glass */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400 neon-border'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white hover:scale-105'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-primary-400' : 'text-gray-400'} />
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer do menu */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700/30">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 group"
        >
          <LogOut size={20} className="text-gray-400 group-hover:text-red-400" />
          <span className="ml-3 font-medium">Sair</span>
        </button>
      </div>
    </div>
  )
}