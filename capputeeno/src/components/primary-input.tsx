import { InputHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { SearchIcon } from './icons/search-icon';

export const PrimaryInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 10px 16px;
  padding-right: 50px;
  
  background: var(--bg-secondary);

  font-size: 12px;
  font-family: inherit;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-dark);

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 22px;
  }
`

const InputContainer = styled.div`
  position: relative;
  width: 200px;
  
  svg { 
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media(min-width: ${ports => ports.theme.desktopBreakPoint}) {
    width: 352px;
  }
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string,
  handleChange: (value: string) => void
}

export function PrimaryInputWSearchIcon(props: InputProps) {
  const { handleChange, ...rest } = props;


  return (
    <InputContainer>
      <PrimaryInput
        onChange={(e) => handleChange(e.target.value)}
        {...rest}
      />
      <SearchIcon />
    </InputContainer>
  )
}
