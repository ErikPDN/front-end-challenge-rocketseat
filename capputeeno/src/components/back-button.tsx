import { styled } from 'styled-components';
import { BackButtonIcon } from './icons/back-button-icon';
import { useRouter } from 'next/navigation';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;

  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: var(--secondary-text);
`

interface ButtonProps {
  path: string;
}

export function BackButton({ path }: ButtonProps) {
  const router = useRouter();
  const handlePath = () => {
    router.push(path)
  }

  return (
    <Button onClick={handlePath}>
      <BackButtonIcon />
      Voltar
    </Button>
  )
}
