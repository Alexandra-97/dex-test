import React, { FC, useState } from "react";
import { Header } from "../ui/Header";
import styled from "styled-components";
import { SideMenu } from "../ui/SideMenu";
import { ContentLayout } from "./ContentLayout";

export const AppLayout: FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <Container>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenuHandler} />
      <Wrapper>
        <SideMenu
          isMenuOpen={isMenuOpen}
          closeMenuHandler={toggleMenuHandler}
        />
        <ContentLayout>{children}</ContentLayout>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: var(--lightest-grey1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
