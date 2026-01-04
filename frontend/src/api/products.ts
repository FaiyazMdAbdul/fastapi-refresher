import { apiClient } from './client';
import type { Product, ProductCreate, ProductUpdate } from '@/types/product';

export const productsApi = {
  // GET /products
  getAll: async (): Promise<Product[]> => {
    const { data } = await apiClient.get('/products');
    return data;
  },

  // GET /product/{id}
  getById: async (id: number): Promise<Product> => {
    const { data } = await apiClient.get(`/product/${id}`);
    return data;
  },

  // POST /product
  create: async (product: ProductCreate): Promise<Product> => {
    const { data } = await apiClient.post('/product', product);
    return data;
  },

  // PUT /product
  update: async (product: ProductUpdate): Promise<Product> => {
    const { data } = await apiClient.put('/product', product);
    return data;
  },

  // DELETE /product/{id}
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/product/${id}`);
  },
};
