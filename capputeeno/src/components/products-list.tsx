"use client";

import { styled } from "styled-components";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./product-card";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 256px);
  grid-gap: 32px;
  max-width: 100%;
  margin-top: 32px;
`


export function ProductsList() {
  const { data } = useProducts();

  return (
    <ListContainer>
      {data?.map((product) => (
        <ProductCard
          title={product.name}
          image={product.image_url}
          price={product.price_in_cents}
          key={product.id} />
      ))}
    </ListContainer>
  )
}
