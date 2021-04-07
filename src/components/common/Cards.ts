import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, calc(100% / 2 - 6px));
  gap: 12px;
  @media screen and ${deviceSize.laptopL} {
    grid-template-columns: repeat(auto-fit, calc(100% / 3 - 16px));
    gap: 24px;
  }
`;
