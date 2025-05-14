"use client"

import { BackButton } from '@/components/back-button';
import { DefaultPageLayout } from '@/components/default-page-layout';
import { styled } from "styled-components";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ProductInCart } from '@/types/product';
import { formatPrice } from '@/utils/format-price';
import { CartItem } from "@/components/cart/cart-item";
import { Divider } from '@/components/divider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${props => props.theme.desktopBreakPoint}) {
    flex-direction: row;
  }
`
const CartListContainer = styled.div`
  flex: 1;

  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 14px; 
  }
  
  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);

    span {
      font-weight: 600;
    }
  }
`

const CartList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`

const CartResultContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 352px;
  padding: 16px 24px;
  
  background-color: white;
  line-height: 100%;

  h3 {
    font-weight: 600;
    font-size: 20px;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 30px;
  }
`

const TotalItem = styled.div<{ isBold: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-size: 16px;
  font-weight: ${props => props.isBold ? 600 : 400};
  line-height: 150%;

  margin-bottom: 12px;
`

const ShopBtn = styled.button`
  color: white;
  border-radius: 4px;
  background: #51B853;
  width: 100%;
  padding: 12px;
  border: none;

  text-transform: uppercase;
  margin-top: auto;
  cursor: pointer;
`

export default function Cart() {
  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])

  const calculateTotal = (cartList: ProductInCart[]) => {
    return cartList.reduce((acc, item) => acc += item.price_in_cents * item.quantity, 0)
  }

  const cartTotal = formatPrice(calculateTotal(value))
  const delivery = 4000
  const cartTotalPlusDelivery = formatPrice(calculateTotal(value) + delivery)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const newValue = value.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        quantity: quantity
      }
    })
    updateLocalStorage(newValue)
  }

  const handleDeleteItem = (id: string) => {
    const newValue = value.filter(item => {
      if (item.id !== id) return item
    })
    updateLocalStorage(newValue)
  }

  return (
    <DefaultPageLayout>
      <Container>
        <CartListContainer>
          <BackButton path='/' />
          <h3>Seu Carrinho</h3>
          <p>
            Total ({value.length} Produtos)
            <span>{cartTotal}</span>
          </p>
          <CartList>
            {value.map(item =>
              <CartItem product={item}
                key={item.id}
                handleUpdateQuantity={handleUpdateQuantity}
                handleDelete={handleDeleteItem} />
            )}
          </CartList>
        </CartListContainer>
        <CartResultContainer>
          <h3>Resumo do Pedido</h3>
          <TotalItem isBold={false}>
            <p>Subtotal de produtos</p>
            <p>{cartTotal}</p>
          </TotalItem>
          <TotalItem isBold={false}>
            <p>Entrega</p>
            <p>{formatPrice(delivery)}</p>
          </TotalItem>
          <Divider />
          <TotalItem isBold={true}>
            <p>Total</p>
            <p>{cartTotalPlusDelivery}</p>
          </TotalItem>
          <ShopBtn>
            Finalizar Compra
          </ShopBtn>
        </CartResultContainer>
      </Container>
    </DefaultPageLayout>
  )
}
