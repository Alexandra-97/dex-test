import styled, { css } from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";
import { BASE_URL } from "../../api/baseFetch";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  image?: string;
  name: string;
  description: string;
  number?: string;
  imagePlacement?: "center" | "bottom";
}

export const Card = ({
  image,
  name,
  description,
  number,
  to,
  imagePlacement = "center",
}: Props) => {
  return (
    <Container to={to}>
      <ImageContainer imagePlacement={imagePlacement}>
        <div>{image && <img src={BASE_URL + image} alt={"cardImage"} />}</div>
      </ImageContainer>
      <InfoContainer>
        <MainInfo>
          <div>{name}</div>
          <div>{number}</div>
        </MainInfo>
        <Description>{description}</Description>
      </InfoContainer>
    </Container>
  );
};

const Container = styled(Link)`
  width: 100%;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div<{ imagePlacement?: "center" | "bottom" }>`
  border-radius: 4px 4px 0 0;
  height: 107px;
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 50px;
    height: 50px;
    img {
      object-fit: contain;
      height: 100%;
    }
  }
  ${({ imagePlacement }) =>
    imagePlacement === "bottom" &&
    css`
      align-items: flex-end;
      & > div {
        width: 120px;
        height: 90px;
      }
    `}
  @media screen and ${deviceSize.laptop} {
    height: 280px;
    & > div {
      width: 150px;
      height: 150px;
    }
    ${({ imagePlacement }) =>
      imagePlacement === "bottom" &&
      css`
        & > div {
          width: 247px;
          height: 207px;
        }
      `}
  }
`;

const InfoContainer = styled.div`
  border-radius: 0 0 4px 4px;
  height: 94px;
  padding: 22px 11px;
  background: var(--dark-grey);
  text-align: center;
  @media screen and ${deviceSize.laptop} {
    height: 100px;
    padding: 24px;
  }
`;

const MainInfo = styled.div`
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  @media screen and ${deviceSize.laptop} {
    margin-bottom: 12px;
  }
  & > div {
    color: var(--white);
    font-size: 15px;
    font-weight: 500;
    @media screen and ${deviceSize.laptop} {
      font-size: 18px;
    }
    &:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:last-child {
      color: var(--light-red);
      margin-left: 5px;
    }
  }
`;

const Description = styled.div`
  font-size: 13px;
  color: var(--light-grey);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and ${deviceSize.laptop} {
    font-size: 14px;
  }
`;
