export const api = {
  async getProducts() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      
      // SEMPRE retorna o array de produtos
      return data.products || data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      return []
    }
  },

  async getProduct(id) {
    try {
      const response = await fetch(`/api/products/${id}`)
      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      return null
    }
  },

  async createProduct(productData) {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      return null
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      return null
    }
  },

  async deleteProduct(id) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      return null
    }
  }
}