import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

interface Props {
  title: string;
  image?: string;
  info?: string | ReactNode;
}

export const AuthLayout: FC<Props> = ({ title, image, info, children }) => {
  return (
    <Container>
      <ContentBlock>
        <Content>
          <Title>{title}</Title>
          {children}
          <Info>{info}</Info>
        </Content>
      </ContentBlock>
      <ImageBlock>
        <img src={image} alt={"layoutImg"} />
      </ImageBlock>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  @media screen and ${deviceSize.laptop} {
    grid-template-columns: 1fr 1.4fr;
  }
`;

const ContentBlock = styled.div`
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 365px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: var(--blue);
  margin-bottom: 32px;
  align-self: center;
  @media ${deviceSize.laptop} {
    align-self: flex-start;
  }
`;

const Info = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding-top: 24px;
  color: var(--grey);
  align-self: center;
`;

const ImageBlock = styled.div`
  background-color: var(--light-blue);
  display: none;
  img {
    max-width: 100%;
  }
  @media ${deviceSize.laptop} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
