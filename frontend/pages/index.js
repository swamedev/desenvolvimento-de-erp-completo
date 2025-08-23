'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    sales: 0,
    orders: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      loadDashboardStats()
    }
  }, [user, authLoading, router])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      // Busca produtos da API para contar
      const response = await api.getProducts()
      
      // Corrigido: Pega o array de produtos corretamente
      const productList = response.products || response
      
      setStats(prev => ({
        ...prev,
        products: productList.length,
        customers: 89, // Mock - substitua depois
        sales: 2540,   // Mock - substitua depois  
        orders: 24     // Mock - substitua depois
      }))
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="p-6">
      {/* Grid de cards futuristas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Produtos */}
        <div className="bg-dark-200 glass rounded-xl p-6 border border-gray-700/30 hover:scale-105 transition-transform duration-300 animate-float">
          <div className="flex items-center">
            <div className="p-3 bg-primary-500/20 rounded-lg neon-border">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Produtos</p>
              <p className="text-2xl font-bold text-white">{stats.products}</p>
            </div>
          </div>
        </div>

        {/* Card Clientes */}
        <div className="bg-dark-200 glass rounded-xl p-6 border border-gray-700/30 hover:scale-105 transition-transform duration-300 animate-float" style={{animationDelay: '1s'}}>
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Clientes</p>
              <p className="text-2xl font-bold text-white">{stats.customers}</p>
            </div>
          </div>
        </div>

        {/* Card Vendas */}
        <div className="bg-dark-200 glass rounded-xl p-6 border border-gray-700/30 hover:scale-105 transition-transform duration-300 animate-float" style={{animationDelay: '2s'}}>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Vendas Hoje</p>
              <p className="text-2xl font-bold text-white">R$ {stats.sales}</p>
            </div>
          </div>
        </div>

        {/* Card Pedidos */}
        <div className="bg-dark-200 glass rounded-xl p-6 border border-gray-700/30 hover:scale-105 transition-transform duration-300 animate-float" style={{animationDelay: '3s'}}>
          <div className="flex items-center">
            <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Pedidos</p>
              <p className="text-2xl font-bold text-white">{stats.orders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Área principal */}
      <div className="bg-dark-200 glass rounded-xl p-6 border border-gray-700/30">
        <h3 className="text-lg font-semibold text-white mb-4">Visão Geral do Sistema</h3>
        <p className="text-gray-400">
          Seu dashboard futurista está pronto! Agora você pode começar a adicionar seus produtos, 
          clientes e gerenciar suas vendas com uma interface moderna e intuitiva.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
            <h4 className="font-medium text-primary-400 mb-2">Próximos Passos</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Adicionar primeiro produto</li>
              <li>• Cadastrar clientes</li>
              <li>• Configurar vendas</li>
              <li>• Gerar relatórios</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="font-medium text-green-400 mb-2">Estatísticas</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Sistema 100% operacional</li>
              <li>• Design futurista implementado</li>
              <li>• Performance otimizada</li>
              <li>• Pronto para escalar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}