import { styled } from 'styled-components';
import { formatPrice } from '@/utils/format-price';
import { DeleteBtnIcon } from '@/components/icons/delete-btn-icon';
import { ProductInCart } from '@/types/product';

interface CartItemProps {
  product: ProductInCart;
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleDelete: (id: string) => void;
}

const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%; /* Garante que o item ocupe 100% da largura disponível */
  height: 210px;
  border-radius: 8px;
  background-color: white;

  position: relative;
  
  button {
    position: absolute;
    top: 16px;
    right: 24px;
  
    border: none;
    background: transparent;
    cursor: pointer;
  }
  
  img {
    width: 256px;
    height: 210px;
    object-fit: cover; /* Mantém a proporção da imagem */
    object-position: center;
    border-radius: 8px 0 0 8px;
    flex-shrink: 0; /* Impede que a imagem encolha */
  }
  
  > div {
    display: flex;
    width: 100%;  
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 16px 24px;
    line-height: 150%;
    color: var(--text-dark-2);
    
    h4 {
      font-size: 20px;
      font-weight: 300;
    }
    
    p {
      font-size: 12px;
      font-weight: 400;
      max-height: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      
      span {
        font-weight: 600; 
        font-size: 16px;
        color: var(--shapes-dark);
      }
    }
  }
`

const SelectQuantity = styled.select`
  width: 65px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-dark);
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`

export function CartItem({ product, handleUpdateQuantity, handleDelete }: CartItemProps) {
  const productPrice = formatPrice(product.price_in_cents)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleUpdateQuantity(product.id, Number(event.target.value))
  }

  return (
    <Item>
      <button onClick={() => handleDelete(product.id)} aria-label="Remover produto">
        <DeleteBtnIcon />
      </button>
      <img src={product.image_url} alt={product.name} />
      <div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div>
          <SelectQuantity value={product.quantity} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </SelectQuantity>
          <span>{productPrice}</span>
        </div>
      </div>
    </Item>
  )
}
