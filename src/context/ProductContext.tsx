import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

export type ProductProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  permalink?: string;
  description?: string; 
};

type ProductContextType = {
  products: ProductProps[];
  loading: boolean;
  setCategory: (category: 'smartphones' | 'laptops') => void;
  getProductById: (id: number) => Promise<ProductProps | null>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<'smartphones' | 'laptops'>('laptops');

  const API_BASE = 'https://outshop-la70.onrender.com';

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const [smartphonesRes, laptopsRes] = await Promise.all([
          axios.get(`${API_BASE}/produtos/laptops`),
          axios.get(`${API_BASE}/produtos/smartphones`),
        ]);

        const allProducts = [...smartphonesRes.data, ...laptopsRes.data];
        setProducts(allProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  async function getProductById(id: number): Promise<ProductProps | null> {
    try {
      const response = await axios.get(`${API_BASE}/produto/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      return null;
    }
  }

  return (
    <ProductContext.Provider value={{ products, loading, setCategory, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts deve ser usado dentro do ProductProvider');
  return context;
};
