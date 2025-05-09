import { styled } from "styled-components"
import { FilterType } from "../types/filter-types"
import { useFilter } from "../hooks/useFilter"

interface FilterItemProps {
  selected: boolean;
}

const FilterList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  list-style: none;
`

const FilterItem = styled.li<FilterItemProps>`
  font-family: inherit; 
  font-weight: ${props => props.selected ? '600' : '400'};
  color: var(--text-dark);
  text-transform: uppercase;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  cursor: pointer;
  
  border-bottom: ${props => props.selected ? '4px solid var(--orange-low)' : ''};
  
  @media (min-width: ${props => props.theme.desktopBreakPoint}) {
    line-height: 22px;
    font-size: 16px;
  }
`

export function FilterByType() {
  const { type, setType } = useFilter();

  const handleChangeType = (value: FilterType) => {
    setType(value);
  }

  return (
    <FilterList>
      <FilterItem
        selected={type === FilterType.ALL}
        onClick={() => handleChangeType(FilterType.ALL)}>
        Todos os produtos
      </FilterItem>
      <FilterItem
        selected={type === FilterType.SHIRT}
        onClick={() => handleChangeType(FilterType.SHIRT)}>
        Camisetas
      </FilterItem>
      <FilterItem
        selected={type === FilterType.MUG}
        onClick={() => handleChangeType(FilterType.MUG)}>
        Canecas
      </FilterItem>
    </FilterList>
  )
}
