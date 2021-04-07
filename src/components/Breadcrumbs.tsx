import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { deviceSize } from "../assets/styles/theme/device";

interface Props {
  items: { label: string; to: string }[];
}

export const BreadCrumbs = ({ items }: Props) => {
  return (
    <Container>
      {items.map(({ label, to }, index) => (
        <Wrapper key={index}>
          <Item to={to}>{label}</Item>
          {index + 1 !== items.length && <span>/</span>}
        </Wrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  @media screen and ${deviceSize.tablet} {
    padding: 24px 32px;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  span {
    font-weight: 500;
    color: var(--grey);
    margin: 0 5px;
  }
`;

const Item = styled(NavLink)`
  font-weight: 500;
  text-decoration: none;
  color: var(--red);
  &:hover {
    opacity: 0.8;
  }
`;
