import { FC } from "react";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const ContentLayout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 0;
  max-height: calc(100vh - 62px);
  overflow: auto;
  @media screen and ${deviceSize.tablet} {
    padding: 32px 80px;
    max-height: calc(100vh - 80px);
  }
`;
