import Image from 'next/image';
import { styled } from 'styled-components';
import { formatPrice } from '../utils/format-price';

interface ProductCardProps {
  image: string,
  title: string,
  price: number
}

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 0px 0px 4px 4px;

  width: 256px;

  h3 {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: var(--shapes-dark);
  }

  div {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding: 8px 0;

    > div {
      width: 228px;
      height: 1px;
      margin: 8px 0px;
      padding: 0px;
      background: var(--shapes);
    }
  }

`

export function ProductCard(props: ProductCardProps) {
  const price = formatPrice(props.price);

  return (
    <Card>
      <Image
        src={props.image}
        alt={props.title}
        width={256}
        height={300}
      />
      <div>
        <h3>{props.title}</h3>
        <div />
        <p>{price}</p>
      </div>
    </Card>
  )
}
