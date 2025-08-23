'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react'
import { api } from '../../services/api'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchProducts()
  }, [user, router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.getProducts()
      
      // CORREÇÃO: Pegar apenas o array de produtos
      const productsData = response.products || response
      
      setProducts(productsData)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      alert('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id) => {
    router.push(`/products/${id}`)
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.deleteProduct(id)
        setProducts(products.filter(product => product.id !== id))
        alert('Produto excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir produto:', error)
        alert('Erro ao excluir produto')
      }
    }
  }

  // FUNÇÃO DE FILTRO CORRETA - SEM ERROS
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Package className="w-8 h-8 text-primary-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
        </div>
        <button
          onClick={() => router.push('/products/new')}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </button>
      </div>

      <div className="bg-dark-200 rounded-lg p-4 mb-6 border border-gray-700/30">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar produtos por nome, SKU ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-300 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            />
          </div>
          <button className="bg-dark-300 hover:bg-dark-400 border border-gray-600 rounded-lg px-4 py-2 text-white flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-dark-200 rounded-lg border border-gray-700/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-dark-300/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.description || 'Sem descrição'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-500/20 rounded"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum produto encontrado</p>
            <button
              onClick={() => router.push('/products/new')}
              className="text-primary-400 hover:text-primary-300 mt-2"
            >
              Cadastre seu primeiro produto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}