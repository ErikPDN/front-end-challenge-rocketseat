"use client";

import { createContext, useState, ReactNode } from 'react';
import { FilterType } from '@/types/filter-types';
import { PriorityTypes } from '@/types/priority-types';

export const FilterContext = createContext({
  search: '',
  page: 0,
  type: FilterType.ALL,
  priority: PriorityTypes.NEWS,
  setSearch: (search: string) => { },
  setPage: (page: number) => { },
  setType: (type: FilterType) => { },
  setPriority: (priority: PriorityTypes) => { }
});

interface FilterContextProviderProps {
  children: ReactNode;
}

export function FilterContextProvider({ children }: FilterContextProviderProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [type, setType] = useState(FilterType.ALL);
  const [priority, setPriority] = useState(PriorityTypes.POPULARITY);

  return (
    <FilterContext.Provider
      value={{ search, page, type, priority, setSearch, setPage, setType, setPriority }}
    >
      {children}
    </FilterContext.Provider>
  )
}


