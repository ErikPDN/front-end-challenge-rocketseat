"use client"

import { styled } from "styled-components";

export const DefaultPageLayout = styled.div`
  padding: 12px 24px;
  min-height: 100vh;
  background: var(--bg-primary);
  
  @media (min-width: ${props => props.theme.desktopBreakPoint}) {
    padding: 34px 160px;
  }
`
