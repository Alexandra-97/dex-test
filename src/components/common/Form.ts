import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const FormContainer = styled.div`
  background: var(--white);
  @media screen and ${deviceSize.tablet} {
    border-radius: 10px;
  }
  @media screen and ${deviceSize.laptop} {
    border-radius: 10px;
  }
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 48px 24px;
  @media screen and ${deviceSize.laptop} {
    flex-direction: row;
    padding: 48px 73px;
  }
`;

export const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    &:nth-child(n) {
      margin-bottom: 24px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media screen and ${deviceSize.laptop} {
    align-items: flex-start;
  }
`;

export const FlexFields = styled.div`
  display: flex;
  width: 100%;
  max-width: 366px;
  & :first-child {
    margin-right: 24px;
  }
  & > div:nth-child(n) {
    width: 0;
    flex: 1;
  }
`;
