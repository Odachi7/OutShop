const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://dummyjson.com/products/category';

app.get('/produtos/:categoria', async (req, res) => {
  const categoria = req.params.categoria;

  const categoriasValidas = {
    smartphones: 'smartphones',
    laptops: 'laptops',
  };

  const categoriaValida = categoriasValidas[categoria];

  if (!categoriaValida) {
    return res.status(400).json({ error: 'Categoria inválida. Use "smartphones" ou "laptops".' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/${categoriaValida}`);
    const produtos = response.data.products.slice(0, 15); 
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar produtos da API.' });
  }
});

app.get('/produto/:id', async (req, res) => {
  const { id } = req.params

  try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
    res.json(response.data)
  } catch (error) {
    console.error('Erro ao buscar produto por ID', error.message)
    res.status(500).json({ error: 'Erro ao buscar produto da API.' });
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
