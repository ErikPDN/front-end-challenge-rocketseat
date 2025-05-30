import axios, { AxiosPromise } from 'axios';
import { useDeferredValue } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductsFetchResponse } from '../types/products-response';
import { useFilter } from './useFilter';
import { mountQuery } from '../utils/graphql-filters';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetchProducts = async (query: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, { query });
}

export function useProducts() {
  const { type, priority, search } = useFilter();
  const searchDeferred = useDeferredValue(search);
  const query = mountQuery(type, priority);
  const { data } = useQuery({
    queryFn: () => fetchProducts(query),
    queryKey: ['products', type, priority],
    staleTime: 1000 * 60 * 1
  });

  const products = data?.data?.data?.allProducts || [];
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchDeferred.toLowerCase());
  });

  return { data: filteredProducts };
}
