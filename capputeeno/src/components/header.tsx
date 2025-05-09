"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { PrimaryInputWSearchIcon } from "./primary-input";
import { CartControl } from "./cart-control";
import { useFilter } from "../hooks/useFilter";

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: ["400"],
});

const TagHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  
    gap: 24px;
  }
  
  @media (min-width: ${props => props.theme.desktopBreakPoint}) {
    padding: 20px 160px;
  }
`
const Logo = styled.a`
  color: var(--logo-color);
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;
  margin-right: 20px;
  
  @media (min-width: ${props => props.theme.tabletBreakPoint}) {
    font-size: 24px;
  }

  @media (min-width: ${props => props.theme.desktopBreakPoint}) {
    font-size: 40px;
  }
`

export function Header() {
  const { setSearch, search } = useFilter();


  return (
    <TagHeader>
      <Logo className={sairaStencil.className}>capputeeno</Logo>
      <div>
        <PrimaryInputWSearchIcon
          value={search}
          handleChange={setSearch}
          placeholder="Procurando por algo específico" />
        <CartControl />
      </div>
    </TagHeader>
  )
}
