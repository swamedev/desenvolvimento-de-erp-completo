// pages/api/products.js
export default async function handler(req, res) {
  try {
    // Configurar para permitir CORS (comunicação entre serviços)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Se for uma requisição OPTIONS (pré-flight do CORS)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // URL do backend (usando o nome do serviço no Docker)
    const backendURL = 'http://backend:3001/api/products';
    
    // Fazer a requisição para o backend
    const response = await fetch(backendURL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // Verificar se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    // Pegar os dados da resposta
    const data = await response.json();
    
    // Retornar os dados para o frontend
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}