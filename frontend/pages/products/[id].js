'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditProductPage() {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    price: 0,
    costPrice: 0,
    stock: 0,
    category: '',
    brand: '',
    status: 'active',
    featured: false
  })

  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const productId = params?.id || '1' // ← Esta é a linha corrigida
  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    loadProduct()
  }, [user, router])

  const loadProduct = async () => {
    try {
      setLoading(true)
      // Mock data - substitua pela sua API
      const mockProduct = {
        id: productId,
        name: 'Notebook Gamer',
        description: 'Notebook para jogos de alta performance',
        sku: 'NTB-GAMER-001',
        price: 2999.90,
        costPrice: 2200.00,
        stock: 15,
        category: 'Eletrônicos',
        brand: 'Dell',
        status: 'active',
        featured: true
      }
      setProduct(mockProduct)
      setFormData(mockProduct)
    } catch (error) {
      console.error('Erro ao carregar produto:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Substituir pela sua API
      console.log('Salvando produto:', formData)
      alert('Produto salvo com sucesso! (Mock)')
      router.push('/products')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push('/products')}
          className="bg-dark-300 hover:bg-dark-400 rounded-lg p-2 mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Editar Produto</h1>
      </div>

      {/* Formulário */}
      <div className="bg-dark-200 rounded-lg p-6 border border-gray-700/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nome do Produto</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Preço */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Preço de Venda (R$)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Preço de Custo */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Preço de Custo (R$)</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                step="0.01"
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Estoque */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Estoque</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Marca</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-500 bg-dark-300 border-gray-600 rounded focus:ring-primary-500"
            />
            <label className="ml-2 text-sm text-gray-400">Produto em Destaque</label>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}