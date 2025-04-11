import { useState } from "react"
import { styled } from "styled-components"
import { ArrowDownIcon } from "./icons/arrow-down-icon"
import { useFilter } from "../hooks/useFilter"
import { PriorityTypes } from "@/types/priority-types"

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 16px;
    }
  }
`
const PriorityList = styled.ul`
  width: 176px;
  list-style: none;
  position: absolute;
  background: var(--white);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 16px;

  top: 100%;
  right: 2.5%;

  li {
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    cursor: pointer;
  }

  li + li { 
    margin-top: 4px;
  }
`

export function FilterByPriority() {
  const [isOpen, setIsOpen] = useState(false);
  const { setPriority } = useFilter();

  const handleOpen = () => {
    setIsOpen(prev => !prev);
  }

  const handleUpdatePriority = (value: PriorityTypes) => {
    setPriority(value);
    setIsOpen(false);
  }

  return (
    <FilterContainer>
      <button onClick={handleOpen}>
        Organizar por
        <ArrowDownIcon />
      </button>
      {isOpen &&
        <PriorityList>
          <li onClick={() => handleUpdatePriority(PriorityTypes.NEWS)}>Novidade</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.HIGHEST_PRICE)}>Preço: maior - menor</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.LOWEST_PRICE)}>Preço: menor - maior</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais vendidos</li>
        </PriorityList>
      }
    </FilterContainer>
  )
}
