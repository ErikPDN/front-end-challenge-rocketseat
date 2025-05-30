"use client";

import { DefaultPageLayout } from '@/components/default-page-layout';
import { styled } from 'styled-components';
import Image from 'next/image';
import { BackButton } from '@/components/back-button';
import { useProduct } from '@/hooks/useProduct';
import { formatPrice } from '@/utils/format-price';
import { ShopBagIcon } from '@/components/icons/shop-bag-icon';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 32px;
    margin-top: 14px;

    img {
      max-width: 640px;
      width: 50%;
    }
    
    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        background: #115D8C;
        mix-blend-mode: multiply;
        border-radius: 4px;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px 0px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 60%
      }
    }
  }
`

const ProductInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  
  span {
    font-weight: 400;
    font-size: 16px; line-height: 150%;
    color: var(--text-dark-2);
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-top: 12px;
  }

  span:nth-of-type(2) {
    font-weight: 600;
    font-size: 20px;
    color: var(--shapes-dark);
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: var(--text-dark-2);
  }
  
  div {
    margin-top: 32px;
  
    h3 {
      text-transform: uppercase;
      color: var(--text-dark);
      font-size: 16px; font-weight: 500;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      color: var(--text-dark-2);
    }
  }
`

export default function Product({ searchParams }: { searchParams: { id: string } }) {
  const productId = searchParams?.id

  const { data } = useProduct(productId ?? "");

  const handleAddToCart = () => {
    const cartItems = localStorage.getItem('cart-items')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)

      const productIndex = cartItemsArray.findIndex((item: { id: string }) => item.id === searchParams.id)

      if (productIndex !== -1) {
        cartItemsArray[productIndex].quantity += 1
      } else {
        cartItemsArray.push({ ...data, quantity: 1, id: searchParams.id })
      }

      localStorage.setItem('cart-items', JSON.stringify(cartItemsArray))
    } else {
      const newCartItem = [{ ...data, quantity: 1, id: searchParams.id }]
      localStorage.setItem('cart-items', JSON.stringify(newCartItem))
    }
  }


  return (
    <DefaultPageLayout>
      <Container>
        <BackButton path="/" />
        <section>
          {data?.image_url && (
            <Image
              src={data.image_url}
              alt={data.name}
              width={640}
              height={640}
              style={{ width: '50%', height: 'auto', maxWidth: '640px' }}
            />
          )}
          <div>
            <ProductInfo>
              <span>{data?.category}</span>
              <h2>{data?.name}</h2>
              <span>{formatPrice(data?.price_in_cents)}</span>
              <p>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</p>

              <div>
                <h3>Descrição</h3>
                <p>{data?.description}</p>
              </div>
            </ProductInfo>
            <button onClick={handleAddToCart}>
              <ShopBagIcon />
              Adicionar ao Carrinho
            </button>
          </div>
        </section>
      </Container>
    </DefaultPageLayout >
  )
}
