import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductsFetchResponse } from "@/types/products-response";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = async (productId: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, {
    query: `
  query {
    Product(id: "${productId}") {
      name
      description
      category
      price_in_cents,
      image_url
    }
  }
  ` });
}

export function useProduct(id: string) {
  const { data } = useQuery({
    queryFn: () => fetcher(id),
    queryKey: ["product", id],
    enabled: !!id,
  })

  return {
    data: data?.data?.data?.Product,
  }
}
